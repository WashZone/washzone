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
import { SearchTopicsModel, SearchTopicsModelType } from "./SearchTopicsModel"
import { searchTopicsModelPrimitives, SearchTopicsModelSelector } from "./SearchTopicsModel.base"
import { TopicCommentModel, TopicCommentModelType } from "./TopicCommentModel"
import { topicCommentModelPrimitives, TopicCommentModelSelector } from "./TopicCommentModel.base"



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
queryGetAllpost="queryGetAllpost",
queryGetPostByUserId="queryGetPostByUserId",
queryGetAllComments="queryGetAllComments",
queryGetCommentsByUserId="queryGetCommentsByUserId",
queryGetCommentsByPostId="queryGetCommentsByPostId",
queryGetStoryByUserId="queryGetStoryByUserId",
queryGetAllStory="queryGetAllStory",
queryGetTopicByUserId="queryGetTopicByUserId"
}
export enum RootStoreBaseMutations {
mutateCreateUser="mutateCreateUser",
mutateSignin="mutateSignin",
mutateUpdateUser="mutateUpdateUser",
mutateSendEmailByUserId="mutateSendEmailByUserId",
mutateSaveUserPost="mutateSaveUserPost",
mutateUploadFile="mutateUploadFile",
mutateDeletePostByPostId="mutateDeletePostByPostId",
mutateCommentOnPost="mutateCommentOnPost",
mutateDeleteCommentbyCommentId="mutateDeleteCommentbyCommentId",
mutateCreateStory="mutateCreateStory",
mutateCreateTopic="mutateCreateTopic",
mutateCommentOnTopic="mutateCommentOnTopic"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['CommentsDetail', () => CommentsDetailModel], ['PostDetail', () => PostDetailModel], ['storyViewerUser', () => StoryViewerUserModel], ['searchTopics', () => SearchTopicsModel], ['TopicComment', () => TopicCommentModel]], [], "js"))
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
    queryGetAllpost(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllpost: any }>(`query getAllpost { getAllpost }`, variables, options)
    },
    queryGetPostByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getPostByUserId: any }>(`query getPostByUserId($userId: String!) { getPostByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllComments(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllComments: any }>(`query getAllComments { getAllComments }`, variables, options)
    },
    queryGetCommentsByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByUserId: any }>(`query getCommentsByUserId($userId: String!) { getCommentsByUserId(userId: $userId) }`, variables, options)
    },
    queryGetCommentsByPostId(variables: { postId: string }, options: QueryOptions = {}) {
      return self.query<{ getCommentsByPostId: any }>(`query getCommentsByPostId($postId: String!) { getCommentsByPostId(PostId: $postId) }`, variables, options)
    },
    queryGetStoryByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getStoryByUserId: any }>(`query getStoryByUserId($userId: String!) { getStoryByUserId(userId: $userId) }`, variables, options)
    },
    queryGetAllStory(variables?: {  }, options: QueryOptions = {}) {
      return self.query<{ getAllStory: any }>(`query getAllStory { getAllStory }`, variables, options)
    },
    queryGetTopicByUserId(variables: { userId: string }, options: QueryOptions = {}) {
      return self.query<{ getTopicByUserId: any }>(`query getTopicByUserId($userId: String!) { getTopicByUserId(userId: $userId) }`, variables, options)
    },
    mutateCreateUser(variables: { type: string, isSocialLogin: boolean, picture?: (string | null), lastName: string, firstName: string, socialId?: (string | null), password: string, email: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUser: UserModelType}>(`mutation createUser($type: String!, $isSocialLogin: Boolean!, $picture: String, $lastName: String!, $firstName: String!, $socialId: String, $password: String!, $email: String!, $name: String!) { createUser(type: $type, isSocialLogin: $isSocialLogin, picture: $picture, last_name: $lastName, first_name: $firstName, socialId: $socialId, password: $password, email: $email, name: $name) {
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
    mutateSaveUserPost(variables: { attachmentUrl: string, attachmentType: string, date: string, postContent: string, commentId?: (string | null), userId: string }, resultSelector: string | ((qb: PostDetailModelSelector) => PostDetailModelSelector) = postDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveUserPost: PostDetailModelType}>(`mutation saveUserPost($attachmentUrl: String!, $attachmentType: String!, $date: String!, $postContent: String!, $commentId: String, $userId: String!) { saveUserPost(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, date: $date, postContent: $postContent, commentId: $commentId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new PostDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUploadFile(variables: { uri: string, type: string, fileName: string }, resultSelector: string | ((qb: PostDetailModelSelector) => PostDetailModelSelector) = postDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ uploadFile: PostDetailModelType}>(`mutation uploadFile($uri: String!, $type: String!, $fileName: String!) { uploadFile(uri: $uri, type: $type, fileName: $fileName) {
        ${typeof resultSelector === "function" ? resultSelector(new PostDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeletePostByPostId(variables: { postId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deletePostByPostId: boolean }>(`mutation deletePostByPostId($postId: String!) { deletePostByPostId(postId: $postId) }`, variables, optimisticUpdate)
    },
    mutateCommentOnPost(variables: { date: string, comment: string, postId: string, userId: string }, resultSelector: string | ((qb: CommentsDetailModelSelector) => CommentsDetailModelSelector) = commentsDetailModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnPost: CommentsDetailModelType}>(`mutation commentOnPost($date: String!, $comment: String!, $postId: String!, $userId: String!) { commentOnPost(date: $date, comment: $comment, postId: $postId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentsDetailModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteCommentbyCommentId(variables: { commentId: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteCommentbyCommentId: boolean }>(`mutation deleteCommentbyCommentId($commentId: String!) { deleteCommentbyCommentId(commentId: $commentId) }`, variables, optimisticUpdate)
    },
    mutateCreateStory(variables: { attachmentUrl: string, attachmentType: string, date: string, thumbnailUrl: string, userId: string }, resultSelector: string | ((qb: StoryViewerUserModelSelector) => StoryViewerUserModelSelector) = storyViewerUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createStory: StoryViewerUserModelType}>(`mutation createStory($attachmentUrl: String!, $attachmentType: String!, $date: String!, $thumbnailUrl: String!, $userId: String!) { createStory(attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, date: $date, thumbnailUrl: $thumbnailUrl, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new StoryViewerUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateTopic(variables: { date: string, attachmentUrl: string, attachmentType: string, topicHeading: string, topicContent: string, thumbnailUrl: string, userId: string }, resultSelector: string | ((qb: SearchTopicsModelSelector) => SearchTopicsModelSelector) = searchTopicsModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createTopic: SearchTopicsModelType}>(`mutation createTopic($date: String!, $attachmentUrl: String!, $attachmentType: String!, $topicHeading: String!, $topicContent: String!, $thumbnailUrl: String!, $userId: String!) { createTopic(date: $date, attachmentUrl: $attachmentUrl, attachmentType: $attachmentType, topicHeading: $topicHeading, topicContent: $topicContent, thumbnailUrl: $thumbnailUrl, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new SearchTopicsModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCommentOnTopic(variables: { date: string, comment: string, topicId: string, userId: string }, resultSelector: string | ((qb: TopicCommentModelSelector) => TopicCommentModelSelector) = topicCommentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ commentOnTopic: TopicCommentModelType}>(`mutation commentOnTopic($date: String!, $comment: String!, $topicId: String!, $userId: String!) { commentOnTopic(date: $date, comment: $comment, topicId: $topicId, userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new TopicCommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
