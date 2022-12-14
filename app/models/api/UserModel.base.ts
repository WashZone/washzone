/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
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
    userId: types.union(types.undefined, types.null, types.string),
    first_name: types.union(types.undefined, types.null, types.string),
    last_name: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    socialId: types.union(types.undefined, types.null, types.string),
    password: types.union(types.undefined, types.null, types.string),
    picture: types.union(types.undefined, types.null, types.string),
    isSocialLogin: types.union(types.undefined, types.null, types.boolean),
    type: types.union(types.undefined, types.null, types.string),
    token: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
    role: types.union(types.undefined, types.null, types.string),
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
  get userId() { return this.__attr(`userId`) }
  get first_name() { return this.__attr(`first_name`) }
  get last_name() { return this.__attr(`last_name`) }
  get name() { return this.__attr(`name`) }
  get email() { return this.__attr(`email`) }
  get socialId() { return this.__attr(`socialId`) }
  get password() { return this.__attr(`password`) }
  get picture() { return this.__attr(`picture`) }
  get isSocialLogin() { return this.__attr(`isSocialLogin`) }
  get type() { return this.__attr(`type`) }
  get token() { return this.__attr(`token`) }
  get status() { return this.__attr(`status`) }
  get role() { return this.__attr(`role`) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser()._id.createdAt.updatedAt.userId.first_name.last_name.name.email.socialId.password.picture.isSocialLogin.type.token.status.role
