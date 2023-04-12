/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserRatingModel, UserRatingModelType } from "./UserRatingModel"
import { userRatingModelPrimitives, UserRatingModelSelector } from "./UserRatingModel.base"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { classifiedFeedModelPrimitives, ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { CommentsDetailModel, CommentsDetailModelType } from "./CommentsDetailModel"
import { commentsDetailModelPrimitives, CommentsDetailModelSelector } from "./CommentsDetailModel.base"
import { LikeTopicsModel, LikeTopicsModelType } from "./LikeTopicsModel"
import { likeTopicsModelPrimitives, LikeTopicsModelSelector } from "./LikeTopicsModel.base"
import { TopicIdArrayModel, TopicIdArrayModelType } from "./TopicIdArrayModel"
import { topicIdArrayModelPrimitives, TopicIdArrayModelSelector } from "./TopicIdArrayModel.base"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { topicDetailModelPrimitives, TopicDetailModelSelector } from "./TopicDetailModel.base"
import { LikeVideosModel, LikeVideosModelType } from "./LikeVideosModel"
import { likeVideosModelPrimitives, LikeVideosModelSelector } from "./LikeVideosModel.base"
import { VideoLikeArrayModel, VideoLikeArrayModelType } from "./VideoLikeArrayModel"
import { videoLikeArrayModelPrimitives, VideoLikeArrayModelSelector } from "./VideoLikeArrayModel.base"
import { VideoPlaylistModel, VideoPlaylistModelType } from "./VideoPlaylistModel"
import { videoPlaylistModelPrimitives, VideoPlaylistModelSelector } from "./VideoPlaylistModel.base"
import { VideoUploadPlaylistModel, VideoUploadPlaylistModelType } from "./VideoUploadPlaylistModel"
import { videoUploadPlaylistModelPrimitives, VideoUploadPlaylistModelSelector } from "./VideoUploadPlaylistModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { videoUploadModelPrimitives, VideoUploadModelSelector } from "./VideoUploadModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { SigninUserModel, SigninUserModelType } from "./SigninUserModel"
import { signinUserModelPrimitives, SigninUserModelSelector } from "./SigninUserModel.base"
import { LegalitiesModel, LegalitiesModelType } from "./LegalitiesModel"
import { legalitiesModelPrimitives, LegalitiesModelSelector } from "./LegalitiesModel.base"
import { SaveVideoModel, SaveVideoModelType } from "./SaveVideoModel"
import { saveVideoModelPrimitives, SaveVideoModelSelector } from "./SaveVideoModel.base"
import { StoryViewerUserModel, StoryViewerUserModelType } from "./StoryViewerUserModel"
import { storyViewerUserModelPrimitives, StoryViewerUserModelSelector } from "./StoryViewerUserModel.base"
import { SaveClassifiedModel, SaveClassifiedModelType } from "./SaveClassifiedModel"
import { saveClassifiedModelPrimitives, SaveClassifiedModelSelector } from "./SaveClassifiedModel.base"
import { HomecommentsModel, HomecommentsModelType } from "./HomecommentsModel"
import { homecommentsModelPrimitives, HomecommentsModelSelector } from "./HomecommentsModel.base"
import { HomePageDetailModel, HomePageDetailModelType } from "./HomePageDetailModel"
import { homePageDetailModelPrimitives, HomePageDetailModelSelector } from "./HomePageDetailModel.base"
import { HomePageIdArrayModel, HomePageIdArrayModelType } from "./HomePageIdArrayModel"
import { homePageIdArrayModelPrimitives, HomePageIdArrayModelSelector } from "./HomePageIdArrayModel.base"
import { FollowUserModel, FollowUserModelType } from "./FollowUserModel"
import { followUserModelPrimitives, FollowUserModelSelector } from "./FollowUserModel.base"
import { MetaDataModel, MetaDataModelType } from "./MetaDataModel"
import { metaDataModelPrimitives, MetaDataModelSelector } from "./MetaDataModel.base"
import { NotificationModel, NotificationModelType } from "./NotificationModel"
import { notificationModelPrimitives, NotificationModelSelector } from "./NotificationModel.base"
import { UsersChatModel, UsersChatModelType } from "./UsersChatModel"
import { usersChatModelPrimitives, UsersChatModelSelector } from "./UsersChatModel.base"
import { RoomChatModel, RoomChatModelType } from "./RoomChatModel"
import { roomChatModelPrimitives, RoomChatModelSelector } from "./RoomChatModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { usersModelPrimitives, UsersModelSelector } from "./UsersModel.base"
import { CallMetaDataModel, CallMetaDataModelType } from "./CallMetaDataModel"
import { callMetaDataModelPrimitives, CallMetaDataModelSelector } from "./CallMetaDataModel.base"
import { CallNotificationModel, CallNotificationModelType } from "./CallNotificationModel"
import { callNotificationModelPrimitives, CallNotificationModelSelector } from "./CallNotificationModel.base"



export type InputTopicIdArray = {
  TopicId?: (string | null)
}
export type InputHomePageIdArray = {
  HomePageId?: (string | null)
}
export type InputVideoLikeArray = {
  VideoId?: (string | null)
}
export type InputUser = {
  name?: (string | null)
  first_name?: (string | null)
  last_name?: (string | null)
  password?: (string | null)
  picture?: (string | null)
  description?: (string | null)
}
export type InputInfo = {
  LegalitiesData?: (string | null)
}
export type InputTopic = {
  topicContent?: (string | null)
  title?: (string | null)
  attachmentType?: (string | null)
  attachmentUrl?: (string | null)
  status?: (string | null)
  likeviews?: (number | null)
  dislikeviews?: (number | null)
}
export type InputVideoUploadPlaylist = {
  VideoId?: (string | null)
}
export type InputVideo = {
  videoHeading?: (string | null)
  description?: (string | null)
  attachmentVideoUrl?: (string | null)
  thumbnailUrl?: (string | null)
  view?: (number | null)
  status?: (string | null)
  likeviews?: (number | null)
  dislikeviews?: (number | null)
}
export type InputClassified = {
  classifiedDetail?: (string | null)
  attachmentType?: (string | null)
  attachmentUrl?: (string | null)
  prize?: (string | null)
  title?: (string | null)
  condition?: (string | null)
}
export type InputHomePage = {
  Discription?: (string | null)
  attachmentType?: (string | null)
  attachmentUrl?: (string | null)
  status?: (string | null)
}
export type InputUsers = {
  userId1?: (string | null)
}
export type InputNotification = {
  body?: (string | null)
  title?: (string | null)
}
export type InputMetaData = {
  metaDataType?: (string | null)
  classifiedId?: (string | null)
  amount?: (string | null)
  currency?: (string | null)
  data?: (string | null)
}
export type InputCallNotification = {
  body?: (string | null)
  title?: (string | null)
}
export type InputCallMetaData = {
  metaDataType?: (string | null)
  classifiedId?: (string | null)
  amount?: (string | null)
  currency?: (string | null)
}
export type Inputdata = {
  receiver?: (string | null)
  roomId?: (string | null)
  type?: (string | null)
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryHello="queryHello",
queryGetAllUsers="queryGetAllUsers",
queryGetAdmin="queryGetAdmin",
queryGetAllUsersAdmin="queryGetAllUsersAdmin",
queryGetAllUsersAdminpage="queryGetAllUsersAdminpage",
queryGetUserBysocialId="queryGetUserBysocialId",
queryGetchannelUser="queryGetchannelUser",
queryGetSearchedUser="queryGetSearchedUser",
queryGetAllLegalitiesData="queryGetAllLegalitiesData",
queryGetAllTopicByPageNumber="queryGetAllTopicByPageNumber",
queryGetAllTopicByPageNumberInteraction="queryGetAllTopicByPageNumberInteraction",
queryGetAllTopics="queryGetAllTopics",
queryGetTopicByUserId="queryGetTopicByUserId",
queryGetTopicByUsersId="queryGetTopicByUsersId",
queryGetCommentByTopicId="queryGetCommentByTopicId",
queryGetCommentsByTopicId="queryGetCommentsByTopicId",
queryGetSearchedTopic="queryGetSearchedTopic",
queryGetlikesTopicByUserId="queryGetlikesTopicByUserId",
queryGetuserLikesonTopic="queryGetuserLikesonTopic",
queryGetByTopicId="queryGetByTopicId",
queryGetLikesonTopicbyuser="queryGetLikesonTopicbyuser",
queryGetStoryByUserId="queryGetStoryByUserId",
queryGetStoryByStoryId="queryGetStoryByStoryId",
queryGetAllStory="queryGetAllStory",
queryGetAllStoryByPage="queryGetAllStoryByPage",
queryGetAllVideo="queryGetAllVideo",
queryGetAllUploadedVideoss="queryGetAllUploadedVideoss",
queryGetAllUploadedVideo="queryGetAllUploadedVideo",
queryGetUploadedVideoByUserIdPage="queryGetUploadedVideoByUserIdPage",
queryGetUserChannel="queryGetUserChannel",
queryGetSearchedItem="queryGetSearchedItem",
queryGetAllClassifiedFeedss="queryGetAllClassifiedFeedss",
queryGetAllClassifiedFeed="queryGetAllClassifiedFeed",
queryGetClassifiedByUserIdPage="queryGetClassifiedByUserIdPage",
queryGetSearchedclassified="queryGetSearchedclassified",
queryGetByClassifiedFeedId="queryGetByClassifiedFeedId",
queryGetAllSaved="queryGetAllSaved",
queryGetAllSavedByPage="queryGetAllSavedByPage",
queryGetAllSavedClassified="queryGetAllSavedClassified",
queryGetAllSavedByUserIdpageNumber="queryGetAllSavedByUserIdpageNumber",
queryGetAllSavedByUserId="queryGetAllSavedByUserId",
queryGetAllSavedByType="queryGetAllSavedByType",
queryGetAllHomePagesByPageNumber="queryGetAllHomePagesByPageNumber",
queryGetAllHomePagesByPage="queryGetAllHomePagesByPage",
queryGetAllHomePagess="queryGetAllHomePagess",
queryGetHomePagesByUserId="queryGetHomePagesByUserId",
queryGetHomePagesByUsersId="queryGetHomePagesByUsersId",
queryGetCommentByHomePageId="queryGetCommentByHomePageId",
queryGetCommentsByHomePageId="queryGetCommentsByHomePageId",
queryGetSearchedHomePages="queryGetSearchedHomePages",
queryGetlikeshomeByUserId="queryGetlikeshomeByUserId",
queryGetuserLikesonhome="queryGetuserLikesonhome",
queryGetByHomePageId="queryGetByHomePageId",
queryGetLikesOnHomeFeedByuser="queryGetLikesOnHomeFeedByuser",
queryGetByvideoId="queryGetByvideoId",
queryGetlikesVideoByUserId="queryGetlikesVideoByUserId",
queryGetLikesonVideobyuser="queryGetLikesonVideobyuser",
queryGetuserLikesonVideo="queryGetuserLikesonVideo",
queryGetAllPlaylistVideo="queryGetAllPlaylistVideo",
queryGetVideoPlaylistByUserId="queryGetVideoPlaylistByUserId",
queryGetVideoPlaylistByPlaylistId="queryGetVideoPlaylistByPlaylistId",
queryGetAllComments="queryGetAllComments",
queryGetAllComment="queryGetAllComment",
queryGetCommentsByUserId="queryGetCommentsByUserId",
queryGetfollowingByUserId="queryGetfollowingByUserId",
queryGetfollowerByFollowId="queryGetfollowerByFollowId",
queryGetratingOnUserId="queryGetratingOnUserId",
queryCheckUserRating="queryCheckUserRating",
queryGetratingByratingId="queryGetratingByratingId",
queryGetNotification="queryGetNotification"
}
export enum RootStoreBaseMutations {
mutateCreateUser="mutateCreateUser",
mutateAddNotificationToken="mutateAddNotificationToken",
mutateSetNotificationStatus="mutateSetNotificationStatus",
mutateUpdatePassword="mutateUpdatePassword",
mutateStoreDeviceId="mutateStoreDeviceId",
mutateGetBlockedUser="mutateGetBlockedUser",
mutateResetPassword="mutateResetPassword",
mutateSignin="mutateSignin",
mutateVerifyToken="mutateVerifyToken",
mutateGetUserById="mutateGetUserById",
mutateUpdateUser="mutateUpdateUser",
mutateUpdateAverageRating="mutateUpdateAverageRating",
mutateSendOtpOnEmailByEmail="mutateSendOtpOnEmailByEmail",
mutateVerifyEmailByEmail="mutateVerifyEmailByEmail",
mutateGenerateOTP="mutateGenerateOTP",
mutateUpdateDeleteStatus="mutateUpdateDeleteStatus",
mutateStoreBlockedUser="mutateStoreBlockedUser",
mutateStoreLegalities="mutateStoreLegalities",
mutateUpdateLegalInfo="mutateUpdateLegalInfo",
mutateCreateUserTopic="mutateCreateUserTopic",
mutateGetTopicByUser="mutateGetTopicByUser",
mutateGetTopicByTopicId="mutateGetTopicByTopicId",
mutateGetTopicById="mutateGetTopicById",
mutateUpdateDeleteTopicId="mutateUpdateDeleteTopicId",
mutateDeleteDetailTopicId="mutateDeleteDetailTopicId",
mutateUpdateLikeViews="mutateUpdateLikeViews",
mutateUpdateUserTopic="mutateUpdateUserTopic",
mutateLikeDislikeTopic="mutateLikeDislikeTopic",
mutateCreateStory="mutateCreateStory",
mutateDeleteStory="mutateDeleteStory",
mutateUploadVideoByUser="mutateUploadVideoByUser",
mutateGetUploadVideoByUserId="mutateGetUploadVideoByUserId",
mutateGetUploadVideoByVideoId="mutateGetUploadVideoByVideoId",
mutateGetUploadVideoByPlaylistId="mutateGetUploadVideoByPlaylistId",
mutateGetVideoByVideoId="mutateGetVideoByVideoId",
mutateGetVideoByPlaylistId="mutateGetVideoByPlaylistId",
mutateUpdateDeleteVideoId="mutateUpdateDeleteVideoId",
mutateDeleteDetailVideoId="mutateDeleteDetailVideoId",
mutateUpdateVideoViews="mutateUpdateVideoViews",
mutateUpdatePlaylistIdVideoId="mutateUpdatePlaylistIdVideoId",
mutateUpdateUserVideo="mutateUpdateUserVideo",
mutateCreateClassifiedDetail="mutateCreateClassifiedDetail",
mutateGetClassifiedByUserId="mutateGetClassifiedByUserId",
mutateGetClassifiedById="mutateGetClassifiedById",
mutateUpdateDeleteClassifiedId="mutateUpdateDeleteClassifiedId",
mutateDeleteDetailClassifiedId="mutateDeleteDetailClassifiedId",
mutateUpdateUserClassified="mutateUpdateUserClassified",
mutateSaveLikedClassifiedFeed="mutateSaveLikedClassifiedFeed",
mutateUpdateDeletesavedclassified="mutateUpdateDeletesavedclassified",
mutateDeleteClassfied="mutateDeleteClassfied",
mutateCreateUserHomePages="mutateCreateUserHomePages",
mutateGetHomePagesByUser="mutateGetHomePagesByUser",
mutateGetHomePagesByHomePageId="mutateGetHomePagesByHomePageId",
mutateGetHomePagesById="mutateGetHomePagesById",
mutateUpdateDeleteHomePageId="mutateUpdateDeleteHomePageId",
mutateDeleteDetailHomePageId="mutateDeleteDetailHomePageId",
mutateUpdateUserHomePages="mutateUpdateUserHomePages",
mutateLikeDislikehome="mutateLikeDislikehome",
mutateSaveLikedVideo="mutateSaveLikedVideo",
mutateUpdateDeletesavedVideo="mutateUpdateDeletesavedVideo",
mutateDeleteVideo="mutateDeleteVideo",
mutateLikeDislikeVideo="mutateLikeDislikeVideo",
mutateUploadVideoPlaylist="mutateUploadVideoPlaylist",
mutateUpdateVideoPlaylist="mutateUpdateVideoPlaylist",
mutateUpdateVideoPlaylistbyVideoId="mutateUpdateVideoPlaylistbyVideoId",
mutateCommentOnTopic="mutateCommentOnTopic",
mutateDeleteCommentbyCommentId="mutateDeleteCommentbyCommentId",
mutateFollowById="mutateFollowById",
mutateCreateUserRating="mutateCreateUserRating",
mutateUpdateRating="mutateUpdateRating",
mutateCreateChatRoom="mutateCreateChatRoom",
mutateCreateUserMessage="mutateCreateUserMessage",
mutateCreateUserCall="mutateCreateUserCall",
mutateSendCallNotification="mutateSendCallNotification",
mutateAddOfferanswerInRoom="mutateAddOfferanswerInRoom",
mutateGetchatByUserId="mutateGetchatByUserId",
mutateGetchatByRoomId="mutateGetchatByRoomId",
mutateGetcallByUserId="mutateGetcallByUserId",
mutateGetCallByRoomId="mutateGetCallByRoomId",
mutateGetroomByUserId="mutateGetroomByUserId",
mutateGetroomByroomId="mutateGetroomByroomId",
mutateGetroomByUsers="mutateGetroomByUsers",
mutateGetroomBymembers="mutateGetroomBymembers",
mutateDeleteChatMessage="mutateDeleteChatMessage",
mutateDeleteChatRoom="mutateDeleteChatRoom",
mutateCommentOnHomepage="mutateCommentOnHomepage"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['UserRating', () => UserRatingModel], ['classifiedFeed', () => ClassifiedFeedModel], ['CommentsDetail', () => CommentsDetailModel], ['likeTopics', () => LikeTopicsModel], ['TopicIdArray', () => TopicIdArrayModel], ['TopicDetail', () => TopicDetailModel], ['likeVideos', () => LikeVideosModel], ['VideoLikeArray', () => VideoLikeArrayModel], ['VideoPlaylist', () => VideoPlaylistModel], ['VideoUploadPlaylist', () => VideoUploadPlaylistModel], ['VideoUpload', () => VideoUploadModel], ['User', () => UserModel], ['SigninUser', () => SigninUserModel], ['Legalities', () => LegalitiesModel], ['saveVideo', () => SaveVideoModel], ['storyViewerUser', () => StoryViewerUserModel], ['saveClassified', () => SaveClassifiedModel], ['Homecomments', () => HomecommentsModel], ['HomePageDetail', () => HomePageDetailModel], ['HomePageIdArray', () => HomePageIdArrayModel], ['followUser', () => FollowUserModel], ['MetaData', () => MetaDataModel], ['Notification', () => NotificationModel], ['usersChat', () => UsersChatModel], ['roomChat', () => RoomChatModel], ['Users', () => UsersModel], ['CallMetaData', () => CallMetaDataModel], ['CallNotification', () => CallNotificationModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    queryHello(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ hello: string }>(`query hello { hello }`, variables, options)
    },
    queryGetAllUsers(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllUsers: any }>(`query getAllUsers { getAllUsers }`, variables, options)
    },
    queryGetAdmin(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAdmin: any }>(`query getAdmin { getAdmin }`, variables, options)
    },
    queryGetAllUsersAdmin(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllUsersAdmin: any }>(`query getAllUsersAdmin { getAllUsersAdmin }`, variables, options)
    },
    queryGetAllUsersAdminpage(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllUsersAdminpage: any }>(`query getAllUsersAdminpage($pageNumber: Float!) { getAllUsersAdminpage(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetUserBysocialId(variables: { socialId: string }, options: QueryOptions = {}) {
      return self.query<{ getUserBysocialId: any }>(`query getUserBysocialId($socialId: String!) { getUserBysocialId(socialId: $socialId) }`, variables, options)
    },
    queryGetchannelUser(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getchannelUser: any }>(`query getchannelUser { getchannelUser }`, variables, options)
    },
    queryGetSearchedUser(variables: { searchKey: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getSearchedUser: any }>(`query getSearchedUser($searchKey: String!, $pageNumber: Float!) { getSearchedUser(searchKey: $searchKey, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllLegalitiesData(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllLegalitiesData: any }>(`query getAllLegalitiesData { getAllLegalitiesData }`, variables, options)
    },
    queryGetAllTopicByPageNumber(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllTopicByPageNumber: any }>(`query getAllTopicByPageNumber($pageNumber: Float!) { getAllTopicByPageNumber(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllTopicByPageNumberInteraction(variables: { userId: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllTopicByPageNumberInteraction: any }>(`query getAllTopicByPageNumberInteraction($userId: String!, $pageNumber: Float!) { getAllTopicByPageNumberInteraction(userId: $userId, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllTopics(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllTopics: any }>(`query getAllTopics { getAllTopics }`, variables, options)
    },
    queryGetTopicByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUserId: any }>(`query getTopicByUserId($pageNumber: Float!, $userId: String!) { getTopicByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetTopicByUsersId(variables: { callerId?: (string | null), pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUsersId: any }>(`query getTopicByUsersId($callerId: String, $pageNumber: Float!, $userId: String!) { getTopicByUsersId(callerId: $callerId, pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetCommentByTopicId(variables: { pageNumber: number, topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentByTopicId: any }>(`query getCommentByTopicId($pageNumber: Float!, $topicId: String!) { getCommentByTopicId(pageNumber: $pageNumber, TopicId: $topicId) }`, variables, options)
    },
    queryGetCommentsByTopicId(variables: { topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByTopicId: any }>(`query getCommentsByTopicId($topicId: String!) { getCommentsByTopicId(TopicId: $topicId) }`, variables, options)
    },
    queryGetSearchedTopic(variables: { searchKey: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getSearchedTopic: any }>(`query getSearchedTopic($searchKey: String!, $pageNumber: Float!) { getSearchedTopic(searchKey: $searchKey, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetlikesTopicByUserId(variables: { homePageIdarrayIds?: InputTopicIdArray[], userId: string }, options: QueryOptions = {}) {
      return self.query<{ getlikesTopicByUserId: any }>(`query getlikesTopicByUserId($homePageIdarrayIds: [InputTopicIdArray!], $userId: String!) { getlikesTopicByUserId(HomePageIdarrayIds: $homePageIdarrayIds, userId: $userId) }`, variables, options)
    },
    queryGetuserLikesonTopic(variables: { topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getuserLikesonTopic: any }>(`query getuserLikesonTopic($topicId: String!) { getuserLikesonTopic(TopicId: $topicId) }`, variables, options)
    },
    queryGetByTopicId(variables: { topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getByTopicId: any }>(`query getByTopicId($topicId: String!) { getByTopicId(TopicId: $topicId) }`, variables, options)
    },
    queryGetLikesonTopicbyuser(variables: { userId: string, topicId: string }, options: QueryOptions = {}) {
      return self.query<{ getLikesonTopicbyuser: any }>(`query getLikesonTopicbyuser($userId: String!, $topicId: String!) { getLikesonTopicbyuser(userId: $userId, TopicId: $topicId) }`, variables, options)
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
    queryGetAllStoryByPage(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllStoryByPage: any }>(`query getAllStoryByPage($pageNumber: Float!) { getAllStoryByPage(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllVideo(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllVideo: any }>(`query getAllVideo { getAllVideo }`, variables, options)
    },
    queryGetAllUploadedVideoss(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllUploadedVideoss: any }>(`query getAllUploadedVideoss($pageNumber: Float!) { getAllUploadedVideoss(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllUploadedVideo(variables: { userId: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllUploadedVideo: any }>(`query getAllUploadedVideo($userId: String!, $pageNumber: Float!) { getAllUploadedVideo(userId: $userId, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetUploadedVideoByUserIdPage(variables: { callerId?: (string | null), pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUploadedVideoByUserIdPage: any }>(`query getUploadedVideoByUserIdPage($callerId: String, $pageNumber: Float!, $userId: String!) { getUploadedVideoByUserIdPage(callerId: $callerId, pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetUserChannel(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getUserChannel: any }>(`query getUserChannel($pageNumber: Float!, $userId: String!) { getUserChannel(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetSearchedItem(variables: { searchKey: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getSearchedItem: any }>(`query getSearchedItem($searchKey: String!, $pageNumber: Float!) { getSearchedItem(searchKey: $searchKey, pageNumber: $pageNumber) }`, variables, options)
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
    queryGetSearchedclassified(variables: { searchKey: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getSearchedclassified: any }>(`query getSearchedclassified($searchKey: String!, $pageNumber: Float!) { getSearchedclassified(searchKey: $searchKey, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetByClassifiedFeedId(variables: { userId: string, classifiedFeedId: string }, options: QueryOptions = {}) {
      return self.query<{ getByClassifiedFeedId: any }>(`query getByClassifiedFeedId($userId: String!, $classifiedFeedId: String!) { getByClassifiedFeedId(userId: $userId, ClassifiedFeedId: $classifiedFeedId) }`, variables, options)
    },
    queryGetAllSaved(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllSaved: any }>(`query getAllSaved { getAllSaved }`, variables, options)
    },
    queryGetAllSavedByPage(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedByPage: any }>(`query getAllSavedByPage($pageNumber: Float!) { getAllSavedByPage(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllSavedClassified(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedClassified: any }>(`query getAllSavedClassified { getAllSavedClassified }`, variables, options)
    },
    queryGetAllSavedByUserIdpageNumber(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedByUserIdpageNumber: any }>(`query getAllSavedByUserIdpageNumber($pageNumber: Float!, $userId: String!) { getAllSavedByUserIdpageNumber(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetAllSavedByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedByUserId: any }>(`query getAllSavedByUserId($userId: String!) { getAllSavedByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllSavedByType(variables: { pageNumber: number, savedType: string }, options: QueryOptions = {}) {
      return self.query<{ getAllSavedByType: any }>(`query getAllSavedByType($pageNumber: Float!, $savedType: String!) { getAllSavedByType(pageNumber: $pageNumber, savedType: $savedType) }`, variables, options)
    },
    queryGetAllHomePagesByPageNumber(variables: { userId: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllHomePagesByPageNumber: any }>(`query getAllHomePagesByPageNumber($userId: String!, $pageNumber: Float!) { getAllHomePagesByPageNumber(userId: $userId, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllHomePagesByPage(variables: { pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getAllHomePagesByPage: any }>(`query getAllHomePagesByPage($pageNumber: Float!) { getAllHomePagesByPage(pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetAllHomePagess(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllHomePagess: any }>(`query getAllHomePagess { getAllHomePagess }`, variables, options)
    },
    queryGetHomePagesByUserId(variables: { pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getHomePagesByUserId: any }>(`query getHomePagesByUserId($pageNumber: Float!, $userId: String!) { getHomePagesByUserId(pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetHomePagesByUsersId(variables: { callerId?: (string | null), pageNumber: number, userId: string }, options: QueryOptions = {}) {
      return self.query<{ getHomePagesByUsersId: any }>(`query getHomePagesByUsersId($callerId: String, $pageNumber: Float!, $userId: String!) { getHomePagesByUsersId(callerId: $callerId, pageNumber: $pageNumber, userId: $userId) }`, variables, options)
    },
    queryGetCommentByHomePageId(variables: { pageNumber: number, homePageId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentByHomePageId: any }>(`query getCommentByHomePageId($pageNumber: Float!, $homePageId: String!) { getCommentByHomePageId(pageNumber: $pageNumber, HomePageId: $homePageId) }`, variables, options)
    },
    queryGetCommentsByHomePageId(variables: { homePageId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByHomePageId: any }>(`query getCommentsByHomePageId($homePageId: String!) { getCommentsByHomePageId(HomePageId: $homePageId) }`, variables, options)
    },
    queryGetSearchedHomePages(variables: { searchKey: string, pageNumber: number }, options: QueryOptions = {}) {
      return self.query<{ getSearchedHomePages: any }>(`query getSearchedHomePages($searchKey: String!, $pageNumber: Float!) { getSearchedHomePages(searchKey: $searchKey, pageNumber: $pageNumber) }`, variables, options)
    },
    queryGetlikeshomeByUserId(variables: { homePageIdarrayIds?: InputHomePageIdArray[], userId: string }, options: QueryOptions = {}) {
      return self.query<{ getlikeshomeByUserId: any }>(`query getlikeshomeByUserId($homePageIdarrayIds: [InputHomePageIdArray!], $userId: String!) { getlikeshomeByUserId(HomePageIdarrayIds: $homePageIdarrayIds, userId: $userId) }`, variables, options)
    },
    queryGetuserLikesonhome(variables: { homePageId: string }, options: QueryOptions = {}) {
      return self.query<{ getuserLikesonhome: any }>(`query getuserLikesonhome($homePageId: String!) { getuserLikesonhome(HomePageId: $homePageId) }`, variables, options)
    },
    queryGetByHomePageId(variables: { homePageId: string }, options: QueryOptions = {}) {
      return self.query<{ getByHomePageId: any }>(`query getByHomePageId($homePageId: String!) { getByHomePageId(HomePageId: $homePageId) }`, variables, options)
    },
    queryGetLikesOnHomeFeedByuser(variables: { userId: string, homePageId: string }, options: QueryOptions = {}) {
      return self.query<{ getLikesOnHomeFeedByuser: any }>(`query getLikesOnHomeFeedByuser($userId: String!, $homePageId: String!) { getLikesOnHomeFeedByuser(userId: $userId, HomePageId: $homePageId) }`, variables, options)
    },
    queryGetByvideoId(variables: { videoId: string }, options: QueryOptions = {}) {
      return self.query<{ getByvideoId: any }>(`query getByvideoId($videoId: String!) { getByvideoId(videoId: $videoId) }`, variables, options)
    },
    queryGetlikesVideoByUserId(variables: { videoLikearrayIds: InputVideoLikeArray[], userId: string }, options: QueryOptions = {}) {
      return self.query<{ getlikesVideoByUserId: any }>(`query getlikesVideoByUserId($videoLikearrayIds: [InputVideoLikeArray!]!, $userId: String!) { getlikesVideoByUserId(VideoLikearrayIds: $videoLikearrayIds, userId: $userId) }`, variables, options)
    },
    queryGetLikesonVideobyuser(variables: { userId: string, videoId: string }, options: QueryOptions = {}) {
      return self.query<{ getLikesonVideobyuser: any }>(`query getLikesonVideobyuser($userId: String!, $videoId: String!) { getLikesonVideobyuser(userId: $userId, videoId: $videoId) }`, variables, options)
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
    queryGetVideoPlaylistByPlaylistId(variables: { playlistId: string }, options: QueryOptions = {}) {
      return self.query<{ getVideoPlaylistByPlaylistId: any }>(`query getVideoPlaylistByPlaylistId($playlistId: String!) { getVideoPlaylistByPlaylistId(playlistId: $playlistId) }`, variables, options)
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
    queryGetfollowingByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getfollowingByUserId: any }>(`query getfollowingByUserId($userId: String!) { getfollowingByUserId(userId: $userId) }`, variables, options)
    },
    queryGetfollowerByFollowId(variables: { followId: string }, options: QueryOptions = {}) {
      return self.query<{ getfollowerByFollowId: any }>(`query getfollowerByFollowId($followId: String!) { getfollowerByFollowId(followId: $followId) }`, variables, options)
    },
    queryGetratingOnUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getratingOnUserId: any }>(`query getratingOnUserId($userId: String!) { getratingOnUserId(userId: $userId) }`, variables, options)
    },
    queryCheckUserRating(variables: { ratinguserId: string, userId: string }, options: QueryOptions = {}) {
      return self.query<{ checkUserRating: any }>(`query checkUserRating($ratinguserId: String!, $userId: String!) { checkUserRating(ratinguserId: $ratinguserId, userId: $userId) }`, variables, options)
    },
    queryGetratingByratingId(variables: { ratinguserId: string }, options: QueryOptions = {}) {
      return self.query<{ getratingByratingId: any }>(`query getratingByratingId($ratinguserId: String!) { getratingByratingId(ratinguserId: $ratinguserId) }`, variables, options)
    },
    queryGetNotification(variables: { reciverId: string }, options: QueryOptions = {}) {
      return self.query<{ getNotification: any }>(`query getNotification($reciverId: String!) { getNotification(reciverId: $reciverId) }`, variables, options)
    },
    mutateCreateUser(variables: { description?: (string | null), type: string, isSocialLogin: boolean, picture?: (string | null), lastName: string, firstName: string, socialId?: (string | null), password: string, email: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUser: UserModelType}>(`mutation createUser($description: String, $type: String!, $isSocialLogin: Boolean!, $picture: String, $lastName: String!, $firstName: String!, $socialId: String, $password: String!, $email: String!, $name: String!) { createUser(description: $description, type: $type, isSocialLogin: $isSocialLogin, picture: $picture, last_name: $lastName, first_name: $firstName, socialId: $socialId, password: $password, email: $email, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateAddNotificationToken(variables: { userId: string, notificationToken: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addNotificationToken: UserModelType}>(`mutation addNotificationToken($userId: String!, $notificationToken: String!) { addNotificationToken(userId: $userId, notificationToken: $notificationToken) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSetNotificationStatus(variables: { notificationStatus: boolean, userId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ setNotificationStatus: UserModelType}>(`mutation setNotificationStatus($notificationStatus: Boolean!, $userId: String!) { setNotificationStatus(notificationStatus: $notificationStatus, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdatePassword(variables: { userId: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ updatePassword: any }>(`mutation updatePassword($userId: String!, $password: String!) { updatePassword(userId: $userId, password: $password) }`, variables, optimisticUpdate)
    },
    mutateStoreDeviceId(variables: { deviceId: string, userId: string }, resultSelector: string | ((qb: SigninUserModelSelector) => SigninUserModelSelector) = signinUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ storeDeviceId: SigninUserModelType}>(`mutation storeDeviceId($deviceId: String!, $userId: String!) { storeDeviceId(deviceId: $deviceId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SigninUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGetBlockedUser(variables: { deviceId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getBlockedUser: any }>(`mutation getBlockedUser($deviceId: String!, $userId: String!) { getBlockedUser(deviceId: $deviceId, userId: $userId) }`, variables, optimisticUpdate)
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
    mutateVerifyToken(variables: { token: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ verifyToken: any }>(`mutation verifyToken($token: String!) { verifyToken(token: $token) }`, variables, optimisticUpdate)
    },
    mutateGetUserById(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getUserById: any }>(`mutation getUserById($userId: String!) { getUserById(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateUser(variables: { user: InputUser, userId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUser: UserModelType}>(`mutation updateUser($user: InputUser!, $userId: String!) { updateUser(user: $user, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateAverageRating(variables: { averageRating: number, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ updateAverageRating: any }>(`mutation updateAverageRating($averageRating: Float!, $userId: String!) { updateAverageRating(averageRating: $averageRating, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateSendOtpOnEmailByEmail(variables: { email: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sendOtpOnEmailByEmail: any }>(`mutation sendOtpOnEmailByEmail($email: String!) { sendOtpOnEmailByEmail(email: $email) }`, variables, optimisticUpdate)
    },
    mutateVerifyEmailByEmail(variables: { password: string, email: string, otp: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ verifyEmailByEmail: any }>(`mutation verifyEmailByEmail($password: String!, $email: String!, $otp: String!) { verifyEmailByEmail(password: $password, email: $email, Otp: $otp) }`, variables, optimisticUpdate)
    },
    mutateGenerateOTP(variables: { email: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ generateOTP: any }>(`mutation generateOTP($email: String!) { generateOTP(email: $email) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteStatus(variables: { pageNumber: number, status: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteStatus: any }>(`mutation UpdateDeleteStatus($pageNumber: Float!, $status: String!, $userId: String!) { UpdateDeleteStatus(pageNumber: $pageNumber, status: $status, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateStoreBlockedUser(variables: { deviceId: string, userId: string }, resultSelector: string | ((qb: SigninUserModelSelector) => SigninUserModelSelector) = signinUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ storeBlockedUser: SigninUserModelType}>(`mutation storeBlockedUser($deviceId: String!, $userId: String!) { storeBlockedUser(deviceId: $deviceId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SigninUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateStoreLegalities(variables: { legalitiesData: string }, resultSelector: string | ((qb: LegalitiesModelSelector) => LegalitiesModelSelector) = legalitiesModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ StoreLegalities: LegalitiesModelType}>(`mutation StoreLegalities($legalitiesData: String!) { StoreLegalities(LegalitiesData: $legalitiesData) {
        ${typeof resultSelector === "function" ? resultSelector(new LegalitiesModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateLegalInfo(variables: { legalitiesdata: InputInfo }, optimisticUpdate?: () => void) {
      return self.mutate<{ updateLegalInfo: any }>(`mutation updateLegalInfo($legalitiesdata: InputInfo!) { updateLegalInfo(Legalitiesdata: $legalitiesdata) }`, variables, optimisticUpdate)
    },
    mutateCreateUserTopic(variables: { title?: (string | null), attachmentUrl?: (string | null), attachmentType?: (string | null), topicContent: string, commentId?: (string | null), userId: string }, resultSelector: string | ((qb: TopicDetailModelSelector) => TopicDetailModelSelector) = topicDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserTopic: TopicDetailModelType}>(`mutation createUserTopic($title: String, $attachmentUrl: String, $attachmentType: String, $topicContent: String!, $commentId: String, $userId: String!) { createUserTopic(title: $title, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, topicContent: $topicContent, commentId: $commentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new TopicDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGetTopicByUser(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getTopicByUser: any }>(`mutation getTopicByUser($userId: String!) { getTopicByUser(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetTopicByTopicId(variables: { topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getTopicByTopicId: any }>(`mutation getTopicByTopicId($topicId: String!) { getTopicByTopicId(TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateGetTopicById(variables: { callerId?: (string | null), topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getTopicById: any }>(`mutation getTopicById($callerId: String, $topicId: String!) { getTopicById(callerId: $callerId, TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteTopicId(variables: { pageNumber: number, topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteTopicId: any }>(`mutation UpdateDeleteTopicId($pageNumber: Float!, $topicId: String!) { UpdateDeleteTopicId(pageNumber: $pageNumber, TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateDeleteDetailTopicId(variables: { topicId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ DeleteDetailTopicId: any }>(`mutation DeleteDetailTopicId($topicId: String!) { DeleteDetailTopicId(TopicId: $topicId) }`, variables, optimisticUpdate)
    },
    mutateUpdateLikeViews(variables: { status: string, videoIds: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateLikeViews: any }>(`mutation UpdateLikeViews($status: String!, $videoIds: String!, $userId: String!) { UpdateLikeViews(status: $status, videoIds: $videoIds, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdateUserTopic(variables: { usersTopicDetail: InputTopic, topicId: string }, resultSelector: string | ((qb: TopicDetailModelSelector) => TopicDetailModelSelector) = topicDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUserTopic: TopicDetailModelType}>(`mutation updateUserTopic($usersTopicDetail: InputTopic!, $topicId: String!) { updateUserTopic(UsersTopicDetail: $usersTopicDetail, TopicId: $topicId) {
        ${typeof resultSelector === "function" ? resultSelector(new TopicDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLikeDislikeTopic(variables: { status: string, topicId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ likeDislikeTopic: any }>(`mutation likeDislikeTopic($status: String!, $topicId: String!, $userId: String!) { likeDislikeTopic(status: $status, TopicId: $topicId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateCreateStory(variables: { attachmentUrl: string, attachmentType: string, thumbnailUrl?: (string | null), userId: string }, resultSelector: string | ((qb: StoryViewerUserModelSelector) => StoryViewerUserModelSelector) = storyViewerUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createStory: StoryViewerUserModelType}>(`mutation createStory($attachmentUrl: String!, $attachmentType: String!, $thumbnailUrl: String, $userId: String!) { createStory(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, thumbnailUrl: $thumbnailUrl, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new StoryViewerUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteStory(variables: { attachmentUrl: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteStory: any }>(`mutation deleteStory($attachmentUrl: String!) { deleteStory(attachmentUrl: $attachmentUrl) }`, variables, optimisticUpdate)
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
    mutateGetUploadVideoByPlaylistId(variables: { vedioPlaylistId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getUploadVideoByPlaylistId: any }>(`mutation getUploadVideoByPlaylistId($vedioPlaylistId: String!) { getUploadVideoByPlaylistId(vedioPlaylistId: $vedioPlaylistId) }`, variables, optimisticUpdate)
    },
    mutateGetVideoByVideoId(variables: { callerId?: (string | null), videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getVideoByVideoId: any }>(`mutation getVideoByVideoId($callerId: String, $videoId: String!) { getVideoByVideoId(callerId: $callerId, videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateGetVideoByPlaylistId(variables: { callerId?: (string | null), vedioPlaylistId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getVideoByPlaylistId: any }>(`mutation getVideoByPlaylistId($callerId: String, $vedioPlaylistId: String!) { getVideoByPlaylistId(callerId: $callerId, vedioPlaylistId: $vedioPlaylistId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteVideoId(variables: { pageNumber: number, videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteVideoId: any }>(`mutation UpdateDeleteVideoId($pageNumber: Float!, $videoId: String!) { UpdateDeleteVideoId(pageNumber: $pageNumber, videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateDeleteDetailVideoId(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ DeleteDetailVideoId: any }>(`mutation DeleteDetailVideoId($videoId: String!) { DeleteDetailVideoId(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoViews(variables: { videoId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateVideoViews: any }>(`mutation UpdateVideoViews($videoId: String!, $userId: String!) { UpdateVideoViews(videoId: $videoId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUpdatePlaylistIdVideoId(variables: { playlistId: string, videoIds: InputVideoUploadPlaylist[] }, optimisticUpdate?: () => void) {
      return self.mutate<{ updatePlaylistIdVideoId: any }>(`mutation updatePlaylistIdVideoId($playlistId: String!, $videoIds: [InputVideoUploadPlaylist!]!) { updatePlaylistIdVideoId(playlistId: $playlistId, videoIds: $videoIds) }`, variables, optimisticUpdate)
    },
    mutateUpdateUserVideo(variables: { userVideos: InputVideo, videoId: string }, resultSelector: string | ((qb: VideoUploadModelSelector) => VideoUploadModelSelector) = videoUploadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUserVideo: VideoUploadModelType}>(`mutation updateUserVideo($userVideos: InputVideo!, $videoId: String!) { updateUserVideo(UserVideos: $userVideos, videoId: $videoId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoUploadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateClassifiedDetail(variables: { condition: string, title?: (string | null), prize?: (string | null), attachmentUrl?: (string | null), attachmentType?: (string | null), classifiedDetail?: (string | null), reviewDetailId?: (string | null), userId: string }, resultSelector: string | ((qb: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) = classifiedFeedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createClassifiedDetail: ClassifiedFeedModelType}>(`mutation createClassifiedDetail($condition: String!, $title: String, $prize: String, $attachmentUrl: String, $attachmentType: String, $classifiedDetail: String, $reviewDetailId: String, $userId: String!) { createClassifiedDetail(condition: $condition, title: $title, prize: $prize, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, classifiedDetail: $classifiedDetail, reviewDetailId: $reviewDetailId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassifiedFeedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGetClassifiedByUserId(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getClassifiedByUserId: any }>(`mutation getClassifiedByUserId($userId: String!) { getClassifiedByUserId(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetClassifiedById(variables: { classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getClassifiedById: any }>(`mutation getClassifiedById($classifiedId: String!) { getClassifiedById(classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteClassifiedId(variables: { pageNumber: number, classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteClassifiedId: any }>(`mutation UpdateDeleteClassifiedId($pageNumber: Float!, $classifiedId: String!) { UpdateDeleteClassifiedId(pageNumber: $pageNumber, classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateDeleteDetailClassifiedId(variables: { classifiedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ DeleteDetailClassifiedId: any }>(`mutation DeleteDetailClassifiedId($classifiedId: String!) { DeleteDetailClassifiedId(classifiedId: $classifiedId) }`, variables, optimisticUpdate)
    },
    mutateUpdateUserClassified(variables: { classifiedFeed: InputClassified, classifiedId: string }, resultSelector: string | ((qb: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) = classifiedFeedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUserClassified: ClassifiedFeedModelType}>(`mutation updateUserClassified($classifiedFeed: InputClassified!, $classifiedId: String!) { updateUserClassified(ClassifiedFeed: $classifiedFeed, classifiedId: $classifiedId) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassifiedFeedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSaveLikedClassifiedFeed(variables: { classifiedFeedId: string, userId: string }, resultSelector: string | ((qb: SaveClassifiedModelSelector) => SaveClassifiedModelSelector) = saveClassifiedModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveLikedClassifiedFeed: SaveClassifiedModelType}>(`mutation saveLikedClassifiedFeed($classifiedFeedId: String!, $userId: String!) { saveLikedClassifiedFeed(ClassifiedFeedId: $classifiedFeedId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SaveClassifiedModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletesavedclassified(variables: { userId: string, classifiedsavedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletesavedclassified: any }>(`mutation UpdateDeletesavedclassified($userId: String!, $classifiedsavedId: String!) { UpdateDeletesavedclassified(userId: $userId, classifiedsavedId: $classifiedsavedId) }`, variables, optimisticUpdate)
    },
    mutateDeleteClassfied(variables: { classifiedFeedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteClassfied: boolean }>(`mutation deleteClassfied($classifiedFeedId: String!) { deleteClassfied(ClassifiedFeedId: $classifiedFeedId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserHomePages(variables: { discription?: (string | null), attachmentUrl?: (string | null), attachmentType?: (string | null), commentId?: (string | null), userId: string }, resultSelector: string | ((qb: HomePageDetailModelSelector) => HomePageDetailModelSelector) = homePageDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserHomePages: HomePageDetailModelType}>(`mutation createUserHomePages($discription: String, $attachmentUrl: String, $attachmentType: String, $commentId: String, $userId: String!) { createUserHomePages(Discription: $discription, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, commentId: $commentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new HomePageDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGetHomePagesByUser(variables: { userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getHomePagesByUser: any }>(`mutation getHomePagesByUser($userId: String!) { getHomePagesByUser(userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateGetHomePagesByHomePageId(variables: { homePageId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getHomePagesByHomePageId: any }>(`mutation getHomePagesByHomePageId($homePageId: String!) { getHomePagesByHomePageId(HomePageId: $homePageId) }`, variables, optimisticUpdate)
    },
    mutateGetHomePagesById(variables: { callerId?: (string | null), homePageId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getHomePagesById: any }>(`mutation getHomePagesById($callerId: String, $homePageId: String!) { getHomePagesById(callerId: $callerId, HomePageId: $homePageId) }`, variables, optimisticUpdate)
    },
    mutateUpdateDeleteHomePageId(variables: { pageNumber: number, homePageId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeleteHomePageId: any }>(`mutation UpdateDeleteHomePageId($pageNumber: Float!, $homePageId: String!) { UpdateDeleteHomePageId(pageNumber: $pageNumber, HomePageId: $homePageId) }`, variables, optimisticUpdate)
    },
    mutateDeleteDetailHomePageId(variables: { homePageId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ DeleteDetailHomePageId: any }>(`mutation DeleteDetailHomePageId($homePageId: String!) { DeleteDetailHomePageId(HomePageId: $homePageId) }`, variables, optimisticUpdate)
    },
    mutateUpdateUserHomePages(variables: { usersHomePagesDetail: InputHomePage, homePageId: string }, resultSelector: string | ((qb: HomePageDetailModelSelector) => HomePageDetailModelSelector) = homePageDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUserHomePages: HomePageDetailModelType}>(`mutation updateUserHomePages($usersHomePagesDetail: InputHomePage!, $homePageId: String!) { updateUserHomePages(UsersHomePagesDetail: $usersHomePagesDetail, HomePageId: $homePageId) {
        ${typeof resultSelector === "function" ? resultSelector(new HomePageDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLikeDislikehome(variables: { status: string, homePageId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ likeDislikehome: any }>(`mutation likeDislikehome($status: String!, $homePageId: String!, $userId: String!) { likeDislikehome(status: $status, HomePageId: $homePageId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateSaveLikedVideo(variables: { videoId: string, userId: string }, resultSelector: string | ((qb: SaveVideoModelSelector) => SaveVideoModelSelector) = saveVideoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveLikedVideo: SaveVideoModelType}>(`mutation saveLikedVideo($videoId: String!, $userId: String!) { saveLikedVideo(videoId: $videoId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SaveVideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDeletesavedVideo(variables: { userId: string, videosavedId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateDeletesavedVideo: any }>(`mutation UpdateDeletesavedVideo($userId: String!, $videosavedId: String!) { UpdateDeletesavedVideo(userId: $userId, VideosavedId: $videosavedId) }`, variables, optimisticUpdate)
    },
    mutateDeleteVideo(variables: { videoId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteVideo: boolean }>(`mutation deleteVideo($videoId: String!) { deleteVideo(videoId: $videoId) }`, variables, optimisticUpdate)
    },
    mutateLikeDislikeVideo(variables: { status: string, videoId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ likeDislikeVideo: any }>(`mutation likeDislikeVideo($status: String!, $videoId: String!, $userId: String!) { likeDislikeVideo(status: $status, videoId: $videoId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateUploadVideoPlaylist(variables: { playListName: string, videoUpload: InputVideoUploadPlaylist[], userId: string }, resultSelector: string | ((qb: VideoPlaylistModelSelector) => VideoPlaylistModelSelector) = videoPlaylistModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ uploadVideoPlaylist: VideoPlaylistModelType}>(`mutation uploadVideoPlaylist($playListName: String!, $videoUpload: [InputVideoUploadPlaylist!]!, $userId: String!) { uploadVideoPlaylist(playListName: $playListName, VideoUpload: $videoUpload, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoPlaylistModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoPlaylist(variables: { videoUploadId: InputVideoUploadPlaylist[], videoPlaylistId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateVideoPlaylist: any }>(`mutation UpdateVideoPlaylist($videoUploadId: [InputVideoUploadPlaylist!]!, $videoPlaylistId: String!) { UpdateVideoPlaylist(VideoUploadId: $videoUploadId, videoPlaylistId: $videoPlaylistId) }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoPlaylistbyVideoId(variables: { videoUploadId: InputVideoUploadPlaylist[], videoPlaylistId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateVideoPlaylistbyVideoId: any }>(`mutation UpdateVideoPlaylistbyVideoId($videoUploadId: [InputVideoUploadPlaylist!]!, $videoPlaylistId: String!) { UpdateVideoPlaylistbyVideoId(VideoUploadId: $videoUploadId, videoPlaylistId: $videoPlaylistId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnTopic(variables: { acttachmentType?: (string | null), acttachmentUrl?: (string | null), comment?: (string | null), topicId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnTopic: any }>(`mutation commentOnTopic($acttachmentType: String, $acttachmentUrl: String, $comment: String, $topicId: String!, $userId: String!) { commentOnTopic(acttachmentType: $acttachmentType, acttachmentUrl: $acttachmentUrl, comment: $comment, TopicId: $topicId, userId: $userId) }`, variables, optimisticUpdate)
    },
    mutateDeleteCommentbyCommentId(variables: { commentId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteCommentbyCommentId: boolean }>(`mutation deleteCommentbyCommentId($commentId: String!) { deleteCommentbyCommentId(commentId: $commentId) }`, variables, optimisticUpdate)
    },
    mutateFollowById(variables: { followId: string, userId: string }, resultSelector: string | ((qb: FollowUserModelSelector) => FollowUserModelSelector) = followUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ followById: FollowUserModelType}>(`mutation followById($followId: String!, $userId: String!) { followById(followId: $followId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new FollowUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateUserRating(variables: { ratingStar?: (number | null), ratinguserId: string, userId: string }, resultSelector: string | ((qb: UserRatingModelSelector) => UserRatingModelSelector) = userRatingModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUserRating: UserRatingModelType}>(`mutation createUserRating($ratingStar: Float, $ratinguserId: String!, $userId: String!) { createUserRating(ratingStar: $ratingStar, ratinguserId: $ratinguserId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRatingModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateRating(variables: { ratingStar: number, ratinguserId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ UpdateRating: any }>(`mutation UpdateRating($ratingStar: Float!, $ratinguserId: String!) { UpdateRating(ratingStar: $ratingStar, ratinguserId: $ratinguserId) }`, variables, optimisticUpdate)
    },
    mutateCreateChatRoom(variables: { membersId: InputUsers[], roomType?: (string | null), adminId: string }, resultSelector: string | ((qb: RoomChatModelSelector) => RoomChatModelSelector) = roomChatModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createChatRoom: RoomChatModelType}>(`mutation createChatRoom($membersId: [InputUsers!]!, $roomType: String, $adminId: String!) { createChatRoom(membersId: $membersId, roomType: $roomType, adminId: $adminId) {
        ${typeof resultSelector === "function" ? resultSelector(new RoomChatModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateUserMessage(variables: { notificationToken?: (string | null), notificationMessage?: (InputNotification | null), metaData?: (InputMetaData | null), membersId: InputUsers[], width?: (number | null), mimeType?: (string | null), text: string, previewData?: (string | null), uri?: (string | null), size?: (number | null), name?: (string | null), height?: (number | null), status?: (string | null), messageType?: (string | null), roomId: string, authorId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ createUserMessage: any }>(`mutation createUserMessage($notificationToken: String, $notificationMessage: InputNotification, $metaData: InputMetaData, $membersId: [InputUsers!]!, $width: Float, $mimeType: String, $text: String!, $previewData: String, $uri: String, $size: Float, $name: String, $height: Float, $status: String, $messageType: String, $roomId: String!, $authorId: String!) { createUserMessage(notificationToken: $notificationToken, notificationMessage: $notificationMessage, metaData: $metaData, membersId: $membersId, width: $width, mimeType: $mimeType, text: $text, previewData: $previewData, uri: $uri, size: $size, name: $name, height: $height, status: $status, messageType: $messageType, roomId: $roomId, authorId: $authorId) }`, variables, optimisticUpdate)
    },
    mutateCreateUserCall(variables: { notificationToken?: (string | null), notificationMessage?: (InputCallNotification | null), metaData?: (InputCallMetaData | null), membersId: InputUsers[], width?: (number | null), mimeType?: (string | null), text: string, previewData?: (string | null), uri?: (string | null), size?: (number | null), name?: (string | null), height?: (number | null), status?: (string | null), messageType?: (string | null), roomId: string, authorId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ createUserCall: any }>(`mutation createUserCall($notificationToken: String, $notificationMessage: InputCallNotification, $metaData: InputCallMetaData, $membersId: [InputUsers!]!, $width: Float, $mimeType: String, $text: String!, $previewData: String, $uri: String, $size: Float, $name: String, $height: Float, $status: String, $messageType: String, $roomId: String!, $authorId: String!) { createUserCall(notificationToken: $notificationToken, notificationMessage: $notificationMessage, metaData: $metaData, membersId: $membersId, width: $width, mimeType: $mimeType, text: $text, previewData: $previewData, uri: $uri, size: $size, name: $name, height: $height, status: $status, messageType: $messageType, roomId: $roomId, authorId: $authorId) }`, variables, optimisticUpdate)
    },
    mutateSendCallNotification(variables: { data?: (Inputdata | null), notificationToken: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sendCallNotification: any }>(`mutation sendCallNotification($data: Inputdata, $notificationToken: String!) { sendCallNotification(data: $data, notificationToken: $notificationToken) }`, variables, optimisticUpdate)
    },
    mutateAddOfferanswerInRoom(variables: { answer?: (string | null), offer?: (string | null), roomId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ addOfferanswerInRoom: any }>(`mutation addOfferanswerInRoom($answer: String, $offer: String, $roomId: String!) { addOfferanswerInRoom(answer: $answer, offer: $offer, roomId: $roomId) }`, variables, optimisticUpdate)
    },
    mutateGetchatByUserId(variables: { authorId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getchatByUserId: any }>(`mutation getchatByUserId($authorId: String!) { getchatByUserId(authorId: $authorId) }`, variables, optimisticUpdate)
    },
    mutateGetchatByRoomId(variables: { pageNumber: number, roomId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getchatByRoomId: any }>(`mutation getchatByRoomId($pageNumber: Float!, $roomId: String!) { getchatByRoomId(pageNumber: $pageNumber, roomId: $roomId) }`, variables, optimisticUpdate)
    },
    mutateGetcallByUserId(variables: { authorId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getcallByUserId: any }>(`mutation getcallByUserId($authorId: String!) { getcallByUserId(authorId: $authorId) }`, variables, optimisticUpdate)
    },
    mutateGetCallByRoomId(variables: { pageNumber: number, roomId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getCallByRoomId: any }>(`mutation getCallByRoomId($pageNumber: Float!, $roomId: String!) { getCallByRoomId(pageNumber: $pageNumber, roomId: $roomId) }`, variables, optimisticUpdate)
    },
    mutateGetroomByUserId(variables: { adminId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getroomByUserId: any }>(`mutation getroomByUserId($adminId: String!) { getroomByUserId(adminId: $adminId) }`, variables, optimisticUpdate)
    },
    mutateGetroomByroomId(variables: { roomId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getroomByroomId: any }>(`mutation getroomByroomId($roomId: String!) { getroomByroomId(roomId: $roomId) }`, variables, optimisticUpdate)
    },
    mutateGetroomByUsers(variables: { memberId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ getroomByUsers: any }>(`mutation getroomByUsers($memberId: String!) { getroomByUsers(memberId: $memberId) }`, variables, optimisticUpdate)
    },
    mutateGetroomBymembers(variables: { members: InputUsers[] }, optimisticUpdate?: () => void) {
      return self.mutate<{ getroomBymembers: any }>(`mutation getroomBymembers($members: [InputUsers!]!) { getroomBymembers(members: $members) }`, variables, optimisticUpdate)
    },
    mutateDeleteChatMessage(variables: { chatmessageId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteChatMessage: boolean }>(`mutation deleteChatMessage($chatmessageId: String!) { deleteChatMessage(chatmessageId: $chatmessageId) }`, variables, optimisticUpdate)
    },
    mutateDeleteChatRoom(variables: { roomId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteChatRoom: boolean }>(`mutation deleteChatRoom($roomId: String!) { deleteChatRoom(roomId: $roomId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnHomepage(variables: { acttachmentType?: (string | null), acttachmentUrl?: (string | null), comment?: (string | null), homePageId: string, userId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnHomepage: any }>(`mutation commentOnHomepage($acttachmentType: String, $acttachmentUrl: String, $comment: String, $homePageId: String!, $userId: String!) { commentOnHomepage(acttachmentType: $acttachmentType, acttachmentUrl: $acttachmentUrl, comment: $comment, HomePageId: $homePageId, userId: $userId) }`, variables, optimisticUpdate)
    },
    subscribeNewMessageadd(variables?: {  }, resultSelector: string | ((qb: RoomChatModelSelector) => RoomChatModelSelector) = roomChatModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ newMessageadd: RoomChatModelType}>(`subscription newMessageadd { newMessageadd {
        ${typeof resultSelector === "function" ? resultSelector(new RoomChatModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribeNewuserchat(variables: { userId: string }, resultSelector: string | ((qb: UsersChatModelSelector) => UsersChatModelSelector) = usersChatModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ newuserchat: UsersChatModelType}>(`subscription newuserchat($userId: String!) { newuserchat(userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new UsersChatModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
  })))
