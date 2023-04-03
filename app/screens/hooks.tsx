import { useStores } from "../models"
import { Interaction } from "../utils/enums"
import Toast from "react-native-toast-message"
import { toastMessages } from "../utils/toastMessages"
import { getUniqueId } from "react-native-device-info"
import { messageMetadataType } from "../utils"
import messaging from "@react-native-firebase/messaging"
import { RNS3 } from "react-native-upload-aws-s3"
import { Alert } from "react-native"

export function useHooks() {
  const {
    subscribeAll,
    authenticationStore: { setBlocked, setAuthToken },
    searchStore: { setResults },
    feedStore: {
      setTopics: setFeedTopics,
      topics: feedTopics,
      addToTopics: addtoFeedTopics,
      addToHomeFeed,
      setHomeFeed,
      setStories,
      homeFeed,
    },
    classfieds: { setClassifieds, addToClassfieds, classifieds },
    topics: { setTopics, topics, addToTopics },
    saved: { setSavedClassifieds },
    videos: { setVideos },
    allChats: { setChatRooms, updateRoomMessages, mergeChatPage, chatMessages },
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
      mutateAddNotificationToken,
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
      mutateAddOfferanswerInRoom,
      mutateGetchatByRoomId,
      mutateGetroomByUsers,
      mutateCreateUserMessage,
      mutateGetUserById,
      mutateGetroomBymembers,
      mutateCreateChatRoom,
      mutateCreateUserHomePages,
      queryGetAllHomePagesByPageNumber,
      mutateDeleteChatRoom,
      mutateSetNotificationStatus,
      mutateVerifyEmailByEmail,
      mutateSendCallNotification,
      mutateGetroomByroomId,

    },
    userStore,
  } = useStores()

  const resetPassword = async ({ email, otp, password }) => {
    console.log("password", password, email, otp)
    const res = await mutateVerifyEmailByEmail({ email, otp, password })
    return res.verifyEmailByEmail?.Succes
  }

  const loadStories = async () => {
    try {
      const res = await queryGetAllStory(undefined, { fetchPolicy: "network-only" })
      setStories(res.getAllStory?.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  const getAndUpdateHomeFeed = async (cache?: boolean) => {
    const res = await queryGetAllTopics(undefined, {
      fetchPolicy:
        cache === undefined ? "cache-and-network" : cache ? "cache-first" : "network-only",
    })
    console.log()
    setHomeFeed(res.getAllTopics)
  }

  const loadMoreHomeFeed = async () => {
    const res = await queryGetAllHomePagesByPageNumber(
      { pageNumber: parseInt((feedTopics.length / 10 + 1).toFixed(0)) },
      { fetchPolicy: "network-only" },
    )
    const morePosts = res.getAllHomePagesByPageNumber?.data
    if (res.getAllHomePagesByPageNumber.totalCount > homeFeed?.length) {
      addToHomeFeed(morePosts)
    }
  }

  const refreshHomeFeed = async () => {
    try {
      const res = await queryGetAllHomePagesByPageNumber(
        { pageNumber: 1 },
        { fetchPolicy: "network-only" },
      )
      console.log("HOME FEED", res.getAllHomePagesByPageNumber)
      setHomeFeed(res.getAllHomePagesByPageNumber?.data)
      // syncInteractedVideosAndTopics()
    } catch (err) {
      console.log(err)
    }
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
    try {
      const res = await queryGetAllTopicByPageNumber(
        { pageNumber: 1 },
        { fetchPolicy: "network-only" },
      )

      setFeedTopics(res.getAllTopicByPageNumber?.data)
      syncInteractedVideosAndTopics()
    } catch (err) {
      console.log(err)
    }
  }

  const loadMoreClassified = async () => {
    const res = await queryGetAllClassifiedFeed(
      { pageNumber: parseInt((classifieds.length / 10 + 1).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )
    const moreClassified = res.getAllClassifiedFeed?.data
    if (res.getAllClassifiedFeed.totalCount > classifieds?.length) {
      addToClassfieds(moreClassified)
    }
  }

  const refreshClassifieds = async () => {
    try {
      const res = await queryGetAllClassifiedFeed({ pageNumber: 0 }, { fetchPolicy: "no-cache" })

      setClassifieds(res.getAllClassifiedFeed?.data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadMoreTopics = async () => {
    console.log("LOAD MORE TOPICS")
    const res = await queryGetAllTopicByPageNumber(
      { pageNumber: parseInt((topics.length / 10 + 1).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )

    const moreTopics = res.getAllTopicByPageNumber?.data
    if (res.getAllTopicByPageNumber.totalCount > topics?.length) {
      addToTopics(moreTopics)
      await syncInteractedVideosAndTopics()
    }
  }

  const refreshTopics = async () => {
    try {
      const res = await queryGetAllTopicByPageNumber({ pageNumber: 1 }, { fetchPolicy: "no-cache" })
      console.log("DATA:queryGetAllTopicByPageNumber", res)
      setTopics(res.getAllTopicByPageNumber?.data)
      await syncInteractedVideosAndTopics()
      // await syncInteractedVideosAndTopics()
    } catch (err) {
      console.log(err)
    }
  }

  const postComment = async (comment: string, selectedMedia: any, topicId: string) => {
    let imageUrl = ""
    if (selectedMedia) {
      imageUrl = await uploadToS3({
        uri: selectedMedia?.uri,
        type: selectedMedia?.type,
        name: selectedMedia?.fileName,
      })
    }
    const res = await mutateCommentOnTopic({
      userId: userStore._id,
      acttachmentUrl: imageUrl,
      acttachmentType: "image",
      comment,
      topicId,
    })
  }

  const getCommentsOnPost = async (topicId: string) => {
    const res = await queryGetCommentsByTopicId({ topicId }, { fetchPolicy: "network-only" })

    return res.getCommentsByTopicId.length === 1 && res.getCommentsByTopicId[0]?.comments
  }

  const createTopic = async ({ content, attachment, title }) => {
    if (title.length === 0 || content?.length === 0) return
    const imageUrl = attachment
      ? await uploadToS3({
          uri: attachment?.uri,
          type: attachment?.type,
          name: attachment?.fileName,
        })
      : undefined

    console.log("IMAGE URL", imageUrl)
    try {
      const res = await mutateCreateUserTopic({
        attachmentUrl: imageUrl,
        attachmentType: attachment?.type || "",
        topicContent: content,
        userId: userStore._id,
        title,
      })
      console.log("RES CREATE TOPIC", res)
    } catch (err) {
      Alert.alert(err)
    }
  }
  // refreshTopics()
  // loadStories()
  // setTimeout(loadStories, 1000)

  const createPost = async ({ content, attachment }) => {
    if (content?.length === 0) return
    const imageUrl = attachment
      ? await uploadToS3({
          uri: attachment?.uri,
          type: attachment?.type,
          name: attachment?.fileName,
        })
      : undefined

    console.log("IMAGE URL", imageUrl)
    console.log("createPost:imageUrl", imageUrl)
    try {
      await mutateCreateUserHomePages({
        attachmentUrl: imageUrl,
        attachmentType: attachment?.type || "",
        userId: userStore._id,
        discription: content,
      })
    } catch (err) {
      Alert.alert("Something Went Wrong!")
    }
    refreshHomeFeed()
    loadStories()
    // setTimeout(loadStories, 1000)
  }

  const updateProfile = async (
    firstName: string,
    lastName: string,
    attachment: any,
    bio: string,
  ) => {
    try {
      const imageUrl = await uploadToS3({
        uri: attachment?.uri,
        type: attachment?.type,
        name: attachment?.fileName,
      })
      const res = await mutateUpdateUser({
        user: {
          first_name: firstName,
          last_name: lastName,
          name: firstName + " " + lastName,
          picture: imageUrl,
          description: bio,
        },
        userId: userStore._id,
      })
      console.log("UPDATE USER MUTATION", res)
      userStore.setUser({
        ...userStore,
        first_name: firstName,
        last_name: lastName,
        name: firstName + " " + lastName,
        picture: imageUrl,
        description: bio,
      })
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const getMoreChatMessages = async ({ roomId }) => {
    const prePage = parseInt((chatMessages[roomId]?.length / 20).toFixed(0))
    const res = await mutateGetchatByRoomId({ roomId, pageNumber: prePage + 1 })
    console.log("ROOM MESSAGES", res.getchatByRoomId)
    mergeChatPage({ roomId, messages: res.getchatByRoomId?.data, previousPage: prePage })
    if (res.getchatByRoomId?.data?.length < 20) {
      return { lastPage: true }
    }
    return { lastPage: false }
  }

  const syncSavedInteractionsHook = async () => {
    try {
      const res = await queryGetAllSavedByUserId(
        { userId: userStore?._id },
        { fetchPolicy: "no-cache" },
      )

      console.log("ALL SAVED INTERACTIONS", res)
      const savedVideoIds: Array<string> = []
      const savedClassifiedIds: Array<string> = []
      // eslint-disable-next-line array-callback-return
      res.getAllSavedByUserId?.data?.map((item: any) => {
        if (item?.savedType === "classified") {
          item?.ClassifiedFeedId?.length &&
            typeof item?.ClassifiedFeedId[0]?._id === "string" &&
            savedClassifiedIds.push(item?.ClassifiedFeedId[0]?._id)
        }
        if (item?.savedType === "video") {
          item?.VideoDetail?.length &&
            typeof item?.VideoDetail[0]?._id === "string" &&
            savedVideoIds.push(item?.VideoDetail[0]?._id)
        }
      })
      syncSavedInteractions({
        savedClassifieds: [...savedClassifiedIds],
        savedVideos: [...savedVideoIds],
      })
    } catch (err) {
      console.log(err)
    }
  }

  const interactWithSaveOnClassified = async (classifiedFeedId: string) => {
    const currentStatus = getInteractionOnClassified(classifiedFeedId)
    console.log("CLASSIFIED:", classifiedFeedId, currentStatus)
    try {
      if (currentStatus === Interaction.notSaved) {
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
      console.log("ERR", err)
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const interactWithSaveOnVideo = async (videoId: string) => {
    const currentStatus = getSavedInteractionOnVideo(videoId)
    console.log("SAVE VIDEO", videoId, "Current Status : ", currentStatus)
    try {
      if (currentStatus === Interaction.notSaved) {
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
    try {
      const res = await queryGetUserChannel(undefined, { fetchPolicy: "no-cache" })
      setVideos(res.getUserChannel)

      await syncInteractedVideosAndTopics()
      return res.getUserChannel
    } catch (err) {
      console.log(err)
    }
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
    console.log("Current Interaction", videoId, buttonType, inputInteraction)
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
      const res = await mutateLikeDislikeTopic({
        topicId,
        userId: userStore._id,
        status: inputInteraction,
      })
      console.log("API RESP", res)
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
      console.log("CURRENT INTERACTION", currentInteraction)
      console.log("inputInteraction", inputInteraction)
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
    const imageUrl = await uploadToS3({ uri: attachmentUrl, name: title, type: "image" })

    const res = await mutateCreateClassifiedDetail({
      attachmentUrl: imageUrl,
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
      await mutateCreateUserRating({
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
    console.log("RUNNING = onLoggedInBoot")
    subscribeAll()
    await syncAllChats()
    await syncSavedInteractionsHook()
    await syncInteractedVideosAndTopics()
    await refreshTopics()
    await refreshPosts()
    await refreshClassifieds()
    await refreshVideos()
    await loadStories()
    await updateNotificationToken()
  }

  const searchKeyword = async (searchKey: string) => {
    console.log("SEARCHING", searchKey)
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
      const resUsers = await queryGetSearchedUser(
        { searchKey, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )

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

  const syncAllChats = async () => {
    try {
      const res = await mutateGetroomByUsers({ memberId: userStore._id })
      setChatRooms(res.getroomByUsers?.data)
    } catch (err) {
      console.log(err)
    }
  }

  const syncChatMessages = async (roomId: string) => {
    console.log("RROM ORROMORMORMRO ID", roomId)
    try {
      const res = await mutateGetchatByRoomId({ roomId, pageNumber: 1 })
      console.log("ROOM MESSAGES", res.getchatByRoomId)
      updateRoomMessages({ roomId, messages: res.getchatByRoomId?.data || [] })
      if (res.getchatByRoomId?.data?.length < 20) {
        return { lastPage: true }
      }
      return { lastPage: false }
    } catch (err) {
      return { lastPage: false }
    }
  }

  const sendAttachment = async ({ roomId, attachment, receiverId }) => {
    try {
      const imageUrl = await uploadToS3({
        name: attachment?.fileName,
        uri: attachment?.uri,
        type: attachment?.type,
      })
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: "",
        membersId: [{ userId1: userStore._id }, { userId1: receiverId }],
        messageType: "image",
        uri: imageUrl,
        height: attachment?.height || 0,
        width: attachment?.width || 0,
        metaData: {
          metaDataType: "",
          amount: "",
          currency: "",
          data: "",
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {
      Alert.alert("Unable to Send Attachment!")
    }
  }

  const sendTextMessage = async (roomId: string, text: string, receiverId: string) => {
    console.log("userStore._id", userStore._id)
    console.log("receiverId", userStore._id)
    try {
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text,
        membersId: [{ userId1: userStore._id }, { userId1: receiverId }],
        messageType: "text",
        metaData: {
          metaDataType: "",
          amount: "",
          currency: "",
          data: "",
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {}
  }

  const sendCallOffer = async (
    roomId: string,
    receiverId: string,
    offer: string,
    mode: "video" | "audio",
  ) => {
    console.log("userStore._id", userStore._id)
    console.log("receiverId", receiverId)
    console.log("offer", offer)
    try {
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: "Initiated Call !",
        membersId: [{ userId1: receiverId }, { userId1: userStore._id }],
        messageType: "custom",
        metaData: {
          metaDataType:
            mode === "audio"
              ? messageMetadataType.incomingCallOfferAudio
              : messageMetadataType.incomingCallOfferVideo,
          amount: "",
          currency: "",
          data: JSON.stringify(offer),
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {}
  }

  const acceptCallOffer = async (roomId: string, receiverId: string, answer: string) => {
    console.log("userStore._id", userStore._id)
    try {
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: "Accepted Call !",
        membersId: [{ userId1: receiverId }, { userId1: userStore._id }],
        messageType: "custom",
        metaData: {
          metaDataType: messageMetadataType.incomingCallAnswer,
          amount: "",
          currency: "",
          data: JSON.stringify(answer),
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {}
  }

  const hangUpCall = async (roomId: string, receiverId: string) => {
    console.log("userStore._id", userStore._id)
    try {
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: "",
        membersId: [{ userId1: receiverId }, { userId1: userStore._id }],
        messageType: "custom",
        metaData: {
          metaDataType: messageMetadataType.hangUpCall,
          amount: "",
          currency: "",
          data: "",
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {}
  }

  const getUserById = async (userId: string) => {
    try {
      const res = await mutateGetUserById({ userId })
      console.log("CONNECTED USER FOR ", userStore.name, res.getUserById)
      return res.getUserById
    } catch (err) {
      return undefined
    }
  }

  const getOrCreateRoom = async (receiverId: string) => {
    console.log("RECEIVER", receiverId)
    console.log("SENDER", userStore?._id)
    try {
      const resCreate = await mutateCreateChatRoom({
        membersId: [{ userId1: receiverId }, { userId1: userStore?._id }],
        adminId: receiverId,
      })
      console.log("resCreate", resCreate.createChatRoom)
      return resCreate.createChatRoom?._id
    } catch (err) {
      try {
        const res = await mutateGetroomBymembers({
          members: [{ userId1: receiverId }, { userId1: userStore?._id }],
        })
        console.log("ROOM FOUND", res.getroomBymembers)

        return res.getroomBymembers?.data[0]?._id
      } catch (err) {}
    }
  }

  const sendClassfiedOffer = async (
    roomId: string,
    receiverId: string,
    amount: string,
    classifiedData: any,
  ) => {
    console.log("SEND CLASSIFIED OFFER , ", roomId, amount)
    try {
      const res = await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: "Classified Offer !",
        membersId: [{ userId1: receiverId }, { userId1: userStore._id }],
        messageType: "custom",
        metaData: {
          metaDataType: messageMetadataType.classifiedOffer,
          amount,
          currency: "$",
          data: JSON.stringify(classifiedData),
        },
      })
      console.log("CREATED USER MESSAGE", res.createUserMessage)
    } catch (err) {}
  }

  const deleteChatRoom = async (roomId: string) => {
    console.log("Delete Chat Room ", roomId)
    try {
      const res = await mutateDeleteChatRoom({
        roomId,
      })
      syncAllChats()
    } catch (err) {}
  }

  const updateNotificationToken = async () => {
    try {
      const token = await messaging().getToken()
      const res = await mutateAddNotificationToken({
        userId: userStore._id,
        notificationToken: token,
      })
      console.log("mutateAddNotificationToken", res)
    } catch (err) {
      console.log("ERR:mutateAddNotificationToken", err)
    }
  }

  const uploadToS3 = async ({ uri, name, type }) => {
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri,
      name,
      type,
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "washzone-23",
      region: "us-west-2",
      // accessKey: "AKIAY5ERXJV4XD5VEE5R",
      // secretKey: "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",
      accessKey: "AKIAY5ERXJV45W2GS2H2",
      secretKey: "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",
      successActionStatus: 201,
    }
    console.log("FILE", file)
    try {
      console.log("UPLOADING")
      const response = await RNS3.put(file, options).progress((e) => console.log("PRGORESS", e))
      console.log("UPLOADED")
      if (response.status === 201) {
        return response.body?.postResponse?.location
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setNotificationStatus = async (b: boolean) => {
    try {
      const res = await mutateSetNotificationStatus({
        userId: userStore._id,
        notificationStatus: b,
      })
    } catch (err) {
      Toast.show({ ...toastMessages.somethingWentWrong })
    }
  }

  const getNotificationStatus = async () =>
    await mutateSetNotificationStatus({ userId: userStore._id, notificationStatus: true })

  const sendSilentAlert = async (
    token: string,
    type: string,
    roomId: string,
    data: { offer?: string; answer?: string },
    setter?: boolean,
  ) => {
    const resAddConnectionData = await mutateAddOfferanswerInRoom({ ...data, roomId })
    console.log("resAddConnectionData", resAddConnectionData)

    console.log(
      "mutateSendCallNotification:Input",
      token,
      " \n ",
      type,
      " \n ",
      roomId,
      " \n",
      setter,
    )
    const { _id, name } = userStore

    // we have to send a setter alert and then a actualy display alert
    // as we send the alert twice we need a way to identify each, we will do that via a type key in receiver
    // (Why Receiver? cuz rn, i am using Stringified JSON in receiver field and that being so, i can add remove feilds as per i see fit)

    const res = await mutateSendCallNotification({
      data: {
        roomId,
        type,
        receiver: JSON.stringify({ _id, name, setter }),
      },
      notificationToken: token,
    })
    console.log("mutateSendCallNotification", res)
  }

  const getRoomById = async (roomId: string) => {
    try {
      const res = await mutateGetroomByroomId({ roomId })
      console.log("RES::getRoomById", res.getroomByroomId?.data[0])
      return res.getroomByroomId?.data[0]
    } catch (err) {
      Alert.alert("Unable to Establish Connection!", "Please try again.")
    }
  }

  const getNotifications = async () => {
    try {
      const res = await mutateGetroomByroomId({ roomId })
      console.log("RES::getRoomById", res.getroomByroomId?.data[0])
      return res.getroomByroomId?.data[0]
    } catch (err) {
      Alert.alert("Unable to Establish Connection!", "Please try again.")
    }
  }


  return {
    getRoomById,
    sendSilentAlert,
    getMoreChatMessages,
    loadMoreHomeFeed,
    getAndUpdateHomeFeed,
    refreshHomeFeed,
    deleteChatRoom,
    sendClassfiedOffer,
    getOrCreateRoom,
    getUserById,
    hangUpCall,
    acceptCallOffer,
    sendCallOffer,
    syncAllChats,
    sendTextMessage,
    syncChatMessages,
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
    searchUser,
    createPost,
    updateNotificationToken,
    uploadToS3,
    sendAttachment,
    setNotificationStatus,
    getNotificationStatus,
    resetPassword,
  }
}

export const enum CallTypes {
  videoOffer = "video-offer",
  audioOffer = "audio-offer",
  answer = "call-answer",
  hangup = "hangup",
}
