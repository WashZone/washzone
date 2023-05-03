/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * BlockUserBase
 * auto generated base class for the model BlockUserModel.
 */
export const BlockUserModelBase = ModelBase
  .named('BlockUser')
  .props({
    __typename: types.optional(types.literal("blockUser"), "blockUser"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    blockUserById: types.union(types.undefined, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class BlockUserModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  blockUserById(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`blockUserById`, UserModelSelector, builder) }
}
export function selectFromBlockUser() {
  return new BlockUserModelSelector()
}

export const blockUserModelPrimitives = selectFromBlockUser()._id.createdAt.updatedAt
