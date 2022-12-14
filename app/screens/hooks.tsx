import { useStores } from "../models"

export function useHooks() {
  const {
    feedStore: { setPosts, feedPosts, addToPosts },
    classfieds: { setClassifieds, addToClassfieds, classifieds },
    topics: { setTopics, topics, addToTopics },
    saved: { savedClassifieds, setSavedClassifieds, addToSavedClassifieds },
    api: {
      queryGetAllposts,
      mutateCommentOnPost,
      queryGetCommentsByPostId,
      queryGetAllpostByPageNumber,
      queryGetAllClassifiedFeed,
      queryGetAllTopicsByPageNo,
      mutateUpdateUser,
      mutateCreateTopic,
      mutateSaveLikedClassifiedFeed,
      queryGetAllSavedClassifiedByUserId,
      queryGetClassifiedById
    },
    userStore,
  } = useStores()

  const getAndUpdatePosts = async (cache?: boolean) => {
    const res = await queryGetAllposts(undefined, {
      fetchPolicy:
        cache === undefined ? "cache-and-network" : cache ? "cache-first" : "network-only",
    })
    setPosts(res.getAllposts)
  }

  const loadMorePosts = async () => {
    console.log("lOADING MORE")
    console.log("FEEDPOSTSLENGTH", feedPosts.length)
    const res = await queryGetAllpostByPageNumber(
      { pageNumber: parseInt((feedPosts.length / 10).toFixed(0)) },
      { fetchPolicy: "network-only" },
    )
    console.log(res)
    const morePosts = res.getAllpostByPageNumber?.data
    console.log("MOREPOSTS", morePosts.length)
    addToPosts(morePosts)
  }

  const refreshPosts = async () => {
    console.log("REFRESHING")
    const res = await queryGetAllpostByPageNumber(
      { pageNumber: 1 },
      { fetchPolicy: "network-only" },
    )
    console.log("refreshd", res.getAllpostByPageNumber?.data)
    setPosts(res.getAllpostByPageNumber?.data)
  }

  const loadMoreClassified = async () => {
    console.log("lOADING MORE")
    console.log("FEEDPOSTSLENGTH", classifieds.length)
    const res = await queryGetAllClassifiedFeed(
      { pageNumber: parseInt((classifieds.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )
    console.log(res)
    const moreClassified = res.getAllClassifiedFeed?.data
    console.log("moreClassified", moreClassified.length)
    addToClassfieds(moreClassified)
  }

  const refreshClassifieds = async () => {
    console.log("REFRESHING", classifieds.length)
    const res = await queryGetAllClassifiedFeed({ pageNumber: 0 }, { fetchPolicy: "no-cache" })
    console.log("refreshd", res.getAllClassifiedFeed?.data.length)
    setClassifieds(res.getAllClassifiedFeed?.data)
  }

  const loadMoreTopics = async () => {
    const res = await queryGetAllTopicsByPageNo(
      { pageNumber: parseInt((topics.length / 10).toFixed(0)) },
      { fetchPolicy: "no-cache" },
    )
    console.log(res.getAllTopicsByPageNo?.data)
    const moreTopics = res.getAllTopicsByPageNo?.data
    addToTopics(moreTopics)
  }

  const refreshTopics = async () => {
    const res = await queryGetAllTopicsByPageNo({ pageNumber: 0 }, { fetchPolicy: "no-cache" })
    console.log("refreshd", res.getAllTopicsByPageNo?.data)
    setTopics(res.getAllTopicsByPageNo?.data)
  }

  const postComment = async (comment: string, postId: string) => {
    console.log(userStore._id)
    console.log(postId)
    const res = await mutateCommentOnPost({ userId: userStore._id, comment, postId })
    console.log(res)
  }

  const getCommentsOnPost = async (postId: string) => {
    console.log(userStore._id)
    console.log(postId)
    const res = await queryGetCommentsByPostId({ postId }, { fetchPolicy: "network-only" })

    return res.getCommentsByPostId[0]?.comments
  }

  const createTopic = async ({ heading, content, attachment }) => {
    const res = await mutateCreateTopic({
      attachmentUrl: attachment?.uri || "",
      attachmentType: attachment?.type || "",
      topicHeading: heading,
      topicContent: content,
      userId: userStore._id,
    })
    console.log("CREATE TOPIC", res)
  }

  const updateProfile = async (firstName:string, lastName:string, picture:string) => {
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
    console.log("classifiedFeedId",classifiedFeedId)
    console.log("userSavedId",userStore._id)
    const res = await mutateSaveLikedClassifiedFeed({
      classifiedFeedId,
      usersavedId: userStore._id,
    })
    console.log("saveClassified", res)
  }

  const refreshSavedClassifieds = async () => {
    const res = await queryGetAllSavedClassifiedByUserId({
      userId: userStore._id,
      pageNumber: 0,
    },{fetchPolicy:'no-cache'})
    setSavedClassifieds( res.getAllSavedClassifiedByUserId?.data)
    console.log("saveClassified", res.getAllSavedClassifiedByUserId)
  }

  const loadMoreSavedClassifieds = async () => {
    console.log("SAVEDCLASSLENGTH", savedClassifieds.length)
    const res = await queryGetAllSavedClassifiedByUserId(
      { pageNumber: parseInt((savedClassifieds.length / 10).toFixed(0)), userId: userStore._id },
      { fetchPolicy: "no-cache" },
    )
    addToSavedClassifieds(res.getAllSavedClassifiedByUserId?.data)
    console.log("savedClassified", res.getAllSavedClassifiedByUserId.data.length)
  }
  
  const getClassified =async (classifiedId:string) => {
    const res = await queryGetClassifiedById({
      classifiedId
    }, {fetchPolicy:'no-cache'})
    return res.getClassifiedById?.data[0]
  }

  return {
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
    loadMoreSavedClassifieds,
    getClassified
  }
}
