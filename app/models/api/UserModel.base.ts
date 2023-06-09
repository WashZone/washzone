/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { BloackedUserListModel, BloackedUserListModelType } from "./BloackedUserListModel"
import { BloackedUserListModelSelector } from "./BloackedUserListModel.base"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { UserRatingModel, UserRatingModelType } from "./UserRatingModel"
import { UserRatingModelSelector } from "./UserRatingModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { VideoUploadModelSelector } from "./VideoUploadModel.base"
import { RootStoreType } from "./index"


/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    ratingId: types.union(types.undefined, types.null, types.late((): any => UserRatingModel)),
    topicId: types.union(types.undefined, types.null, types.late((): any => TopicDetailModel)),
    classifiedId: types.union(types.undefined, types.null, types.late((): any => ClassifiedFeedModel)),
    videoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
    first_name: types.union(types.undefined, types.null, types.string),
    last_name: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    username: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    socialId: types.union(types.undefined, types.null, types.string),
    password: types.union(types.undefined, types.null, types.string),
    picture: types.union(types.undefined, types.null, types.string),
    isSocialLogin: types.union(types.undefined, types.null, types.boolean),
    type: types.union(types.undefined, types.null, types.string),
    token: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
    role: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    averageRating: types.union(types.undefined, types.null, types.number),
    reportCount: types.union(types.undefined, types.null, types.number),
    follower: types.union(types.undefined, types.null, types.number),
    following: types.union(types.undefined, types.null, types.number),
    postCount: types.union(types.undefined, types.null, types.number),
    notificationToken: types.union(types.undefined, types.null, types.string),
    banner: types.union(types.undefined, types.null, types.string),
    notificationStatus: types.union(types.undefined, types.null, types.boolean),
    blueTick: types.union(types.undefined, types.null, types.boolean),
    blockedUser: types.union(types.undefined, types.null, types.array(types.late((): any => BloackedUserListModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get first_name() { return this.__attr(`first_name`) }
  get last_name() { return this.__attr(`last_name`) }
  get name() { return this.__attr(`name`) }
  get username() { return this.__attr(`username`) }
  get email() { return this.__attr(`email`) }
  get socialId() { return this.__attr(`socialId`) }
  get password() { return this.__attr(`password`) }
  get picture() { return this.__attr(`picture`) }
  get isSocialLogin() { return this.__attr(`isSocialLogin`) }
  get type() { return this.__attr(`type`) }
  get token() { return this.__attr(`token`) }
  get status() { return this.__attr(`status`) }
  get role() { return this.__attr(`role`) }
  get description() { return this.__attr(`description`) }
  get averageRating() { return this.__attr(`averageRating`) }
  get reportCount() { return this.__attr(`reportCount`) }
  get follower() { return this.__attr(`follower`) }
  get following() { return this.__attr(`following`) }
  get postCount() { return this.__attr(`postCount`) }
  get notificationToken() { return this.__attr(`notificationToken`) }
  get banner() { return this.__attr(`banner`) }
  get notificationStatus() { return this.__attr(`notificationStatus`) }
  get blueTick() { return this.__attr(`blueTick`) }
  ratingId(builder: string | UserRatingModelSelector | ((selector: UserRatingModelSelector) => UserRatingModelSelector) | undefined) { return this.__child(`ratingId`, UserRatingModelSelector, builder) }
  topicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`topicId`, TopicDetailModelSelector, builder) }
  classifiedId(builder: string | ClassifiedFeedModelSelector | ((selector: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) | undefined) { return this.__child(`classifiedId`, ClassifiedFeedModelSelector, builder) }
  videoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`videoId`, VideoUploadModelSelector, builder) }
  blockedUser(builder: string | BloackedUserListModelSelector | ((selector: BloackedUserListModelSelector) => BloackedUserListModelSelector) | undefined) { return this.__child(`blockedUser`, BloackedUserListModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser()._id.createdAt.updatedAt.first_name.last_name.name.username.email.socialId.password.picture.isSocialLogin.type.token.status.role.description.averageRating.reportCount.follower.following.postCount.notificationToken.banner.notificationStatus.blueTick
