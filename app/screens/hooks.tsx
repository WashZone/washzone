import { useStores } from "../models"
import { Interaction } from "../utils/enums"
import Toast from "react-native-toast-message"
import { toastMessages } from "../utils/toastMessages"
import { getUniqueId } from "react-native-device-info"

export function useHooks() {
  const {
    authenticationStore: { setBlocked, setAuthToken },
    searchStore: { setResults },
    feedStore: {
      setTopics: setFeedTopics,
      topics: feedTopics,
      addToTopics: addtoFeedTopics,
      setStories,
    },
    classfieds: { setClassifieds, addToClassfieds, classifieds },
    topics: { setTopics, topics, addToTopics },
    saved: { setSavedClassifieds },
    videos: { setVideos },
    interaction: {
      addToDislikedTopics,
      addToLikedTopics,
      addToLikedVideos,
      addToDislikedVideos,
      removefromDislikedTopics,
      removefromDislikedVideos,
      removefromLikedTopics,
      removefromLikedVideos,
      getInteractionOnVideo,
      getInteractionOnTopic,
      getInteractionOnClassified,
      getSavedInteractionOnVideo,
      addToSavedClassified,
      addToSavedVideos,
      removeFromSavedClassifieds,
      removeFromSavedVideos,
      syncSavedInteractions,
      syncInteractions,
    },
    api: {
      queryGetAllTopics,
      mutateCommentOnTopic,
      queryGetCommentsByTopicId,
      queryGetAllTopicByPageNumber,
      queryGetAllClassifiedFeed,
      mutateUpdateUser,
      mutateCreateUserTopic,
      mutateSaveLikedClassifiedFeed,
      queryGetAllSavedByUserId,
      mutateGetClassifiedById,
      mutateUpdateDeletesavedclassified,
      queryGetUserChannel,
      queryGetAllStory,
      mutateSaveLikedVideo,
      queryGetTopicByUserId,
      mutateGetClassifiedByUserId,
      queryGetVideoPlaylistByPlaylistId,
      mutateGetUploadVideoByUserId,
      queryGetlikesVideoByUserId,
      queryGetlikesTopicByUserId,
      mutateLikeDislikeTopic,
      mutateLikeDislikeVideo,
      mutateUpdateDeletesavedVideo,
      queryGetAllSavedByUserIdpageNumber,
      mutateUploadVideoByUser,
      mutateCreateClassifiedDetail,
      mutateUploadVideoPlaylist,
      mutateGetBlockedUser,
      mutateStoreDeviceId,
      queryGetSearchedTopic,
      queryGetSearchedUser,
      queryGetSearchedclassified,
      mutateCreateUserRating,
      queryGetratingOnUserId,
      queryGetSearchedItem,
      queryGetAllLegalitiesData,
    },
    userStore,
  } = useStores()

  const loadStories = async () => {
    const res = await queryGetAllStory(undefined, { fetchPolicy: "network-only" })
    setStories(res.getAllStory?.data || [])
  }

  const getAndUpdatePosts = async (cache?: boolean) => {
    const res = await queryGetAllTopics(undefined, {
      fetchPolicy:
        cache === undefined ? "cache-and-network" : cache ? "cache-first" : "network-only",
    })
    setFeedTopics(res.getAllTopics)
  }

  const loadMorePosts = async () => {
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: parseInt((feedTopics.length / 10).toFixed(0)) },
      { fetchPolicy: "network-only" },
    )

    const morePosts = res.getAllTopicByPageNumber?.data

    addtoFeedTopics(morePosts)
  }

  const refreshPosts = async () => {
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: 1 },
      { fetchPolicy: "network-only" },
    )

    setFeedTopics(res.getAllTopicByPageNumber?.data)
    syncInteractedVideosAndTopics()
  }

  const loadMoreClassified = async () => {
    const res = await queryGetAllClassifiedFeed(
      { pageNumber: parseInt((classifieds.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )

    const moreClassified = res.getAllClassifiedFeed?.data

    if (res.getAllClassifiedFeed.totalCount > classifieds?.length) {
      addToClassfieds(moreClassified)
    }
  }

  const refreshClassifieds = async () => {
    const res = await queryGetAllClassifiedFeed({ pageNumber: 0 }, { fetchPolicy: "no-cache" })

    setClassifieds(res.getAllClassifiedFeed?.data)
  }

  const loadMoreTopics = async () => {
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: parseInt((topics.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )

    const moreTopics = res.getAllTopicByPageNumber?.data
    if (res.getAllTopicByPageNumber.totalCount > topics?.length) {
      addToTopics(moreTopics)
    }
  }

  const refreshTopics = async () => {
    const res = await queryGetAllTopicByPageNumber({ pageNumber: 1 }, { fetchPolicy: "no-cache" })

    await syncInteractedVideosAndTopics()
    setTopics(res.getAllTopicByPageNumber?.data)
    await syncInteractedVideosAndTopics()
  }

  const postComment = async (comment: string, topicId: string) => {
    const res = await mutateCommentOnTopic({ userId: userStore._id, comment, topicId })
  }

  const getCommentsOnPost = async (topicId: string) => {
    const res = await queryGetCommentsByTopicId({ topicId }, { fetchPolicy: "network-only" })

    return res.getCommentsByTopicId.length === 1 && res.getCommentsByTopicId[0]?.comments
  }

  const createTopic = async ({ content, attachment }) => {
    const res = await mutateCreateUserTopic({
      attachmentUrl: attachment?.uri || "",
      attachmentType: attachment?.type || "",
      topicContent: content,
      userId: userStore._id,
    })
    await refreshTopics()
    await loadStories()
    // setTimeout(loadStories, 1000)
  }

  const updateProfile = async (firstName: string, lastName: string, picture: string) => {
    const res = await mutateUpdateUser({
      user: {
        first_name: firstName,
        last_name: lastName,
        name: firstName + " " + lastName,
        picture,
      },
      userId: userStore._id,
    })
    userStore.setUser({
      ...userStore,
      first_name: firstName,
      last_name: lastName,
      name: firstName + " " + lastName,
      picture,
    })
  }

  const syncSavedInteractionsHook = async () => {
    const res = await queryGetAllSavedByUserId(
      { userId: userStore?._id },
      { fetchPolicy: "no-cache" },
    )
    const savedVideoIds: Array<string> = []
    const savedClassifiedIds: Array<string> = []
    // eslint-disable-next-line array-callback-return
    res.getAllSavedByUserId?.data?.map((item: any) => {
      if (item?.savedType === "classified") {
        savedClassifiedIds.push(
          item?.ClassifiedFeedId?.length &&
            typeof item?.ClassifiedFeedId[0]?._id === "string" &&
            item?.ClassifiedFeedId[0]?._id,
        )
      }
      if (item?.savedType === "video") {
        savedVideoIds.push(
          item?.VideoDetail?.length &&
            typeof item?.VideoDetail[0]?._id === "string" &&
            item?.VideoDetail[0]?._id,
        )
      }
    })
    syncSavedInteractions({
      savedClassifieds: [...savedClassifiedIds],
      savedVideos: [...savedVideoIds],
    })
  }

  const interactWithSaveOnClassified = async (classifiedFeedId: string) => {
    try {
      if (getInteractionOnClassified(classifiedFeedId) === Interaction.notSaved) {
        const res = await mutateSaveLikedClassifiedFeed({
          classifiedFeedId,
          userId: userStore._id,
        })
        addToSavedClassified(classifiedFeedId)
        Toast.show(toastMessages.classifiedSavedSuccessfully)
      } else {
        await mutateUpdateDeletesavedclassified({
          classifiedsavedId: classifiedFeedId,
          userId: userStore?._id,
        })
        removeFromSavedClassifieds(classifiedFeedId)
        Toast.show(toastMessages.classifiedUnsavedSuccessfully)
      }
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const interactWithSaveOnVideo = async (videoId: string) => {
    try {
      if (getInteractionOnClassified(videoId) === Interaction.notSaved) {
        const res = await mutateSaveLikedVideo({
          videoId,
          userId: userStore._id,
        })
        addToSavedVideos(videoId)
        Toast.show(toastMessages.videoSavedSuccessfully)
      } else {
        const res = await mutateUpdateDeletesavedVideo({
          videosavedId: videoId,
          userId: userStore._id,
        })
        removeFromSavedVideos(videoId)
        Toast.show(toastMessages.videoUnsavedSuccessfully)
      }
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const saveVideo = async (videoId: string) => {
    const store = useStores()
    const res = await mutateSaveLikedVideo({
      userId: store.userStore._id,
      videoId,
    })
  }

  const refreshSavedClassifieds = async () => {
    const res = await queryGetAllSavedByUserIdpageNumber(
      {
        userId: userStore._id,
        pageNumber: 1,
      },
      { fetchPolicy: "no-cache" },
    )
    setSavedClassifieds(res.getAllSavedByUserIdpageNumber?.data)
  }

  const getClassified = async (classifiedId: string) => {
    const res = await mutateGetClassifiedById({
      classifiedId,
    })
    return res.getClassifiedById?.data[0]
  }

  const refreshVideos = async () => {
    const res = await queryGetUserChannel(undefined, { fetchPolicy: "no-cache" })
    setVideos(res.getUserChannel)

    await syncInteractedVideosAndTopics()
    return res.getUserChannel
  }

  const getUserTopics = async (userId: string) => {
    const res = await queryGetTopicByUserId({
      userId,
      pageNumber: 1,
    })

    return res.getTopicByUserId?.data
  }

  const loadMoreUserTopics = async (userId, pageNumber) => {
    const res = await queryGetTopicByUserId({
      userId,
      pageNumber,
    })

    return res.getTopicByUserId
  }

  const getUserVideos = async (userId: string) => {
    const res = await mutateGetUploadVideoByUserId({
      userId,
    })

    return res.getUploadVideoByUserId
  }

  const getUserClassifieds = async (userId: string) => {
    const res = await mutateGetClassifiedByUserId({
      userId,
    })

    return res.getClassifiedByUserId
  }

  const getPlaylist = async (playlistId: string) => {
    const res = await queryGetVideoPlaylistByPlaylistId(
      {
        playlistId,
      },
      { fetchPolicy: "network-only" },
    )

    return (
      res.getVideoPlaylistByPlaylistId?.data?.length > 0 &&
      res.getVideoPlaylistByPlaylistId?.data[0]
    )
  }

  const interactWithVideo = async (videoId: string, buttonType: "like" | "dislike") => {
    const getInputInteraction = () => {
      if (buttonType === "like") {
        if (getInteractionOnVideo(videoId) === Interaction.like) return Interaction.null
        else return Interaction.like
      } else {
        if (getInteractionOnVideo(videoId) === Interaction.dislike) return Interaction.null
        else return Interaction.dislike
      }
    }
    const inputInteraction = getInputInteraction()

    try {
      await mutateLikeDislikeVideo({
        videoId,
        userId: userStore._id,
        status: inputInteraction,
      })
      if (inputInteraction === Interaction.like) {
        addToLikedVideos(videoId)
        removefromDislikedVideos(videoId)
      }
      if (inputInteraction === Interaction.dislike) {
        addToDislikedVideos(videoId)
        removefromLikedVideos(videoId)
      }
      if (inputInteraction === Interaction.null) {
        removefromDislikedVideos(videoId)
        removefromLikedVideos(videoId)
      }
    } catch (err) {}
  }
  const getInputInteraction = (buttonType, currentInteraction) => {
    if (buttonType === "like") {
      if (currentInteraction === Interaction.like) return Interaction.null
      else return Interaction.like
    } else {
      if (currentInteraction === Interaction.dislike) return Interaction.null
      else return Interaction.dislike
    }
  }

  const interactWithTopic = async (topicId: string, buttonType: "like" | "dislike") => {
    const currentInteraction = getInteractionOnTopic(topicId)
    const inputInteraction = getInputInteraction(buttonType, currentInteraction)
    try {
      await mutateLikeDislikeTopic({
        topicId,
        userId: userStore._id,
        status: inputInteraction,
      })
      if (inputInteraction === Interaction.like) {
        addToLikedTopics(topicId)
        removefromDislikedTopics(topicId)
      }
      if (inputInteraction === Interaction.dislike) {
        addToDislikedTopics(topicId)
        removefromLikedTopics(topicId)
      }
      if (inputInteraction === Interaction.null) {
        removefromDislikedTopics(topicId)
        removefromLikedTopics(topicId)
      }
    } catch (err) {}
  }

  const syncInteractedVideosAndTopics = async () => {
    const likedTopics = []
    const disLikedTopics = []
    const likedVideos = []
    const disLikedVideos = []

    try {
      // Getting Liked Topics and Mapping to just get the Ids
      const resStatusOnTopics = await queryGetlikesTopicByUserId({
        userId: userStore._id,
      })
      // eslint-disable-next-line array-callback-return
      resStatusOnTopics.getlikesTopicByUserId.map((item: any) => {
        if (item?.status === Interaction.like) likedTopics.push(item._id)
        if (item?.status === Interaction.dislike) disLikedTopics.push(item._id)
      })
      // Getting Liked Videos and Mapping to just get the Ids
      const resStatusOnVideos = await queryGetlikesVideoByUserId({
        userId: userStore._id,
      })
      // eslint-disable-next-line array-callback-return
      resStatusOnVideos.getlikesVideoByUserId.map((item: any) => {
        if (item?.status === Interaction.like) likedVideos.push(item._id)
        if (item?.status === Interaction.dislike) disLikedVideos.push(item._id)
      })
      syncInteractions({
        videos: {
          liked: likedVideos,
          disliked: disLikedVideos,
        },
        topics: {
          liked: likedTopics,
          disliked: disLikedTopics,
        },
      })
    } catch (err) {}
  }

  const uploadVideo = async ({
    videoHeading,
    thumbnailUrl,
    attachmentVideoUrl,
    vedioPlaylistId,
  }: {
    videoHeading: string
    thumbnailUrl: string
    attachmentVideoUrl: string
    vedioPlaylistId?: string
  }) => {
    let body: any = {
      videoHeading,
      thumbnailUrl,
      attachmentVideoUrl,
      userId: userStore._id,
    }
    if (vedioPlaylistId) {
      body = { ...body, vedioPlaylistId }
    }
    const res = await mutateUploadVideoByUser(body)
    setTimeout(async () => await loadStories(), 1000)
  }

  const createClassified = async ({ attachmentUrl, title, prize, classifiedDetail, condition }) => {
    const res = await mutateCreateClassifiedDetail({
      attachmentUrl,
      attachmentType: "image",
      title,
      prize,
      classifiedDetail,
      userId: userStore._id,
      condition,
    })
    setTimeout(async () => await loadStories(), 1000)
  }

  const createEmptyPlaylist = async (playListName: string) => {
    try {
      const res = await mutateUploadVideoPlaylist({
        playListName,
        userId: userStore._id,
        videoUpload: [],
      })
      Toast.show(toastMessages.createdSuccessfully)
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const storeDeviceInfo = async () => {
    const deviceId = await getUniqueId()
    try {
      const res = await mutateStoreDeviceId({
        userId: userStore._id,
        deviceId,
      })
    } catch (err) {}
  }

  const isUserBlocked = async () => {
    const deviceId = await getUniqueId()
    try {
      const res = await mutateGetBlockedUser({
        userId: userStore._id,
        deviceId,
      })
      setBlocked(res.getBlockedUser?.status)
      if (res.getBlockedUser?.status) {
        setAuthToken(undefined)
      }
    } catch (err) {}
  }

  const rateUser = async (userId: string, rating: number) => {
    try {
      const res = await mutateCreateUserRating({
        userId,
        ratinguserId: userStore._id,
        ratingStar: rating,
      })
      return true
    } catch (err) {
      return false
    }
  }

  const getRatingOnUser = async (userId: string) => {
    const res = await queryGetratingOnUserId({ userId }, { fetchPolicy: "no-cache" })
    return res.getratingOnUserId?.data?.length > 0 ? res.getratingOnUserId?.data[0].ratingStar : 0
  }

  const onBoot = async () => {
    await storeDeviceInfo()
    await isUserBlocked()
  }

  const onLoggedInBoot = async () => {
    await syncSavedInteractionsHook()
    await syncInteractedVideosAndTopics()
    await refreshTopics()
    await refreshPosts()
    await refreshClassifieds()
    await refreshVideos()
    await loadStories()
  }

  const searchKeyword = async (searchKey: string) => {
    try {
      const resTopics = await queryGetSearchedTopic(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      const resClassifieds = await queryGetSearchedclassified(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      const resUsers = await queryGetSearchedUser(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      const resVideos = await queryGetSearchedItem(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      setResults({
        classifieds: resClassifieds.getSearchedclassified?.data || [],
        topics: resTopics.getSearchedTopic?.data || [],
        users: resUsers.getSearchedUser?.data || [],
        videos: resVideos.getSearchedItem?.data || [],
      })
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const searchUser = async (searchKey: string) => {
    try {
      console.log(searchKey)
      const resUsers = await queryGetSearchedUser(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      console.log("resUsers",resUsers)
      return resUsers.getSearchedUser?.data || []
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
      return []
    }
  }

  const getLegalities = async () => {
    try {
      const res = await queryGetAllLegalitiesData()
      return res.getAllLegalitiesData.length > 0
        ? res.getAllLegalitiesData[0].LegalitiesData
        : undefined
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
      return undefined
    }
  }

  return {
    onLoggedInBoot,
    getPlaylist,
    loadStories,
    getAndUpdatePosts,
    postComment,
    getCommentsOnPost,
    loadMoreTopics,
    refreshTopics,
    loadMorePosts,
    refreshPosts,
    updateProfile,
    createTopic,
    refreshClassifieds,
    loadMoreClassified,
    interactWithSaveOnClassified,
    refreshSavedClassifieds,
    getClassified,
    refreshVideos,
    saveVideo,
    getUserTopics,
    loadMoreUserTopics,
    getUserClassifieds,
    getUserVideos,
    syncInteractedVideosAndTopics,
    interactWithVideo,
    interactWithTopic,
    interactWithSaveOnVideo,
    syncSavedInteractions,
    syncSavedInteractionsHook,
    onBoot,
    uploadVideo,
    createClassified,
    createEmptyPlaylist,
    searchKeyword,
    getRatingOnUser,
    rateUser,
    getLegalities,
    searchUser
  }
}
