/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ReciverIdArrayModel, ReciverIdArrayModelType } from "./ReciverIdArrayModel"
import { ReciverIdArrayModelSelector } from "./ReciverIdArrayModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * FriendlistBase
 * auto generated base class for the model FriendlistModel.
 */
export const FriendlistModelBase = ModelBase
  .named('Friendlist')
  .props({
    __typename: types.optional(types.literal("friendlist"), "friendlist"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    requestReciver: types.union(types.undefined, types.null, types.array(types.late((): any => ReciverIdArrayModel))),
    requestStatus: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FriendlistModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get requestStatus() { return this.__attr(`requestStatus`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  requestReciver(builder: string | ReciverIdArrayModelSelector | ((selector: ReciverIdArrayModelSelector) => ReciverIdArrayModelSelector) | undefined) { return this.__child(`requestReciver`, ReciverIdArrayModelSelector, builder) }
}
export function selectFromFriendlist() {
  return new FriendlistModelSelector()
}

export const friendlistModelPrimitives = selectFromFriendlist()._id.createdAt.updatedAt.requestStatus
