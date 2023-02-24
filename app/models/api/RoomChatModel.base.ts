/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { UsersChatModel, UsersChatModelType } from "./UsersChatModel"
import { UsersChatModelSelector } from "./UsersChatModel.base"
import { UsersModel, UsersModelType } from "./UsersModel"
import { UsersModelSelector } from "./UsersModel.base"
import { RootStoreType } from "./index"


/**
 * RoomChatBase
 * auto generated base class for the model RoomChatModel.
 */
export const RoomChatModelBase = ModelBase
  .named('RoomChat')
  .props({
    __typename: types.optional(types.literal("roomChat"), "roomChat"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    membersId: types.union(types.undefined, types.null, types.array(types.late((): any => UsersModel))),
    roomType: types.union(types.undefined, types.null, types.string),
    adminId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    latestMessage: types.union(types.undefined, types.null, types.late((): any => UsersChatModel)),
    chatId: types.union(types.undefined, types.null, types.late((): any => UsersChatModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RoomChatModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get roomType() { return this.__attr(`roomType`) }
  membersId(builder: string | UsersModelSelector | ((selector: UsersModelSelector) => UsersModelSelector) | undefined) { return this.__child(`membersId`, UsersModelSelector, builder) }
  adminId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`adminId`, UserModelSelector, builder) }
  latestMessage(builder: string | UsersChatModelSelector | ((selector: UsersChatModelSelector) => UsersChatModelSelector) | undefined) { return this.__child(`latestMessage`, UsersChatModelSelector, builder) }
  chatId(builder: string | UsersChatModelSelector | ((selector: UsersChatModelSelector) => UsersChatModelSelector) | undefined) { return this.__child(`chatId`, UsersChatModelSelector, builder) }
}
export function selectFromRoomChat() {
  return new RoomChatModelSelector()
}

export const roomChatModelPrimitives = selectFromRoomChat()._id.createdAt.updatedAt.roomType
