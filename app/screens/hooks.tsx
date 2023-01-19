import { useStores } from "../models"
import { Interaction } from "../utils/enums"
import Toast from "react-native-toast-message"
import { toastMessages } from "../utils/toastMessages"

export function useHooks() {
  const {
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
    },
    userStore,
  } = useStores()

  const loadStories = async () => {
    const res = await queryGetAllStory({ fetchPolicy: "network-only" })
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
    console.log("lOADING MORE")
    console.log("FEEDPOSTSLENGTH", feedTopics.length)
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: parseInt((feedTopics.length / 10).toFixed(0)) },
      { fetchPolicy: "network-only" },
    )
    console.log(res)
    const morePosts = res.getAllTopicByPageNumber?.data
    console.log("MOREPOSTS", morePosts.length)
    addtoFeedTopics(morePosts)
  }

  const refreshPosts = async () => {
    console.log("REFRESHING")
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: 1 },
      { fetchPolicy: "network-only" },
    )
    console.log("refreshd", res.getAllTopicByPageNumber?.data)
    setFeedTopics(res.getAllTopicByPageNumber?.data)
  }

  const loadMoreClassified = async () => {
    console.log("lOADING MORE")
    console.log("FEEDPOSTSLENGTH", classifieds?.length)
    const res = await queryGetAllClassifiedFeed(
      { pageNumber: parseInt((classifieds.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )
    console.log(res)
    const moreClassified = res.getAllClassifiedFeed?.data
    console.log("moreClassified", moreClassified.length)
    if (res.getAllClassifiedFeed.totalCount > classifieds?.length) {
      addToClassfieds(moreClassified)
    }
  }

  const refreshClassifieds = async () => {
    console.log("REFRESHING", classifieds.length)
    const res = await queryGetAllClassifiedFeed({ pageNumber: 0 }, { fetchPolicy: "no-cache" })
    console.log("refreshd", res.getAllClassifiedFeed.totalCount)
    setClassifieds(res.getAllClassifiedFeed?.data)
  }

  const loadMoreTopics = async () => {
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: parseInt((topics.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )
    console.log(res.getAllTopicByPageNumber?.data)
    const moreTopics = res.getAllTopicByPageNumber?.data
    if (res.getAllTopicByPageNumber.totalCount > topics?.length) {
      addToTopics(moreTopics)
    }
  }

  const refreshTopics = async () => {
    const res = await queryGetAllTopicByPageNumber({ pageNumber: 1 }, { fetchPolicy: "no-cache" })
    console.log("refreshd", res.getAllTopicByPageNumber?.data)
    setTopics(res.getAllTopicByPageNumber?.data)
  }

  const postComment = async (comment: string, topicId: string) => {
    console.log(userStore._id)
    console.log(topicId)
    const res = await mutateCommentOnTopic({ userId: userStore._id, comment, topicId })
    console.log(res)
  }

  const getCommentsOnPost = async (topicId: string) => {
    console.log(userStore._id)
    console.log("TOPICIDDDD", topicId)
    const res = await queryGetCommentsByTopicId({ topicId }, { fetchPolicy: "network-only" })
    console.log("TOPIC COMMENTS", JSON.stringify(res.getCommentsByTopicId[0].comments))

    return res.getCommentsByTopicId.length === 1 && res.getCommentsByTopicId[0]?.comments
  }

  const createTopic = async ({ content, attachment }) => {
    const res = await mutateCreateUserTopic({
      attachmentUrl: attachment?.uri || "",
      attachmentType: attachment?.type || "",
      topicContent: content,
      userId: userStore._id,
    })
    console.log("CREATE TOPIC", res)
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
    console.log(res)
  }

  const syncSavedInteractionsHook = async () => {
    console.log("USERIDDD=>>", userStore?._id)
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
    console.log("SAVEDVIDEOS", savedVideoIds)
    console.log("savedClassifiedIds", savedClassifiedIds)

    syncSavedInteractions({
      savedClassifieds: [...savedClassifiedIds],
      savedVideos: [...savedVideoIds],
    })
  }

  const interactWithSaveOnClassified = async (classifiedFeedId: string) => {
    console.log("getInteractionOnClassified", getInteractionOnClassified(classifiedFeedId))
    try {
      if (getInteractionOnClassified(classifiedFeedId) === Interaction.notSaved) {
        const res = await mutateSaveLikedClassifiedFeed({
          classifiedFeedId,
          userId: userStore._id,
        })
        console.log("saveClassified", res)
        addToSavedClassified(classifiedFeedId)
        Toast.show(toastMessages.classifiedSavedSuccessfully)
      } else {
        const res = await mutateUpdateDeletesavedclassified({
          classifiedsavedId: classifiedFeedId,
          userId: userStore?._id,
        })
        removeFromSavedClassifieds(classifiedFeedId)
        Toast.show(toastMessages.classifiedUnsavedSuccessfully)
      }
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)

      console.log(err)
    }
  }

  const interactWithSaveOnVideo = async (videoId: string) => {
    console.log("getSavedInteractionOnVideo", getSavedInteractionOnVideo(videoId))
    try {
      if (getInteractionOnClassified(videoId) === Interaction.notSaved) {
        const res = await mutateSaveLikedVideo({
          videoId,
          userId: userStore._id,
        })
        console.log("saveClassified", res)
        addToSavedVideos(videoId)
        Toast.show(toastMessages.videoSavedSuccessfully)
      } else {
        const res = await mutateUpdateDeletesavedVideo({
          videosavedId: videoId,
          userId: userStore._id,
        })
        console.log("UNSAVING", res)
        removeFromSavedVideos(videoId)
        Toast.show(toastMessages.videoUnsavedSuccessfully)
      }
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
      console.log(err)
    }
  }

  const saveVideo = async (videoId: string) => {
    const store = useStores()
    const res = await mutateSaveLikedVideo({
      userId: store.userStore._id,
      videoId,
    })
    console.log(res)
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
    console.log("saveClassified", JSON.stringify(res.getAllSavedByUserIdpageNumber?.data))
  }

  const getClassified = async (classifiedId: string) => {
    const res = await mutateGetClassifiedById({
      classifiedId,
    })
    return res.getClassifiedById?.data[0]
  }

  const getVideos = async () => {
    const res = await queryGetUserChannel()
    setVideos(res.getUserChannel)
    console.log("VIDEOS", res)
    return res.getUserChannel
  }

  const getUserTopics = async (userId: string) => {
    const res = await queryGetTopicByUserId({
      userId,
      pageNumber: 1,
    })
    console.log("USERTOPICAS", res.getTopicByUserId)
    return res.getTopicByUserId?.data
  }

  const loadMoreUserTopics = async (userId, pageNumber) => {
    const res = await queryGetTopicByUserId({
      userId,
      pageNumber,
    })
    console.log(res.getTopicByUserId)
    return res.getTopicByUserId
  }

  const getUserVideos = async (userId: string) => {
    console.log("USERID< VIDEOS", userId)

    const res = await mutateGetUploadVideoByUserId({
      userId,
    })
    console.log(res.getUploadVideoByUserId)
    return res.getUploadVideoByUserId
  }

  const getUserClassifieds = async (userId: string) => {
    const res = await mutateGetClassifiedByUserId({
      userId,
    })
    console.log(res.getClassifiedByUserId)
    return res.getClassifiedByUserId
  }

  const getPlaylist = async (playlistId: string) => {
    const res = await queryGetVideoPlaylistByPlaylistId({
      playlistId,
    })
    console.log(res.getVideoPlaylistByPlaylistId)
    return (
      res.getVideoPlaylistByPlaylistId?.data?.length > 0 &&
      res.getVideoPlaylistByPlaylistId?.data[0]
    )
  }

  const interactWithVideo = async (videoId: string, buttonType: "like" | "dislike") => {
    console.log("VIDEOID IN HOOK", videoId)
    console.log("INPUT INTERACTION", getInteractionOnVideo(videoId))

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
    console.log("INPUT INTERACTION", inputInteraction)
    try {
      await mutateLikeDislikeVideo({
        videoId,
        userId: userStore._id,
        status: inputInteraction,
      })
      if (inputInteraction === Interaction.like) {
        console.log("LIKING")
        addToLikedVideos(videoId)
        removefromDislikedVideos(videoId)
      }
      if (inputInteraction === Interaction.dislike) {
        console.log("DIS-LIKING")
        addToDislikedVideos(videoId)
        removefromLikedVideos(videoId)
      }
      if (inputInteraction === Interaction.null) {
        console.log("SETTING TO NULL")
        removefromDislikedVideos(videoId)
        removefromLikedVideos(videoId)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const interactWithTopic = async (topicId: string, buttonType: "like" | "dislike") => {
    console.log("topicId IN HOOK", topicId)
    console.log("INPUT INTERACTION", getInteractionOnTopic(topicId))

    const getInputInteraction = () => {
      if (buttonType === "like") {
        if (getInteractionOnTopic(topicId) === Interaction.like) return Interaction.null
        else return Interaction.like
      } else {
        if (getInteractionOnTopic(topicId) === Interaction.dislike) return Interaction.null
        else return Interaction.dislike
      }
    }
    const inputInteraction = getInputInteraction()
    console.log("INPUT INTERACTION", inputInteraction)
    try {
      await mutateLikeDislikeTopic({
        topicId,
        userId: userStore._id,
        status: inputInteraction,
      })
      if (inputInteraction === Interaction.like) {
        console.log("LIKING")
        addToLikedTopics(topicId)
        removefromDislikedTopics(topicId)
      }
      if (inputInteraction === Interaction.dislike) {
        console.log("DIS-LIKING")
        addToDislikedTopics(topicId)
        removefromLikedTopics(topicId)
      }
      if (inputInteraction === Interaction.null) {
        console.log("SETTING TO NULL")
        removefromDislikedTopics(topicId)
        removefromLikedTopics(topicId)
      }
    } catch (err) {
      console.log(err)
    }
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

  const onBoot = async () => {
    await syncSavedInteractionsHook()
    await syncInteractedVideosAndTopics()
  }

  return {
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
    getVideos,
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
  }
}
