/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { videoUploadModelPrimitives, VideoUploadModelSelector } from "./VideoUploadModel.base"
import { SaveVideoModel, SaveVideoModelType } from "./SaveVideoModel"
import { saveVideoModelPrimitives, SaveVideoModelSelector } from "./SaveVideoModel.base"
import { CommentsDetailModel, CommentsDetailModelType } from "./CommentsDetailModel"
import { commentsDetailModelPrimitives, CommentsDetailModelSelector } from "./CommentsDetailModel.base"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { topicDetailModelPrimitives, TopicDetailModelSelector } from "./TopicDetailModel.base"
import { StoryViewerUserModel, StoryViewerUserModelType } from "./StoryViewerUserModel"
import { storyViewerUserModelPrimitives, StoryViewerUserModelSelector } from "./StoryViewerUserModel.base"
import { FollowUserModel, FollowUserModelType } from "./FollowUserModel"
import { followUserModelPrimitives, FollowUserModelSelector } from "./FollowUserModel.base"
import { UserReviewModel, UserReviewModelType } from "./UserReviewModel"
import { userReviewModelPrimitives, UserReviewModelSelector } from "./UserReviewModel.base"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { classifiedFeedModelPrimitives, ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { SaveClassifiedModel, SaveClassifiedModelType } from "./SaveClassifiedModel"
import { saveClassifiedModelPrimitives, SaveClassifiedModelSelector } from "./SaveClassifiedModel.base"
import { LikeVideosModel, LikeVideosModelType } from "./LikeVideosModel"
import { likeVideosModelPrimitives, LikeVideosModelSelector } from "./LikeVideosModel.base"
import { VideoPlaylistModel, VideoPlaylistModelType } from "./VideoPlaylistModel"
import { videoPlaylistModelPrimitives, VideoPlaylistModelSelector } from "./VideoPlaylistModel.base"
import { VideoUploadPlaylistModel, VideoUploadPlaylistModelType } from "./VideoUploadPlaylistModel"
import { videoUploadPlaylistModelPrimitives, VideoUploadPlaylistModelSelector } from "./VideoUploadPlaylistModel.base"



export type InputUser = {
  name?: (string | null)
  first_name?: (string | null)
  last_name?: (string | null)
  password?: (string | null)
  picture?: (string | null)
  description?: (string | null)
}
export type InputVideoUploadPlaylist = {
  VideoId?: (string | null)
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
queryGetUserBysocialId="queryGetUserBysocialId",
queryGetchannelUser="queryGetchannelUser",
queryGetByvideoId="queryGetByvideoId",
queryGetAllTopicByPageNumber="queryGetAllTopicByPageNumber",
queryGetAllTopics="queryGetAllTopics",
queryGetTopicByUserId="queryGetTopicByUserId",
queryGetCommentByTopicId="queryGetCommentByTopicId",
queryGetCommentsByTopicId="queryGetCommentsByTopicId",
queryGetAllComments="queryGetAllComments",
queryGetAllComment="queryGetAllComment",
queryGetCommentsByUserId="queryGetCommentsByUserId",
queryGetStoryByUserId="queryGetStoryByUserId",
queryGetStoryByStoryId="queryGetStoryByStoryId",
queryGetAllStory="queryGetAllStory",
queryGetfollowingByUserId="queryGetfollowingByUserId",
queryGetfollowerByFollowId="queryGetfollowerByFollowId",
queryGetAllClassifiedFeedss="queryGetAllClassifiedFeedss",
queryGetAllClassifiedFeed="queryGetAllClassifiedFeed",
queryGetClassifiedByUserIdPage="queryGetClassifiedByUserIdPage",
queryGetByClassifiedFeedId="queryGetByClassifiedFeedId",
queryGetAllSaved="queryGetAllSaved",
queryGetAllSavedClassified="queryGetAllSavedClassified",
queryGetAllSavedClassifiedByUserId="queryGetAllSavedClassifiedByUserId",
queryGetAllSavedByType="queryGetAllSavedByType",
queryGetAllVideo="queryGetAllVideo",
queryGetAllUploadedVideo="queryGetAllUploadedVideo",
queryGetUploadedVideoByUserIdPage="queryGetUploadedVideoByUserIdPage",
queryGetUserChannel="queryGetUserChannel",
queryGetAllReviews="queryGetAllReviews",
queryGetReviewOnUserId="queryGetReviewOnUserId",
queryGetReviewByReviewId="queryGetReviewByReviewId",
queryGetlikesVideoByUserId="queryGetlikesVideoByUserId",
queryGetuserLikesonVideo="queryGetuserLikesonVideo",
queryGetAllPlaylistVideo="queryGetAllPlaylistVideo",
queryGetVideoPlaylistByUserId="queryGetVideoPlaylistByUserId"
}
export enum RootStoreBaseMutations {
mutateCreateUser="mutateCreateUser",
mutateUpdatePassword="mutateUpdatePassword",
mutateResetPassword="mutateResetPassword",
mutateSignin="mutateSignin",
mutateGetUserById="mutateGetUserById",
mutateUpdateUser="mutateUpdateUser",
mutateSendOtpOnEmailByUserId="mutateSendOtpOnEmailByUserId",
mutateVerifyEmailByUserId="mutateVerifyEmailByUserId",
mutateGenerateOTP="mutateGenerateOTP",
mutateUpdateDeleteStatus="mutateUpdateDeleteStatus",
mutateSaveLikedVideo="mutateSaveLikedVideo",
mutateUpdateDeletesavedVideo="mutateUpdateDeletesavedVideo",
mutateDeleteVideo="mutateDeleteVideo",
mutateCreateUserTopic="mutateCreateUserTopic",
mutateUploadFile="mutateUploadFile",
mutateGetTopicByUser="mutateGetTopicByUser",
mutateGetTopicByTopicId="mutateGetTopicByTopicId",
mutateUpdateDeleteTopicId="mutateUpdateDeleteTopicId",
mutateCommentOnTopic="mutateCommentOnTopic",
mutateDeleteCommentbyCommentId="mutateDeleteCommentbyCommentId",
mutateCreateStory="mutateCreateStory",
mutateFollowById="mutateFollowById",
mutateCreateClassifiedDetail="mutateCreateClassifiedDetail",
mutateGetClassifiedByUserId="mutateGetClassifiedByUserId",
mutateGetClassifiedById="mutateGetClassifiedById",
mutateUpdateDeleteClassifiedId="mutateUpdateDeleteClassifiedId",
mutateSaveLikedClassifiedFeed="mutateSaveLikedClassifiedFeed",
mutateUpdateDeletesavedclassified="mutateUpdateDeletesavedclassified",
mutateDeleteClassfied="mutateDeleteClassfied",
mutateUploadVideoByUser="mutateUploadVideoByUser",
mutateGetUploadVideoByUserId="mutateGetUploadVideoByUserId",
mutateGetUploadVideoByVideoId="mutateGetUploadVideoByVideoId",
mutateUpdateDeleteVideoId="mutateUpdateDeleteVideoId",
mutateUpdateVideoViews="mutateUpdateVideoViews",
mutateCreateUserReview="mutateCreateUserReview",
mutateUpdateDeleteReviewId="mutateUpdateDeleteReviewId",
mutateLikeDislikeVideo="mutateLikeDislikeVideo",
mutateUploadVideoPlaylist="mutateUploadVideoPlaylist",
mutateUpdateVideoPart="mutateUpdateVideoPart"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['VideoUpload', () => VideoUploadModel], ['saveVideo', () => SaveVideoModel], ['CommentsDetail', () => CommentsDetailModel], ['TopicDetail', () => TopicDetailModel], ['storyViewerUser', () => StoryViewerUserModel], ['followUser', () => FollowUserModel], ['UserReview', () => UserReviewModel], ['classifiedFeed', () => ClassifiedFeedModel], ['saveClassified', () => SaveClassifiedModel], ['likeVideos', () => LikeVideosModel], ['VideoPlaylist', () => VideoPlaylistModel], ['VideoUploadPlaylist', () => VideoUploadPlaylistModel]], [], "js"))
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
    queryGetUserBysocialId(variables: { socialId: string }, options: QueryOptions = {}) {
      return self.query<{ getUserBysocialId: any }>(`query getUserBysocialId($socialId: String!) { getUserBysocialId(socialId: $socialId) }`, variables, options)
    },
    queryGetchannelUser(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getchannelUser: any }>(`query getchannelUser { getchannelUser }`, variables, options)
    },
    queryGetByvideoId(variables: { videoId: string }, options: QueryOptions = {}) {
      return self.query<{ getByvideoId: any }>(`query getByvideoId($videoId: String!) { getByvideoId(videoId: $videoId) }`, variables, options)
    },
    queryGetAllTopicByPageNumber(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllTopicByPageNumber: any }>(`query getAllTopicByPageNumber($pageNumber: Float!) { getAllTopicByPageNumber(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllTopics(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllTopics: any }>(`query getAllTopics { getAllTopics }`, variables, options)
    },
    queryGetTopicByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUserId: any }>(`query getTopicByUserId($pageNumber: Float!, $userId: String!) { getTopicByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetCommentByTopicId(variables: { pageNumber: number, topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentByTopicId: any }>(`query getCommentByTopicId($pageNumber: Float!, $topicId: String!) { getCommentByTopicId(pageNumber: $pageNumber, TopicId: $topicId) }`, variables, options)
    },
    queryGetCommentsByTopicId(variables: { topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByTopicId: any }>(`query getCommentsByTopicId($topicId: String!) { getCommentsByTopicId(TopicId: $topicId) }`, variables, options)
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
    queryGetStoryByStoryId(variables: { storyId: string }, options: QueryOptions = {}) {
      return self.query<{ getStoryByStoryId: any }>(`query getStoryByStoryId($storyId: String!) { getStoryByStoryId(storyId: $storyId) }`, variables, options)
    },
    queryGetAllStory(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllStory: any }>(`query getAllStory { getAllStory }`, variables, options)
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
    queryGetClassifiedByUserIdPage(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getClassifiedByUserIdPage: any }>(`query getClassifiedByUserIdPage($pageNumber: Float!, $userId: String!) { getClassifiedByUserIdPage(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
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
    queryGetAllSavedClassifiedByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedClassifiedByUserId: any }>(`query getAllSavedClassifiedByUserId($userId: String!) { getAllSavedClassifiedByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllSavedByType(variables: { savedType: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedByType: any }>(`query getAllSavedByType($savedType: String!) { getAllSavedByType(savedType: $savedType) }`, variables, options)
    },
    queryGetAllVideo(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllVideo: any }>(`query getAllVideo { getAllVideo }`, variables, options)
    },
    queryGetAllUploadedVideo(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllUploadedVideo: any }>(`query getAllUploadedVideo($pageNumber: Float!) { getAllUploadedVideo(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetUploadedVideoByUserIdPage(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUploadedVideoByUserIdPage: any }>(`query getUploadedVideoByUserIdPage($pageNumber: Float!, $userId: String!) { getUploadedVideoByUserIdPage(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetUserChannel(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getUserChannel: any }>(`query getUserChannel { getUserChannel }`, variables, options)
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
    queryGetlikesVideoByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getlikesVideoByUserId: any }>(`query getlikesVideoByUserId($userId: String!) { getlikesVideoByUserId(userId: $userId) }`, variables, options)
    },
    queryGetuserLikesonVideo(variables: { videoId: string }, options: QueryOptions = {}) {
      return self.query<{ getuserLikesonVideo: any }>(`query getuserLikesonVideo($videoId: String!) { getuserLikesonVideo(videoId: $videoId) }`, variables, options)
    },
    queryGetAllPlaylistVideo(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllPlaylistVideo: any }>(`query getAllPlaylistVideo { getAllPlaylistVideo }`, variables, options)
    },
    queryGetVideoPlaylistByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getVideoPlaylistByUserId: any }>(`query getVideoPlaylistByUserId($userId: String!) { getVideoPlaylistByUserId(userId: $userId) }`, variables, options)
    },
    mutateCreateUser(variables: { description?: (string | null), type: string, isSocialLogin: boolean, picture?: (string | null), lastName: string, firstName: string, socialId?: (string | null), password: string, email: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUser: UserModelType}>(`mutation createUser($description: String, $type: String!, $isSocialLogin: Boolean!, $picture: String, $lastName: String!, $firstName: String!, $socialId: String, $password: String!, $email: String!, $name: String!) { createUser(description: $description, type: $type, isSocialLogin: $isSocialLogin, picture: $picture, last_name: $lastName, first_name: $firstName, socialId: $socialId, password: $password, email: $email, name: $name) {
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
    mutateGetUserById(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getUserById: any }>(`mutation getUserById($userId: String!) { getUserById(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateUser(variables: { user: InputUser, userId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUser: UserModelType}>(`mutation updateUser($user: InputUser!, $userId: String!) { updateUser(user: $user, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSendOtpOnEmailByUserId(variables: { email: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sendOtpOnEmailByUserId: any }>(`mutation sendOtpOnEmailByUserId($email: String!, $userId: String!) { sendOtpOnEmailByUserId(email: $email, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateVerifyEmailByUserId(variables: { email: string, otp: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ verifyEmailByUserId: any }>(`mutation verifyEmailByUserId($email: String!, $otp: String!, $userId: String!) { verifyEmailByUserId(email: $email, Otp: $otp, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGenerateOTP(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ generateOTP: any }>(`mutation generateOTP($userId: String!) { generateOTP(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteStatus(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteStatus: any }>(`mutation UpdateDeleteStatus($userId: String!) { UpdateDeleteStatus(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateSaveLikedVideo(variables: { videoId: string, userId: string }, resultSelector: string | ((qb: SaveVideoModelSelector) => SaveVideoModelSelector) = saveVideoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveLikedVideo: SaveVideoModelType}>(`mutation saveLikedVideo($videoId: String!, $userId: String!) { saveLikedVideo(videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SaveVideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletesavedVideo(variables: { videosavedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletesavedVideo: any }>(`mutation UpdateDeletesavedVideo($videosavedId: String!) { UpdateDeletesavedVideo(VideosavedId: $videosavedId) }`, variables, optimisticUpdate)
    },
    mutateDeleteVideo(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteVideo: boolean }>(`mutation deleteVideo($videoId: String!) { deleteVideo(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserTopic(variables: { attachmentUrl?: (string | null), attachmentType?: (string | null), topicContent: string, commentId?: (string | null), userId: string }, resultSelector: string | ((qb: TopicDetailModelSelector) => TopicDetailModelSelector) = topicDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserTopic: TopicDetailModelType}>(`mutation createUserTopic($attachmentUrl: String, $attachmentType: String, $topicContent: String!, $commentId: String, $userId: String!) { createUserTopic(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, topicContent: $topicContent, commentId: $commentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new TopicDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUploadFile(variables: { uri: string, type: string, fileName: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ uploadFile: any }>(`mutation uploadFile($uri: String!, $type: String!, $fileName: String!) { uploadFile(uri: $uri, type: $type, fileName: $fileName) }`, variables, optimisticUpdate)
    },
    mutateGetTopicByUser(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getTopicByUser: any }>(`mutation getTopicByUser($userId: String!) { getTopicByUser(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetTopicByTopicId(variables: { topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getTopicByTopicId: any }>(`mutation getTopicByTopicId($topicId: String!) { getTopicByTopicId(TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteTopicId(variables: { topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteTopicId: any }>(`mutation UpdateDeleteTopicId($topicId: String!) { UpdateDeleteTopicId(TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnTopic(variables: { acttachmentType?: (string | null), acttachmentUrl?: (string | null), comment?: (string | null), topicId: string, userId: string }, resultSelector: string | ((qb: CommentsDetailModelSelector) => CommentsDetailModelSelector) = commentsDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnTopic: CommentsDetailModelType}>(`mutation commentOnTopic($acttachmentType: String, $acttachmentUrl: String, $comment: String, $topicId: String!, $userId: String!) { commentOnTopic(acttachmentType: $acttachmentType, acttachmentUrl: $acttachmentUrl, comment: $comment, TopicId: $topicId, userId: $userId) {
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
    mutateGetClassifiedByUserId(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getClassifiedByUserId: any }>(`mutation getClassifiedByUserId($userId: String!) { getClassifiedByUserId(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetClassifiedById(variables: { classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getClassifiedById: any }>(`mutation getClassifiedById($classifiedId: String!) { getClassifiedById(classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteClassifiedId(variables: { classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteClassifiedId: any }>(`mutation UpdateDeleteClassifiedId($classifiedId: String!) { UpdateDeleteClassifiedId(classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateSaveLikedClassifiedFeed(variables: { classifiedFeedId: string, userId: string }, resultSelector: string | ((qb: SaveClassifiedModelSelector) => SaveClassifiedModelSelector) = saveClassifiedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveLikedClassifiedFeed: SaveClassifiedModelType}>(`mutation saveLikedClassifiedFeed($classifiedFeedId: String!, $userId: String!) { saveLikedClassifiedFeed(ClassifiedFeedId: $classifiedFeedId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SaveClassifiedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletesavedclassified(variables: { classifiedsavedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletesavedclassified: any }>(`mutation UpdateDeletesavedclassified($classifiedsavedId: String!) { UpdateDeletesavedclassified(classifiedsavedId: $classifiedsavedId) }`, variables, optimisticUpdate)
    },
    mutateDeleteClassfied(variables: { classifiedFeedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteClassfied: boolean }>(`mutation deleteClassfied($classifiedFeedId: String!) { deleteClassfied(ClassifiedFeedId: $classifiedFeedId) }`, variables, optimisticUpdate)
    },
    mutateUploadVideoByUser(variables: { thumbnailUrl: string, view?: (string | null), attachmentVideoUrl: string, description?: (string | null), videoHeading?: (string | null), vedioPlaylistId?: (string | null), userId: string }, resultSelector: string | ((qb: VideoUploadModelSelector) => VideoUploadModelSelector) = videoUploadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ uploadVideoByUser: VideoUploadModelType}>(`mutation uploadVideoByUser($thumbnailUrl: String!, $view: String, $attachmentVideoUrl: String!, $description: String, $videoHeading: String, $vedioPlaylistId: String, $userId: String!) { uploadVideoByUser(thumbnailUrl: $thumbnailUrl, view: $view, attachmentVideoUrl: $attachmentVideoUrl, description: $description, videoHeading: $videoHeading, vedioPlaylistId: $vedioPlaylistId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoUploadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGetUploadVideoByUserId(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getUploadVideoByUserId: any }>(`mutation getUploadVideoByUserId($userId: String!) { getUploadVideoByUserId(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetUploadVideoByVideoId(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getUploadVideoByVideoId: any }>(`mutation getUploadVideoByVideoId($videoId: String!) { getUploadVideoByVideoId(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteVideoId(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteVideoId: any }>(`mutation UpdateDeleteVideoId($videoId: String!) { UpdateDeleteVideoId(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoViews(variables: { videoId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateVideoViews: any }>(`mutation UpdateVideoViews($videoId: String!, $userId: String!) { UpdateVideoViews(videoId: $videoId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserReview(variables: { reviewStar?: (string | null), reviewContent?: (string | null), classifiedId?: (string | null), reviewerId: string, userId: string }, resultSelector: string | ((qb: UserReviewModelSelector) => UserReviewModelSelector) = userReviewModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserReview: UserReviewModelType}>(`mutation createUserReview($reviewStar: String, $reviewContent: String, $classifiedId: String, $reviewerId: String!, $userId: String!) { createUserReview(reviewStar: $reviewStar, reviewContent: $reviewContent, classifiedId: $classifiedId, reviewerId: $reviewerId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserReviewModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteReviewId(variables: { reviewId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteReviewId: any }>(`mutation UpdateDeleteReviewId($reviewId: String!) { UpdateDeleteReviewId(reviewId: $reviewId) }`, variables, optimisticUpdate)
    },
    mutateLikeDislikeVideo(variables: { status: string, videoId: string, userId: string }, resultSelector: string | ((qb: LikeVideosModelSelector) => LikeVideosModelSelector) = likeVideosModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ likeDislikeVideo: LikeVideosModelType}>(`mutation likeDislikeVideo($status: String!, $videoId: String!, $userId: String!) { likeDislikeVideo(status: $status, videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new LikeVideosModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUploadVideoPlaylist(variables: { playListName: string, videoUpload: InputVideoUploadPlaylist[], userId: string }, resultSelector: string | ((qb: VideoPlaylistModelSelector) => VideoPlaylistModelSelector) = videoPlaylistModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ uploadVideoPlaylist: VideoPlaylistModelType}>(`mutation uploadVideoPlaylist($playListName: String!, $videoUpload: [InputVideoUploadPlaylist!]!, $userId: String!) { uploadVideoPlaylist(playListName: $playListName, VideoUpload: $videoUpload, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoPlaylistModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoPart(variables: { videoUploadId: InputVideoUploadPlaylist[], videoPlaylistId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateVideoPart: any }>(`mutation UpdateVideoPart($videoUploadId: [InputVideoUploadPlaylist!]!, $videoPlaylistId: String!) { UpdateVideoPart(VideoUploadId: $videoUploadId, videoPlaylistId: $videoPlaylistId) }`, variables, optimisticUpdate)
    },
  })))
