/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MetaDataModel, MetaDataModelType } from "./MetaDataModel"
import { MetaDataModelSelector } from "./MetaDataModel.base"
import { NotificationModel, NotificationModelType } from "./NotificationModel"
import { NotificationModelSelector } from "./NotificationModel.base"
import { RoomChatModel, RoomChatModelType } from "./RoomChatModel"
import { RoomChatModelSelector } from "./RoomChatModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { RootStoreType } from "./index"


/**
 * UsersChatBase
 * auto generated base class for the model UsersChatModel.
 */
export const UsersChatModelBase = ModelBase
  .named('UsersChat')
  .props({
    __typename: types.optional(types.literal("usersChat"), "usersChat"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    authorId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    roomId: types.union(types.undefined, types.null, types.late((): any => RoomChatModel)),
    membersId: types.union(types.undefined, types.null, types.array(types.late((): any => UsersModel))),
    messageType: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
    height: types.union(types.undefined, types.null, types.number),
    name: types.union(types.undefined, types.null, types.string),
    size: types.union(types.undefined, types.null, types.number),
    uri: types.union(types.undefined, types.null, types.string),
    width: types.union(types.undefined, types.null, types.number),
    previewData: types.union(types.undefined, types.null, types.string),
    text: types.union(types.undefined, types.null, types.string),
    mimeType: types.union(types.undefined, types.null, types.string),
    notificationMessage: types.union(types.undefined, types.null, types.late((): any => NotificationModel)),
    notificationToken: types.union(types.undefined, types.null, types.string),
    metaData: types.union(types.undefined, types.null, types.late((): any => MetaDataModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersChatModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get messageType() { return this.__attr(`messageType`) }
  get status() { return this.__attr(`status`) }
  get height() { return this.__attr(`height`) }
  get name() { return this.__attr(`name`) }
  get size() { return this.__attr(`size`) }
  get uri() { return this.__attr(`uri`) }
  get width() { return this.__attr(`width`) }
  get previewData() { return this.__attr(`previewData`) }
  get text() { return this.__attr(`text`) }
  get mimeType() { return this.__attr(`mimeType`) }
  get notificationToken() { return this.__attr(`notificationToken`) }
  authorId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`authorId`, UserModelSelector, builder) }
  roomId(builder: string | RoomChatModelSelector | ((selector: RoomChatModelSelector) => RoomChatModelSelector) | undefined) { return this.__child(`roomId`, RoomChatModelSelector, builder) }
  membersId(builder: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector) | undefined) { return this.__child(`membersId`, UsersModelSelector, builder) }
  notificationMessage(builder: string | NotificationModelSelector | ((selector: NotificationModelSelector) => NotificationModelSelector) | undefined) { return this.__child(`notificationMessage`, NotificationModelSelector, builder) }
  metaData(builder: string | MetaDataModelSelector | ((selector: MetaDataModelSelector) => MetaDataModelSelector) | undefined) { return this.__child(`metaData`, MetaDataModelSelector, builder) }
}
export function selectFromUsersChat() {
  return new UsersChatModelSelector()
}

export const usersChatModelPrimitives = selectFromUsersChat()._id.createdAt.updatedAt.messageType.status.height.name.size.uri.width.previewData.text.mimeType.notificationToken
