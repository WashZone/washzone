/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SigninUserBase
 * auto generated base class for the model SigninUserModel.
 */
export const SigninUserModelBase = ModelBase
  .named('SigninUser')
  .props({
    __typename: types.optional(types.literal("SigninUser"), "SigninUser"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.string),
    deviceId: types.union(types.undefined, types.null, types.array(types.string)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SigninUserModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get userId() { return this.__attr(`userId`) }
  get deviceId() { return this.__attr(`deviceId`) }
}
export function selectFromSigninUser() {
  return new SigninUserModelSelector()
}

export const signinUserModelPrimitives = selectFromSigninUser()._id.createdAt.updatedAt.userId.deviceId
