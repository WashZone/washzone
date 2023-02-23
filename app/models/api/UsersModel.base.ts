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
 * UsersBase
 * auto generated base class for the model UsersModel.
 */
export const UsersModelBase = ModelBase
  .named('Users')
  .props({
    __typename: types.optional(types.literal("Users"), "Users"),
    userId1: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UsersModelSelector extends QueryBuilder {
  userId1(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId1`, UserModelSelector, builder) }
}
export function selectFromUsers() {
  return new UsersModelSelector()
}

export const usersModelPrimitives = selectFromUsers()
