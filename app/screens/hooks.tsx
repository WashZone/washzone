import { useStores } from "../models"
import { Interaction } from "../utils/enums"
import Toast from "react-native-toast-message"
import { toastMessages } from "../utils/toastMessages"
import { getUniqueId } from "react-native-device-info"
import { messageMetadataType } from "../utils"
import messaging from "@react-native-firebase/messaging"
import { RNS3 } from "react-native-upload-aws-s3"
import { Alert } from "react-native"
import { getInputInteraction, getTaggedIds, likeDislikeCountUpdater } from "../utils/helpers"
import * as Haptics from "expo-haptics"

export function useHooks() {
  const {
    subscribeAll,
    authenticationStore: { setBlocked, setAuthToken },
    searchStore: { setResults },
    feedStore: {
      updateHomePostInteractionLocally,
      addToHomeFeed,
      setHomeFeed,
      setStories,
      homeFeed,
    },
    classfieds: { setClassifieds, addToClassfieds, classifieds },
    topics: { setTopics, topics, addToTopics, updateTopicInteractionLocally },
    saved: { setSavedClassifieds },
    videos: { setVideos, updateVideoInteractionLocally },
    allChats: { setChatRooms, updateRoomMessages, mergeChatPage, chatMessages, syncUnreadCount },
    notificationStore: { setNotifications },
    interaction: {
      getInteractionOnClassified,
      getSavedInteractionOnVideo,
      addToSavedClassified,
      addToSavedVideos,
      removeFromSavedClassifieds,
      removeFromSavedVideos,
      syncSavedInteractions,
    },
    api: {
      mutateAddNotificationToken,
      queryGetAllPlaylistVideo,
      queryGetAllTopicByPageNumberInteraction,
      mutateCommentOnTopic,
      queryGetCommentsByTopicId,
      queryFollowerDetailsByCallerId,
      queryGetfollower,
      queryGetfollowing,
      queryGetAllClassifiedFeed,
      mutateUpdateUser,
      mutateCreateUserTopic,
      mutateSaveLikedClassifiedFeed,
      queryGetAllSavedByUserId,
      mutateGetClassifiedById,
      mutateUpdateDeletesavedclassified,
      mutateSaveLikedVideo,
      queryGetTopicByUsersId,
      mutateGetClassifiedByUserId,
      queryGetUploadedVideoByUserIdPage,
      queryGetVideoPlaylistByPlaylistId,
      mutateFollowUser,
      mutateUnfollowUser,
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
      queryCheckUserRating,
      mutateCreateUserHomePages,
      mutateLikeDislikehome,
      queryGetAllHomePagesByPageNumber,
      mutateDeleteChatRoom,
      mutateSetNotificationStatus,
      mutateVerifyEmailByEmail,
      mutateSendCallNotification,
      mutateGetroomByroomId,
      queryGetNotification,
      queryGetCommentsByHomePageId,
      mutateCommentOnHomepage,
      queryGetHomePagesByUsersId,
      mutateBlockUserId,
      mutateUnblockUserId,
      queryGetActivities,
      queryGetuserLikesonhome,
      queryGetuserLikesonTopic,
      queryGetuserLikesonVideo,
      mutateUpdatelastreadPostId,
    },
    userStore,
  } = useStores()

  const syncUser = async () => {
    const res = await getUserById(userStore?._id)
    userStore?.setUser({
      ...userStore,
      picture: res?.picture,
      blockedUser: res?.blockedUser,
    })
  }

  const resetPassword = async ({ email, otp, password }) => {
    const res = await mutateVerifyEmailByEmail({ email, otp, password })
    return res.verifyEmailByEmail?.Succes
  }


  const loadMoreHomeFeed = async () => {
    const res = await queryGetAllHomePagesByPageNumber(
      { pageNumber: parseInt((homeFeed.length / 10 + 1).toFixed(0)), userId: userStore._id },
      { fetchPolicy: "network-only" },
    )
    const morePosts = res.getAllHomePagesByPageNumber?.data
    if (res.getAllHomePagesByPageNumber.totalCount > homeFeed?.length) {
      addToHomeFeed(morePosts)
    }
  }

  const getUsersHomePosts = async (userId: string) => {
    const res = await queryGetHomePagesByUsersId(
      { pageNumber: 1, userId, callerId: userStore._id },
      { fetchPolicy: "network-only" },
    )
    return res.getHomePagesByUsersId?.data || []
  }

  const refreshHomeFeed = async () => {
    try {
      const res = await queryGetAllHomePagesByPageNumber(
        { pageNumber: 1, userId: userStore._id },
        { fetchPolicy: "no-cache" },
      )
      setHomeFeed(res.getAllHomePagesByPageNumber?.data)
      // syncInteractedVideosAndTopics()
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
    const res = await queryGetAllTopicByPageNumberInteraction(
      { userId: userStore._id, pageNumber: parseInt((topics.length / 10 + 1).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )

    const moreTopics = res.getAllTopicByPageNumberInteraction?.data
    if (res.getAllTopicByPageNumberInteraction.totalCount > topics?.length) {
      addToTopics(moreTopics)
      await syncInteractedVideosAndTopics()
    }
  }

  const refreshTopics = async () => {
    try {
      const res = await queryGetAllTopicByPageNumberInteraction(
        { userId: userStore._id, pageNumber: 1 },
        { fetchPolicy: "no-cache" },
      )
      setTopics(res.getAllTopicByPageNumberInteraction?.data)
      // await syncInteractedVideosAndTopics()
    } catch (err) {
      console.log(err)
    }
  }

  const postComment = async (
    comment: string,
    selectedMedia: any,
    topicId: string,
  ) => {
    let imageUrl = ""
    if (selectedMedia) {
      imageUrl = await uploadToS3({
        uri: selectedMedia?.uri,
        type: selectedMedia?.type,
        name: selectedMedia?.fileName,
      })
    }
    const topictagComment = getTaggedIds(comment)
    await mutateCommentOnTopic({
      userId: userStore._id,
      acttachmentUrl: imageUrl,
      acttachmentType: "image",
      comment,
      topicId,
      topictagComment: topictagComment?.map((i) => {
        return { topicTagCommentId: i }
      }),
    })
  }

  const postCommentOnHomePagePost = async (
    comment: string,
    selectedMedia: any,
    homePageId: string,
  ) => {
    let imageUrl = ""
    if (selectedMedia) {
      imageUrl = await uploadToS3({
        uri: selectedMedia?.uri,
        type: selectedMedia?.type,
        name: selectedMedia?.fileName,
      })
    }
    const taggedHomeComment = getTaggedIds(comment)

    await mutateCommentOnHomepage({
      userId: userStore._id,
      acttachmentUrl: imageUrl,
      acttachmentType: "image",
      comment,
      homePageId,
      taginHomeComment: taggedHomeComment?.map((i) => {
        return { taghomecommentId: i }
      }),
    })
  }

  const getCommentsOnPost = async (topicId: string) => {
    const res = await queryGetCommentsByTopicId({ topicId }, { fetchPolicy: "network-only" })

    return res.getCommentsByTopicId.length === 1 && res.getCommentsByTopicId[0]?.comments
  }

  const getCommentsOnHomePagePost = async (homePageId: string) => {
    const res = await queryGetCommentsByHomePageId({ homePageId }, { fetchPolicy: "network-only" })
    return res.getCommentsByHomePageId.length === 1 && res.getCommentsByHomePageId[0]?.comments
  }

  const createTopic = async ({ content, attachment, title, tagTopicUser }) => {
    if (title.length === 0 || content?.length === 0) return
    const imageUrl = attachment
      ? await uploadToS3({
        uri: attachment?.uri,
        type: attachment?.type,
        name: attachment?.fileName,
      })
      : undefined

    try {
      await mutateCreateUserTopic({
        tagTopicUser,
        attachmentUrl: imageUrl,
        attachmentType: attachment?.type || "",
        topicContent: content,
        userId: userStore._id,
        title,
      })
    } catch (err) {
      Alert.alert(err)
    }
  }

  const getProfileDetails = async (id: string) => {
    const res = await queryFollowerDetailsByCallerId(
      {
        followId: id,
        userId: userStore._id,
      },
      { fetchPolicy: "no-cache" },
    )
    return res.followerDetailsByCallerId
  }

  const getFollowers = async (id) => {
    const res = await queryGetfollower(
      {
        followId: id,
      },
      { fetchPolicy: 'network-only' },
    )
    console.log("FOLLOWERS : ", id, res)
    return res.getfollower
  }

  const getFollowings = async (id) => {
    const res = await queryGetfollowing(
      {
        userId: id,
      },
      { fetchPolicy: "no-cache" },
    )
    return res.getfollowing
  }

  const getLikesOnPost = async (homePageId: string) => {
    const res = await queryGetuserLikesonhome({ homePageId }, { fetchPolicy: "no-cache" })
    return res.getuserLikesonhome
  }

  const getLikesOnDiscussion = async (topicId: string) => {
    const res = await queryGetuserLikesonTopic({ topicId }, { fetchPolicy: "no-cache" })
    return res.getuserLikesonTopic
  }

  const getLikesOnVideo = async (videoId: string) => {
    const res = await queryGetuserLikesonVideo({ videoId }, { fetchPolicy: "no-cache" })
    return res.getuserLikesonVideo
  }

  const createPost = async ({
    content,
    attachments,
    setUploadProgress,
    tagUser,
  }: {
    content: string
    attachments: any[]
    tagUser: string[]
    setUploadProgress: (s: string) => void
  }) => {
    if (content?.length === 0 && attachments?.length === 0) return
    setUploadProgress(`0/${attachments?.length}`)
    console.log('tagUser', tagUser)
    const imageUrls = []
    if (attachments?.length > 0) {
      for (let i = 0; i < attachments.length; i++) {
        const url = await uploadToS3({
          uri: attachments[i]?.uri,
          type: attachments[i]?.type,
          name: attachments[i]?.fileName,
        })
        imageUrls.push(url)
        setUploadProgress(`${i + 1}/${attachments?.length}`)
      }
    }

    try {
      await mutateCreateUserHomePages({
        tagUser: tagUser?.map((i) => {
          return { tagId: i }
        }),
        attachmentUrl: imageUrls,
        attachmentType: "image",
        userId: userStore._id,
        discription: content,
      })
    } catch (err) {
      Alert.alert("Something Went Wrong!")
    }
    refreshHomeFeed()
  }

  const updateProfile = async (
    firstName: string,
    lastName: string,
    bio: string,
    attachment?: any,
    banner?: any,
  ) => {
    try {
      const imageUrl =
        typeof attachment === "string"
          ? attachment
          : await uploadToS3({
            uri: attachment?.uri,
            type: attachment?.type,
            name: attachment?.fileName,
          })
      const bannerUrl =
        typeof banner === "string"
          ? banner
          : await uploadToS3({
            uri: banner?.uri,
            type: banner?.type,
            name: banner?.fileName,
          })
      await mutateUpdateUser({
        user: {
          first_name: firstName,
          last_name: lastName,
          name: firstName + " " + lastName,
          picture: imageUrl,
          description: bio,
          banner: bannerUrl,
        },
        userId: userStore._id,
      })
      userStore.setUser({
        ...userStore,
        first_name: firstName,
        last_name: lastName,
        name: firstName + " " + lastName,
        picture: imageUrl,
        description: bio,
        banner: bannerUrl,
      })

    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const getMoreChatMessages = async ({ roomId }) => {
    const prePage = parseInt((chatMessages[roomId]?.length / 20).toFixed(0))
    const res = await mutateGetchatByRoomId({ roomId, pageNumber: prePage + 1 })
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
      const savedVideoIds: Array<string> = []
      const savedClassifiedIds: Array<string> = []
      // eslint-disable-next-line array-callback-return
      res.getAllSavedByUserId?.data?.map((item: any) => {
        if (item?.savedType === "classified") {
          savedClassifiedIds.push(item?.ClassifiedFeedId[0]?._id)
        }
        if (item?.savedType === "video") {
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
    try {
      if (currentStatus === Interaction.notSaved) {
        await mutateSaveLikedClassifiedFeed({
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const currentStatus = getSavedInteractionOnVideo(videoId)
    try {
      if (currentStatus === Interaction.notSaved) {
        await mutateSaveLikedVideo({
          videoId,
          userId: userStore._id,
        })
        addToSavedVideos(videoId)
        Toast.show(toastMessages.videoSavedSuccessfully)
      } else {
        await mutateUpdateDeletesavedVideo({
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
    await mutateSaveLikedVideo({
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
    syncSavedInteractionsHook()
  }

  const getClassified = async (classifiedId: string) => {
    const res = await mutateGetClassifiedById({
      classifiedId,
    })
    return res.getClassifiedById?.data[0]
  }


  const updateLastReadPost = async ({ lastReadPostId, followId }) => {
    await mutateUpdatelastreadPostId({
      lastReadPostId,
      userId: userStore._id,
      followId,
    })
  }

  const refreshVideos = async () => {
    try {
      const res = await getVideosCategorically()
      setVideos(res)
    } catch (err) {
      console.log(err)
    }
  }

  const getUserTopics = async (userId: string) => {
    const res = await queryGetTopicByUsersId({
      userId,
      pageNumber: 1,
      callerId: userStore._id,
    })

    return res.getTopicByUsersId?.data
  }

  const loadMoreUserTopics = async (userId, pageNumber) => {
    const res = await queryGetTopicByUsersId({
      userId,
      pageNumber,
      callerId: userStore._id,
    })

    return res.getTopicByUsersId
  }

  const getUserVideos = async (userId: string) => {
    const res = await queryGetUploadedVideoByUserIdPage(
      {
        userId,
        callerId: userStore._id,
        pageNumber: 1,
      },
      { fetchPolicy: "no-cache" },
    )
    return res.getUploadedVideoByUserIdPage.data
  }

  const getActivities = async () => {
    try {
      const res = await queryGetActivities({ userId: userStore?._id }, { fetchPolicy: "no-cache" })
      setStories(res.getActivities)
    } catch (err) {
      console.log("ERROR GET ACTIVITIES : ", err)
    }
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

  const followUser = async (id: string) => {
    const res = await mutateFollowUser({
      followId: id,
      userId: userStore._id,
    })
    getActivities()
    return res.followUser
  }

  const unfollowUser = async (id: string) => {
    const res = await mutateUnfollowUser({
      followId: id,
      userId: userStore._id,
    })
    getActivities()
    return res.unfollowUser
  }

  const interactWithVideo = async ({
    videoId,
    button,
    previousData,
  }: {
    videoId: string
    button: "like" | "dislike"
    previousData: { interaction: Interaction; dislikeviews: number; likeviews: number }
  }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const inputInteraction = getInputInteraction(button, previousData?.interaction)
    const newCount = likeDislikeCountUpdater(
      previousData.interaction,
      previousData.likeviews,
      previousData.dislikeviews,
      inputInteraction,
    )
    try {
      await mutateLikeDislikeVideo({
        videoId,
        userId: userStore._id,
        status: inputInteraction,
      })
      updateVideoInteractionLocally(videoId, inputInteraction, newCount)
    } catch (err) { }
    return { interaction: inputInteraction, ...newCount }
  }

  const interactWithHomePost = async ({
    postId,
    button,
    previousData,
  }: {
    postId: string
    button: "like" | "dislike"
    previousData: { interaction: Interaction; dislikeviews: number; likeviews: number }
  }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const inputInteraction = getInputInteraction(button, previousData?.interaction)
    const newCount = likeDislikeCountUpdater(
      previousData.interaction,
      previousData.likeviews,
      previousData.dislikeviews,
      inputInteraction,
    )
    try {
      await mutateLikeDislikehome({
        homePageId: postId,
        userId: userStore._id,
        status: inputInteraction,
      })
      updateHomePostInteractionLocally(postId, inputInteraction, newCount)
    } catch (err) { }
    return { interaction: inputInteraction, ...newCount }
  }

  const interactWithTopic = async ({
    topicId,
    button,
    previousData,
  }: {
    topicId: string
    button: "like" | "dislike"
    previousData: { interaction: Interaction; dislikeviews: number; likeviews: number }
  }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const inputInteraction = getInputInteraction(button, previousData?.interaction)
    const newCount = likeDislikeCountUpdater(
      previousData.interaction,
      previousData.likeviews,
      previousData.dislikeviews,
      inputInteraction,
    )
    try {
      await mutateLikeDislikeTopic({
        topicId,
        userId: userStore._id,
        status: inputInteraction,
      })
      updateTopicInteractionLocally(topicId, inputInteraction, newCount)
    } catch (err) { }
    return { interaction: inputInteraction, ...newCount }
  }

  const syncInteractedVideosAndTopics = async () => {
    // const likedTopics = []
    // const disLikedTopics = []
    // const likedVideos = []
    // const disLikedVideos = []
    // try {
    //   // Getting Liked Topics and Mapping to just get the Ids
    //   const resStatusOnTopics = await queryGetlikesTopicByUserId({
    //     userId: userStore._id,
    //   })
    //   resStatusOnTopics.getlikesTopicByUserId.forEach((item: any) => {
    //     if (item?.status === Interaction.like) likedTopics.push(item._id)
    //     if (item?.status === Interaction.dislike) disLikedTopics.push(item._id)
    //   })
    //   // Getting Liked Videos and Mapping to just get the Ids
    //   const resStatusOnVideos = await queryGetlikesVideoByUserId({
    //     userId: userStore._id,
    //   })
    //   resStatusOnVideos.getlikesVideoByUserId.forEach((item: any) => {
    //     if (item?.status === Interaction.like) likedVideos.push(item._id)
    //     if (item?.status === Interaction.dislike) disLikedVideos.push(item._id)
    //   })
    //   syncInteractions({
    //     videos: {
    //       liked: likedVideos,
    //       disliked: disLikedVideos,
    //     },
    //     topics: {
    //       liked: likedTopics,
    //       disliked: disLikedTopics,
    //     },
    //   })
    // } catch (err) {}
  }

  const uploadVideo = async ({
    videoHeading,
    thumbnailUrl,
    attachmentVideoUrl,
    vedioPlaylistId,
    description,
  }: {
    videoHeading: string
    thumbnailUrl: string
    attachmentVideoUrl: string
    vedioPlaylistId?: string
    description: string
  }) => {
    let body: any = {
      videoHeading,
      thumbnailUrl,
      attachmentVideoUrl,
      userId: userStore._id,
      description,
    }
    if (vedioPlaylistId) {
      body = { ...body, vedioPlaylistId }
    }
    await mutateUploadVideoByUser(body)
  }

  const createClassified = async ({
    attachmentUrl,
    type,
    title,
    prize,
    classifiedDetail,
    condition,
  }) => {
    const imageUrl = await uploadToS3({ uri: attachmentUrl, name: title, type })

    await mutateCreateClassifiedDetail({
      attachmentUrl: imageUrl,
      attachmentType: type,
      title,
      prize,
      classifiedDetail,
      userId: userStore._id,
      condition,
    })
  }

  const createEmptyPlaylist = async (playListName: string) => {
    try {
      await mutateUploadVideoPlaylist({
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
      await mutateStoreDeviceId({
        userId: userStore._id,
        deviceId,
      })
    } catch (err) { }
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
    } catch (err) { }
  }

  const rateUser = async (userId: string, rating: number) => {
    try {
      try {
        await mutateCreateUserRating({
          userId,
          ratingByUserId: userStore._id,
          ratingStar: rating,
        })
      } catch (err) {
      }
      const updatedRes = await queryGetratingOnUserId({ userId }, { fetchPolicy: "no-cache" })
      const avg =
        updatedRes?.getratingOnUserId?.data?.length > 0
          ? updatedRes?.getratingOnUserId?.data[0]?.averageRating
          : 0
      return { success: true, avg }
    } catch (err) {
      return false
    }
  }

  const getRatingOnUser = async (userId: string) => {
    try {
      const res = await queryCheckUserRating(
        { userId, ratingByUserId: userStore._id },
        { fetchPolicy: "no-cache" },
      )
      return res.checkUserRating?.ratingStar
    } catch (err) {
      return 0
    }
  }

  const onBoot = async () => {
    await storeDeviceInfo()
    await isUserBlocked()
  }

  const onLoggedInBoot = async () => {
    subscribeAll()
    syncAllChats().then(() => syncUnreadCount())
    fetchNotifications()
    await syncSavedInteractionsHook()
    syncUser()
    refreshTopics()
    refreshClassifieds()
    refreshVideos()
    getActivities()
    await updateNotificationToken()
  }

  const searchUsers = async (searchKey: string) => {
    const resUsers = await queryGetSearchedUser(
      { searchKey, pageNumber: 1 },
      { fetchPolicy: "no-cache" },
    )
    return resUsers.getSearchedUser?.data || []
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
    try {
      const res = await mutateGetchatByRoomId({ roomId, pageNumber: 1 })
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
      await mutateCreateUserMessage({
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
    } catch (err) {
      Alert.alert("Unable to Send Attachment!")
    }
  }

  const sendTextMessage = async (roomId: string, text: string, receiverId: string) => {
    try {
      await mutateCreateUserMessage({
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
    } catch (err) { }
  }

  const shareToFriend = async (roomId: string, shareOptions: any, receiverId: string) => {
    const text = () => {
      switch (shareOptions?.type) {
        case messageMetadataType.sharedClassified:
          return "Shared a Classified"
        case messageMetadataType.sharedPost:
          return "Shared a Post"
        case messageMetadataType.sharedVideo:
          return "Shared a Video"
        case messageMetadataType.sharedDiscussion:
          return "Shared a Discussion"
        default:
          return ""
      }
    }
    try {
      await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: text(),
        membersId: [{ userId1: userStore._id }, { userId1: receiverId }],
        messageType: "custom",
        metaData: {
          metaDataType: shareOptions?.type,
          amount: "",
          currency: "",
          data: JSON.stringify(shareOptions),
        },
      })
    } catch (err) { }
  }

  const sendCallOffer = async (
    roomId: string,
    receiverId: string,
    offer: string,
    mode: "video" | "audio",
  ) => {
    try {
      await mutateCreateUserMessage({
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
    } catch (err) { }
  }

  const acceptCallOffer = async (roomId: string, receiverId: string, answer: string) => {
    try {
      await mutateCreateUserMessage({
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
    } catch (err) { }
  }

  const hangUpCall = async (roomId: string, receiverId: string) => {
    try {
      await mutateCreateUserMessage({
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
    } catch (err) { }
  }

  const getUserById = async (userId: string) => {
    try {
      const res = await mutateGetUserById({ userId })
      return res.getUserById
    } catch (err) {
      return undefined
    }
  }

  const getOrCreateRoom = async (receiverId: string) => {
    try {
      const resCreate = await mutateCreateChatRoom({
        membersId: [{ userId1: receiverId }, { userId1: userStore?._id }],
        adminId: receiverId,
      })
      return resCreate.createChatRoom?._id
    } catch (err) {
      try {
        const res = await mutateGetroomBymembers({
          members: [{ userId1: receiverId }, { userId1: userStore?._id }],
        })

        return res.getroomBymembers?.data[0]?._id
      } catch (err) { }
    }
  }

  const sendClassfiedOffer = async (
    roomId: string,
    receiverId: string,
    amount: string,
    classifiedData: any,
  ) => {
    const currency = "$"
    try {
      await mutateCreateUserMessage({
        roomId,
        authorId: userStore._id,
        text: `Offered ${currency + amount} on ${classifiedData?.title}`,
        membersId: [{ userId1: receiverId }, { userId1: userStore._id }],
        messageType: "custom",
        metaData: {
          metaDataType: messageMetadataType.classifiedOffer,
          amount,
          currency,
          data: JSON.stringify(classifiedData),
        },
      })
    } catch (err) { }
  }

  const deleteChatRoom = async (roomId: string) => {
    try {
      await mutateDeleteChatRoom({
        roomId,
      })
      syncAllChats()
    } catch (err) { }
  }

  const updateNotificationToken = async () => {
    try {
      const token = await messaging().getToken()
      await mutateAddNotificationToken({
        userId: userStore._id,
        notificationToken: token,
      })
    } catch (err) {
      console.log("ERR:mutateAddNotificationToken", err)
    }
  }

  const uploadToS3 = async ({ uri, name, type }) => {
    let file = {
      // `uri` can also be a file system path (i.e. file://)
      uri,
      name,
      type,
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "washzone-23",
      region: "us-west-2",
      accessKey: "AKIAY5ERXJV45W2GS2H2",
      secretKey: "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",
      successActionStatus: 201,
    }
    file = { ...file, name: file.name + Date.now().toString() }
    try {
      const response = await RNS3.put(file, options).progress((e) => console.log("PRGORESS", e))
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
      await mutateSetNotificationStatus({
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
    await mutateAddOfferanswerInRoom({ ...data, roomId })
    const { _id, name } = userStore

    // we have to send a setter alert and then a actualy display alert
    // as we send the alert twice we need a way to identify each, we will do that via a type key in receiver
    // (Why Receiver? cuz rn, i am using Stringified JSON in receiver field and that being so, i can add remove feilds as per i see fit)
    await mutateSendCallNotification({
      data: {
        roomId,
        type,
        receiver: JSON.stringify({ _id, name, setter }),
      },
      notificationToken: token,
    })
  }

  const getRoomById = async (roomId: string) => {
    try {
      const res = await mutateGetroomByroomId({ roomId })
      return res.getroomByroomId?.data[0]
    } catch (err) {
      Alert.alert("Unable to Establish Connection!", "Please try again.")
    }
  }

  const fetchNotifications = async () => {
    try {
      const res = await queryGetNotification(
        { reciverId: userStore._id },
        { fetchPolicy: "no-cache" },
      )
      setNotifications(res.getNotification)
    } catch (err) {
      Alert.alert(
        "Something doesnt look right.",
        "Please hold or try again later. Sorry for the trouble.",
      )
    }
  }

  const getVideosCategorically = async () => {
    const res = await queryGetAllPlaylistVideo()
    return res.getAllPlaylistVideo
  }

  const blockUser = async (id: string) => {
    await mutateBlockUserId({
      blockUserById: id,
      userId: userStore?._id,
    })
    syncAllChats()

    userStore.addToBlocked(id)
  }

  const unblockUser = async (id: string) => {
    await mutateUnblockUserId({
      blockUserById: id,
      userId: userStore?._id,
    })
    syncAllChats()
    userStore.removeFromBlocked(id)
  }

  // const getPostCommentById = async (id: string) => {
  //   await mutateUnblockUserId({
  //     blockUserById: id,
  //     userId: userStore?._id,
  //   })
  //   syncAllChats()
  //   userStore.removeFromBlocked(id)
  // }

  return {
    blockUser,
    unblockUser,
    fetchNotifications,
    getVideosCategorically,
    getRoomById,
    sendSilentAlert,
    getMoreChatMessages,
    loadMoreHomeFeed,
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
    postComment,
    getCommentsOnPost,
    loadMoreTopics,
    refreshTopics,
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
    postCommentOnHomePagePost,
    getCommentsOnHomePagePost,
    interactWithHomePost,
    getUsersHomePosts,
    searchUsers,
    shareToFriend,
    getActivities,
    getProfileDetails,
    followUser,
    unfollowUser,
    getFollowings,
    getFollowers,
    getLikesOnVideo,
    getLikesOnPost,
    getLikesOnDiscussion,
    updateLastReadPost,
  }
}

export const enum CallTypes {
  videoOffer = "video-offer",
  audioOffer = "audio-offer",
  answer = "call-answer",
  hangup = "hangup",
}
