/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { CommentsDetailModel, CommentsDetailModelType } from "./CommentsDetailModel"
import { commentsDetailModelPrimitives, CommentsDetailModelSelector } from "./CommentsDetailModel.base"
import { PostDetailModel, PostDetailModelType } from "./PostDetailModel"
import { postDetailModelPrimitives, PostDetailModelSelector } from "./PostDetailModel.base"
import { StoryViewerUserModel, StoryViewerUserModelType } from "./StoryViewerUserModel"
import { storyViewerUserModelPrimitives, StoryViewerUserModelSelector } from "./StoryViewerUserModel.base"
import { TopicCommentModel, TopicCommentModelType } from "./TopicCommentModel"
import { topicCommentModelPrimitives, TopicCommentModelSelector } from "./TopicCommentModel.base"
import { SearchTopicsModel, SearchTopicsModelType } from "./SearchTopicsModel"
import { searchTopicsModelPrimitives, SearchTopicsModelSelector } from "./SearchTopicsModel.base"
import { FollowUserModel, FollowUserModelType } from "./FollowUserModel"
import { followUserModelPrimitives, FollowUserModelSelector } from "./FollowUserModel.base"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { classifiedFeedModelPrimitives, ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { VedioUploadModel, VedioUploadModelType } from "./VedioUploadModel"
import { vedioUploadModelPrimitives, VedioUploadModelSelector } from "./VedioUploadModel.base"
import { UserReviewModel, UserReviewModelType } from "./UserReviewModel"
import { userReviewModelPrimitives, UserReviewModelSelector } from "./UserReviewModel.base"
import { ChannelListModel, ChannelListModelType } from "./ChannelListModel"
import { channelListModelPrimitives, ChannelListModelSelector } from "./ChannelListModel.base"
import { SaveClassifiedModel, SaveClassifiedModelType } from "./SaveClassifiedModel"
import { saveClassifiedModelPrimitives, SaveClassifiedModelSelector } from "./SaveClassifiedModel.base"
import { LikeVediosModel, LikeVediosModelType } from "./LikeVediosModel"
import { likeVediosModelPrimitives, LikeVediosModelSelector } from "./LikeVediosModel.base"



export type InputUser = {
  name?: (string | null)
  first_name?: (string | null)
  last_name?: (string | null)
  password?: (string | null)
  picture?: (string | null)
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryHello="queryHello",
queryGetUserByEmail="queryGetUserByEmail",
queryGetAllUsers="queryGetAllUsers",
queryGetUserById="queryGetUserById",
queryGetUserBysocialId="queryGetUserBysocialId",
queryGetAllpostByPageNumber="queryGetAllpostByPageNumber",
queryGetAllposts="queryGetAllposts",
queryGetPostByUserId="queryGetPostByUserId",
queryGetCommentByPostId="queryGetCommentByPostId",
queryGetCommentsByPostId="queryGetCommentsByPostId",
queryGetPostByPostId="queryGetPostByPostId",
queryGetAllComments="queryGetAllComments",
queryGetAllComment="queryGetAllComment",
queryGetCommentsByUserId="queryGetCommentsByUserId",
queryGetStoryByUserId="queryGetStoryByUserId",
queryGetAllStory="queryGetAllStory",
queryGetAllTopics="queryGetAllTopics",
queryGetAllTopicsByPageNo="queryGetAllTopicsByPageNo",
queryGetTopicByUserIdByPageNo="queryGetTopicByUserIdByPageNo",
queryGetTopicByTopicIdByPageNo="queryGetTopicByTopicIdByPageNo",
queryGetCommentsByTopicIdByPageNo="queryGetCommentsByTopicIdByPageNo",
queryGetTopicByUserId="queryGetTopicByUserId",
queryGetAllCommentsOnTopic="queryGetAllCommentsOnTopic",
queryGetTopicCommentsByUserId="queryGetTopicCommentsByUserId",
queryGetfollowingByUserId="queryGetfollowingByUserId",
queryGetfollowerByFollowId="queryGetfollowerByFollowId",
queryGetAllClassifiedFeedss="queryGetAllClassifiedFeedss",
queryGetAllClassifiedFeed="queryGetAllClassifiedFeed",
queryGetClassifiedByUserId="queryGetClassifiedByUserId",
queryGetClassifiedById="queryGetClassifiedById",
queryGetClassifiedByUserIdPage="queryGetClassifiedByUserIdPage",
queryGetAllVedio="queryGetAllVedio",
queryGetAllUploadedVedio="queryGetAllUploadedVedio",
queryGetUploadVedioByUserId="queryGetUploadVedioByUserId",
queryGetUploadedVedioByUserIdPage="queryGetUploadedVedioByUserIdPage",
queryGetAllReviews="queryGetAllReviews",
queryGetReviewOnUserId="queryGetReviewOnUserId",
queryGetReviewByReviewId="queryGetReviewByReviewId",
queryGetAllChannels="queryGetAllChannels",
queryGetChannelByUserId="queryGetChannelByUserId",
queryGetChannelByUserIdPage="queryGetChannelByUserIdPage",
queryGetByClassifiedFeedId="queryGetByClassifiedFeedId",
queryGetAllSaved="queryGetAllSaved",
queryGetAllSavedClassified="queryGetAllSavedClassified",
queryGetAllSavedClassifiedByUserId="queryGetAllSavedClassifiedByUserId",
queryGetlikesVedioByUserId="queryGetlikesVedioByUserId",
queryGetuserLikesonVideo="queryGetuserLikesonVideo"
}
export enum RootStoreBaseMutations {
mutateCreateUser="mutateCreateUser",
mutateUpdatePassword="mutateUpdatePassword",
mutateResetPassword="mutateResetPassword",
mutateSignin="mutateSignin",
mutateUpdateUser="mutateUpdateUser",
mutateSendEmailByUserId="mutateSendEmailByUserId",
mutateUpdateDeleteStatus="mutateUpdateDeleteStatus",
mutateCreateUserPost="mutateCreateUserPost",
mutateUploadFile="mutateUploadFile",
mutateGetPostByUser="mutateGetPostByUser",
mutateUpdateDeletepostId="mutateUpdateDeletepostId",
mutateCommentOnPost="mutateCommentOnPost",
mutateDeleteCommentbyCommentId="mutateDeleteCommentbyCommentId",
mutateCreateStory="mutateCreateStory",
mutateCreateTopic="mutateCreateTopic",
mutateUpdateDeleteTopicId="mutateUpdateDeleteTopicId",
mutateCommentOnTopic="mutateCommentOnTopic",
mutateFollowById="mutateFollowById",
mutateCreateClassifiedDetail="mutateCreateClassifiedDetail",
mutateUpdateDeleteClassifiedId="mutateUpdateDeleteClassifiedId",
mutateUploadVedioByUser="mutateUploadVedioByUser",
mutateUpdateDeleteVedioId="mutateUpdateDeleteVedioId",
mutateCreateUserReview="mutateCreateUserReview",
mutateUpdateDeleteReviewId="mutateUpdateDeleteReviewId",
mutateCreateChannel="mutateCreateChannel",
mutateAddVediotoChannel="mutateAddVediotoChannel",
mutateUpdateDeleteChannelId="mutateUpdateDeleteChannelId",
mutateSaveLikedClassifiedFeed="mutateSaveLikedClassifiedFeed",
mutateUpdateDeletesavedId="mutateUpdateDeletesavedId",
mutateLikeDislikeVedio="mutateLikeDislikeVedio"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['CommentsDetail', () => CommentsDetailModel], ['PostDetail', () => PostDetailModel], ['storyViewerUser', () => StoryViewerUserModel], ['TopicComment', () => TopicCommentModel], ['searchTopics', () => SearchTopicsModel], ['followUser', () => FollowUserModel], ['classifiedFeed', () => ClassifiedFeedModel], ['VedioUpload', () => VedioUploadModel], ['UserReview', () => UserReviewModel], ['ChannelList', () => ChannelListModel], ['saveClassified', () => SaveClassifiedModel], ['likeVedios', () => LikeVediosModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    queryHello(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ hello: string }>(`query hello { hello }`, variables, options)
    },
    queryGetUserByEmail(variables: { email: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getUserByEmail: UserModelType}>(`query getUserByEmail($email: String!) { getUserByEmail(email: $email) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetAllUsers(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllUsers: any }>(`query getAllUsers { getAllUsers }`, variables, options)
    },
    queryGetUserById(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUserById: any }>(`query getUserById($userId: String!) { getUserById(userId: $userId) }`, variables, options)
    },
    queryGetUserBysocialId(variables: { socialId: string }, options: QueryOptions = {}) {
      return self.query<{ getUserBysocialId: any }>(`query getUserBysocialId($socialId: String!) { getUserBysocialId(socialId: $socialId) }`, variables, options)
    },
    queryGetAllpostByPageNumber(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllpostByPageNumber: any }>(`query getAllpostByPageNumber($pageNumber: Float!) { getAllpostByPageNumber(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllposts(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllposts: any }>(`query getAllposts { getAllposts }`, variables, options)
    },
    queryGetPostByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getPostByUserId: any }>(`query getPostByUserId($pageNumber: Float!, $userId: String!) { getPostByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetCommentByPostId(variables: { pageNumber: number, postId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentByPostId: any }>(`query getCommentByPostId($pageNumber: Float!, $postId: String!) { getCommentByPostId(pageNumber: $pageNumber, postId: $postId) }`, variables, options)
    },
    queryGetCommentsByPostId(variables: { postId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByPostId: any }>(`query getCommentsByPostId($postId: String!) { getCommentsByPostId(postId: $postId) }`, variables, options)
    },
    queryGetPostByPostId(variables: { pageNumber: number, postId: string }, options: QueryOptions = {}) {
      return self.query<{ getPostByPostId: any }>(`query getPostByPostId($pageNumber: Float!, $postId: String!) { getPostByPostId(pageNumber: $pageNumber, postId: $postId) }`, variables, options)
    },
    queryGetAllComments(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllComments: any }>(`query getAllComments($pageNumber: Float!) { getAllComments(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllComment(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllComment: any }>(`query getAllComment { getAllComment }`, variables, options)
    },
    queryGetCommentsByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByUserId: any }>(`query getCommentsByUserId($pageNumber: Float!, $userId: String!) { getCommentsByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetStoryByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getStoryByUserId: any }>(`query getStoryByUserId($userId: String!) { getStoryByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllStory(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllStory: any }>(`query getAllStory { getAllStory }`, variables, options)
    },
    queryGetAllTopics(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllTopics: any }>(`query getAllTopics { getAllTopics }`, variables, options)
    },
    queryGetAllTopicsByPageNo(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllTopicsByPageNo: any }>(`query getAllTopicsByPageNo($pageNumber: Float!) { getAllTopicsByPageNo(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetTopicByUserIdByPageNo(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUserIdByPageNo: any }>(`query getTopicByUserIdByPageNo($pageNumber: Float!, $userId: String!) { getTopicByUserIdByPageNo(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetTopicByTopicIdByPageNo(variables: { pageNumber: number, topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByTopicIdByPageNo: any }>(`query getTopicByTopicIdByPageNo($pageNumber: Float!, $topicId: String!) { getTopicByTopicIdByPageNo(pageNumber: $pageNumber, topicId: $topicId) }`, variables, options)
    },
    queryGetCommentsByTopicIdByPageNo(variables: { pageNumber: number, topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByTopicIdByPageNo: any }>(`query getCommentsByTopicIdByPageNo($pageNumber: Float!, $topicId: String!) { getCommentsByTopicIdByPageNo(pageNumber: $pageNumber, topicId: $topicId) }`, variables, options)
    },
    queryGetTopicByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUserId: any }>(`query getTopicByUserId($userId: String!) { getTopicByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllCommentsOnTopic(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllCommentsOnTopic: any }>(`query getAllCommentsOnTopic($pageNumber: Float!) { getAllCommentsOnTopic(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetTopicCommentsByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicCommentsByUserId: any }>(`query getTopicCommentsByUserId($userId: String!) { getTopicCommentsByUserId(userId: $userId) }`, variables, options)
    },
    queryGetfollowingByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getfollowingByUserId: any }>(`query getfollowingByUserId($userId: String!) { getfollowingByUserId(userId: $userId) }`, variables, options)
    },
    queryGetfollowerByFollowId(variables: { followId: string }, options: QueryOptions = {}) {
      return self.query<{ getfollowerByFollowId: any }>(`query getfollowerByFollowId($followId: String!) { getfollowerByFollowId(followId: $followId) }`, variables, options)
    },
    queryGetAllClassifiedFeedss(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllClassifiedFeedss: any }>(`query getAllClassifiedFeedss { getAllClassifiedFeedss }`, variables, options)
    },
    queryGetAllClassifiedFeed(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllClassifiedFeed: any }>(`query getAllClassifiedFeed($pageNumber: Float!) { getAllClassifiedFeed(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetClassifiedByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getClassifiedByUserId: any }>(`query getClassifiedByUserId($userId: String!) { getClassifiedByUserId(userId: $userId) }`, variables, options)
    },
    queryGetClassifiedById(variables: { classifiedId: string }, options: QueryOptions = {}) {
      return self.query<{ getClassifiedById: any }>(`query getClassifiedById($classifiedId: String!) { getClassifiedById(classifiedId: $classifiedId) }`, variables, options)
    },
    queryGetClassifiedByUserIdPage(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getClassifiedByUserIdPage: any }>(`query getClassifiedByUserIdPage($pageNumber: Float!, $userId: String!) { getClassifiedByUserIdPage(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetAllVedio(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllVedio: any }>(`query getAllVedio { getAllVedio }`, variables, options)
    },
    queryGetAllUploadedVedio(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllUploadedVedio: any }>(`query getAllUploadedVedio($pageNumber: Float!) { getAllUploadedVedio(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetUploadVedioByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUploadVedioByUserId: any }>(`query getUploadVedioByUserId($userId: String!) { getUploadVedioByUserId(userId: $userId) }`, variables, options)
    },
    queryGetUploadedVedioByUserIdPage(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUploadedVedioByUserIdPage: any }>(`query getUploadedVedioByUserIdPage($pageNumber: Float!, $userId: String!) { getUploadedVedioByUserIdPage(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetAllReviews(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllReviews: any }>(`query getAllReviews($pageNumber: Float!) { getAllReviews(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetReviewOnUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getReviewOnUserId: any }>(`query getReviewOnUserId($pageNumber: Float!, $userId: String!) { getReviewOnUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetReviewByReviewId(variables: { pageNumber: number, reviewerId: string }, options: QueryOptions = {}) {
      return self.query<{ getReviewByReviewId: any }>(`query getReviewByReviewId($pageNumber: Float!, $reviewerId: String!) { getReviewByReviewId(pageNumber: $pageNumber, reviewerId: $reviewerId) }`, variables, options)
    },
    queryGetAllChannels(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllChannels: any }>(`query getAllChannels($pageNumber: Float!) { getAllChannels(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetChannelByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getChannelByUserId: any }>(`query getChannelByUserId($userId: String!) { getChannelByUserId(userId: $userId) }`, variables, options)
    },
    queryGetChannelByUserIdPage(variables: { pageNumber: number, channelId: string, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getChannelByUserIdPage: any }>(`query getChannelByUserIdPage($pageNumber: Float!, $channelId: String!, $userId: String!) { getChannelByUserIdPage(pageNumber: $pageNumber, channelId: $channelId, userId: $userId) }`, variables, options)
    },
    queryGetByClassifiedFeedId(variables: { classifiedFeedId: string }, options: QueryOptions = {}) {
      return self.query<{ getByClassifiedFeedId: any }>(`query getByClassifiedFeedId($classifiedFeedId: String!) { getByClassifiedFeedId(ClassifiedFeedId: $classifiedFeedId) }`, variables, options)
    },
    queryGetAllSaved(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllSaved: any }>(`query getAllSaved { getAllSaved }`, variables, options)
    },
    queryGetAllSavedClassified(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedClassified: any }>(`query getAllSavedClassified($pageNumber: Float!) { getAllSavedClassified(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllSavedClassifiedByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedClassifiedByUserId: any }>(`query getAllSavedClassifiedByUserId($pageNumber: Float!, $userId: String!) { getAllSavedClassifiedByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetlikesVedioByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getlikesVedioByUserId: any }>(`query getlikesVedioByUserId($userId: String!) { getlikesVedioByUserId(userId: $userId) }`, variables, options)
    },
    queryGetuserLikesonVideo(variables: { videoId: string }, options: QueryOptions = {}) {
      return self.query<{ getuserLikesonVideo: any }>(`query getuserLikesonVideo($videoId: String!) { getuserLikesonVideo(videoId: $videoId) }`, variables, options)
    },
    mutateCreateUser(variables: { type: string, isSocialLogin: boolean, picture?: (string | null), lastName: string, firstName: string, socialId?: (string | null), password: string, email: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUser: UserModelType}>(`mutation createUser($type: String!, $isSocialLogin: Boolean!, $picture: String, $lastName: String!, $firstName: String!, $socialId: String, $password: String!, $email: String!, $name: String!) { createUser(type: $type, isSocialLogin: $isSocialLogin, picture: $picture, last_name: $lastName, first_name: $firstName, socialId: $socialId, password: $password, email: $email, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdatePassword(variables: { userId: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ updatePassword: any }>(`mutation updatePassword($userId: String!, $password: String!) { updatePassword(userId: $userId, password: $password) }`, variables, optimisticUpdate)
    },
    mutateResetPassword(variables: { newPassword: string, oldPassword: string, userId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ resetPassword: UserModelType}>(`mutation resetPassword($newPassword: String!, $oldPassword: String!, $userId: String!) { resetPassword(newPassword: $newPassword, oldPassword: $oldPassword, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSignin(variables: { password: string, email: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ signin: UserModelType}>(`mutation signin($password: String!, $email: String!) { signin(password: $password, email: $email) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateUser(variables: { user: InputUser, userId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUser: UserModelType}>(`mutation updateUser($user: InputUser!, $userId: String!) { updateUser(user: $user, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSendEmailByUserId(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sendEmailByUserId: any }>(`mutation sendEmailByUserId($userId: String!) { sendEmailByUserId(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteStatus(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteStatus: any }>(`mutation UpdateDeleteStatus($userId: String!) { UpdateDeleteStatus(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserPost(variables: { attachmentUrl?: (string | null), attachmentType?: (string | null), postContent?: (string | null), commentId?: (string | null), userId: string }, resultSelector: string | ((qb: PostDetailModelSelector) => PostDetailModelSelector) = postDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserPost: PostDetailModelType}>(`mutation createUserPost($attachmentUrl: String, $attachmentType: String, $postContent: String, $commentId: String, $userId: String!) { createUserPost(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, postContent: $postContent, commentId: $commentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new PostDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUploadFile(variables: { uri: string, type: string, fileName: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ uploadFile: any }>(`mutation uploadFile($uri: String!, $type: String!, $fileName: String!) { uploadFile(uri: $uri, type: $type, fileName: $fileName) }`, variables, optimisticUpdate)
    },
    mutateGetPostByUser(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getPostByUser: any }>(`mutation getPostByUser($userId: String!) { getPostByUser(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletepostId(variables: { postId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletepostId: any }>(`mutation UpdateDeletepostId($postId: String!) { UpdateDeletepostId(postId: $postId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnPost(variables: { acttachmentType?: (string | null), acttachmentUrl?: (string | null), comment?: (string | null), postId: string, userId: string }, resultSelector: string | ((qb: CommentsDetailModelSelector) => CommentsDetailModelSelector) = commentsDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnPost: CommentsDetailModelType}>(`mutation commentOnPost($acttachmentType: String, $acttachmentUrl: String, $comment: String, $postId: String!, $userId: String!) { commentOnPost(acttachmentType: $acttachmentType, acttachmentUrl: $acttachmentUrl, comment: $comment, postId: $postId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentsDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteCommentbyCommentId(variables: { commentId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteCommentbyCommentId: boolean }>(`mutation deleteCommentbyCommentId($commentId: String!) { deleteCommentbyCommentId(commentId: $commentId) }`, variables, optimisticUpdate)
    },
    mutateCreateStory(variables: { attachmentUrl: string, attachmentType: string, thumbnailUrl: string, userId: string }, resultSelector: string | ((qb: StoryViewerUserModelSelector) => StoryViewerUserModelSelector) = storyViewerUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createStory: StoryViewerUserModelType}>(`mutation createStory($attachmentUrl: String!, $attachmentType: String!, $thumbnailUrl: String!, $userId: String!) { createStory(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, thumbnailUrl: $thumbnailUrl, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new StoryViewerUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateTopic(variables: { attachmentUrl?: (string | null), attachmentType?: (string | null), topicHeading?: (string | null), topicContent?: (string | null), topicCommentId?: (string | null), userId: string }, resultSelector: string | ((qb: SearchTopicsModelSelector) => SearchTopicsModelSelector) = searchTopicsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createTopic: SearchTopicsModelType}>(`mutation createTopic($attachmentUrl: String, $attachmentType: String, $topicHeading: String, $topicContent: String, $topicCommentId: String, $userId: String!) { createTopic(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, topicHeading: $topicHeading, topicContent: $topicContent, topicCommentId: $topicCommentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SearchTopicsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteTopicId(variables: { topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteTopicId: any }>(`mutation UpdateDeleteTopicId($topicId: String!) { UpdateDeleteTopicId(topicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnTopic(variables: { acttachmentType?: (string | null), acttachmentUrl?: (string | null), comment?: (string | null), topicId: string, userId: string }, resultSelector: string | ((qb: TopicCommentModelSelector) => TopicCommentModelSelector) = topicCommentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnTopic: TopicCommentModelType}>(`mutation commentOnTopic($acttachmentType: String, $acttachmentUrl: String, $comment: String, $topicId: String!, $userId: String!) { commentOnTopic(acttachmentType: $acttachmentType, acttachmentUrl: $acttachmentUrl, comment: $comment, topicId: $topicId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new TopicCommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateFollowById(variables: { followId: string, userId: string }, resultSelector: string | ((qb: FollowUserModelSelector) => FollowUserModelSelector) = followUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ followById: FollowUserModelType}>(`mutation followById($followId: String!, $userId: String!) { followById(followId: $followId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new FollowUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateClassifiedDetail(variables: { title?: (string | null), prize?: (string | null), attachmentUrl?: (string | null), attachmentType?: (string | null), classifiedDetail?: (string | null), reviewDetailId?: (string | null), userId: string }, resultSelector: string | ((qb: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) = classifiedFeedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createClassifiedDetail: ClassifiedFeedModelType}>(`mutation createClassifiedDetail($title: String, $prize: String, $attachmentUrl: String, $attachmentType: String, $classifiedDetail: String, $reviewDetailId: String, $userId: String!) { createClassifiedDetail(title: $title, prize: $prize, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, classifiedDetail: $classifiedDetail, reviewDetailId: $reviewDetailId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassifiedFeedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteClassifiedId(variables: { classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteClassifiedId: any }>(`mutation UpdateDeleteClassifiedId($classifiedId: String!) { UpdateDeleteClassifiedId(classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateUploadVedioByUser(variables: { status: string, like?: (boolean | null), view?: (string | null), attachmentVedioUrl: string, description?: (string | null), videoHeading?: (string | null), userId: string }, resultSelector: string | ((qb: VedioUploadModelSelector) => VedioUploadModelSelector) = vedioUploadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ uploadVedioByUser: VedioUploadModelType}>(`mutation uploadVedioByUser($status: String!, $like: Boolean, $view: String, $attachmentVedioUrl: String!, $description: String, $videoHeading: String, $userId: String!) { uploadVedioByUser(status: $status, like: $like, view: $view, attachmentVedioUrl: $attachmentVedioUrl, description: $description, videoHeading: $videoHeading, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new VedioUploadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteVedioId(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteVedioId: any }>(`mutation UpdateDeleteVedioId($videoId: String!) { UpdateDeleteVedioId(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserReview(variables: { reviewStar?: (string | null), reviewContent?: (string | null), classifiedId?: (string | null), reviewerId: string, userId: string }, resultSelector: string | ((qb: UserReviewModelSelector) => UserReviewModelSelector) = userReviewModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserReview: UserReviewModelType}>(`mutation createUserReview($reviewStar: String, $reviewContent: String, $classifiedId: String, $reviewerId: String!, $userId: String!) { createUserReview(reviewStar: $reviewStar, reviewContent: $reviewContent, classifiedId: $classifiedId, reviewerId: $reviewerId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserReviewModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteReviewId(variables: { reviewId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteReviewId: any }>(`mutation UpdateDeleteReviewId($reviewId: String!) { UpdateDeleteReviewId(reviewId: $reviewId) }`, variables, optimisticUpdate)
    },
    mutateCreateChannel(variables: { channelName: string, videoId?: (string | null), userId: string }, resultSelector: string | ((qb: ChannelListModelSelector) => ChannelListModelSelector) = channelListModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createChannel: ChannelListModelType}>(`mutation createChannel($channelName: String!, $videoId: String, $userId: String!) { createChannel(channelName: $channelName, videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new ChannelListModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateAddVediotoChannel(variables: { channelId: string, videoId?: (string | null), userId: string }, resultSelector: string | ((qb: ChannelListModelSelector) => ChannelListModelSelector) = channelListModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addVediotoChannel: ChannelListModelType}>(`mutation addVediotoChannel($channelId: String!, $videoId: String, $userId: String!) { addVediotoChannel(channelId: $channelId, videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new ChannelListModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteChannelId(variables: { channelId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteChannelId: any }>(`mutation UpdateDeleteChannelId($channelId: String!) { UpdateDeleteChannelId(channelId: $channelId) }`, variables, optimisticUpdate)
    },
    mutateSaveLikedClassifiedFeed(variables: { classifiedFeedId: string, usersavedId: string }, resultSelector: string | ((qb: SaveClassifiedModelSelector) => SaveClassifiedModelSelector) = saveClassifiedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveLikedClassifiedFeed: SaveClassifiedModelType}>(`mutation saveLikedClassifiedFeed($classifiedFeedId: String!, $usersavedId: String!) { saveLikedClassifiedFeed(ClassifiedFeedId: $classifiedFeedId, usersavedId: $usersavedId) {
        ${typeof resultSelector === "function" ? resultSelector(new SaveClassifiedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletesavedId(variables: { classifiedsavedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletesavedId: any }>(`mutation UpdateDeletesavedId($classifiedsavedId: String!) { UpdateDeletesavedId(classifiedsavedId: $classifiedsavedId) }`, variables, optimisticUpdate)
    },
    mutateLikeDislikeVedio(variables: { status: string, videoId: string, userId: string }, resultSelector: string | ((qb: LikeVediosModelSelector) => LikeVediosModelSelector) = likeVediosModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ likeDislikeVedio: LikeVediosModelType}>(`mutation likeDislikeVedio($status: String!, $videoId: String!, $userId: String!) { likeDislikeVedio(status: $status, videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new LikeVediosModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
