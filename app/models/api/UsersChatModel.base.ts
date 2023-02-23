/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RoomChatModel, RoomChatModelType } from "./RoomChatModel"
import { RoomChatModelSelector } from "./RoomChatModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
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
  authorId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`authorId`, UserModelSelector, builder) }
  roomId(builder: string | RoomChatModelSelector | ((selector: RoomChatModelSelector) => RoomChatModelSelector) | undefined) { return this.__child(`roomId`, RoomChatModelSelector, builder) }
}
export function selectFromUsersChat() {
  return new UsersChatModelSelector()
}

export const usersChatModelPrimitives = selectFromUsersChat()._id.createdAt.updatedAt.messageType.status.height.name.size.uri.width.previewData.text.mimeType
