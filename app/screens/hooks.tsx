import { useStores } from "../models"

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
      mutateGetUploadVideoByUserId,
    },
    userStore,
  } = useStores()

  const loadStories = async () => {
    const res = await queryGetAllStory()
    setStories(res.getAllStory || [])
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

    return res.getCommentsByTopicId[0]?.comments
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
        picture,
      },
      userId: userStore._id,
    })
    userStore.setUser({
      ...userStore,
      first_name: firstName,
      last_name: lastName,
      picture,
    })
    console.log(res)
  }

  const saveClassified = async (classifiedFeedId: string) => {
    console.log("classifiedFeedId", classifiedFeedId)
    console.log("userSavedId", userStore._id)
    try {
      const res = await mutateSaveLikedClassifiedFeed({
        classifiedFeedId,
        userId: userStore._id,
      })
      console.log("saveClassified", res)
    } catch (err) {
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
    const res = await queryGetAllSavedByUserId(
      {
        userId: userStore._id,
        pageNumber: 1,
      },
      { fetchPolicy: "no-cache" },
    )
    setSavedClassifieds(res.getAllSavedByUserId?.data)
    console.log("saveClassified", JSON.stringify(res.getAllSavedByUserId?.data))
  }

  const getClassified = async (classifiedId: string) => {
    const res = await mutateGetClassifiedById({
      classifiedId,
    })
    return res.getClassifiedById?.data[0]
  }

  const unSaveClassified = async (classifiedsavedId: string) => {
    console.log("classifiedsavedId", classifiedsavedId)
    const res = await mutateUpdateDeletesavedclassified({
      classifiedsavedId,
    })
    console.log(res)
    return res.UpdateDeletesavedclassified
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

  return {
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
    saveClassified,
    refreshSavedClassifieds,
    getClassified,
    unSaveClassified,
    getVideos,
    saveVideo,
    getUserTopics,
    loadMoreUserTopics,
    getUserClassifieds,
    getUserVideos,
  }
}
