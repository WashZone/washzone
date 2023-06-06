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
 * UserTagListBase
 * auto generated base class for the model UserTagListModel.
 */
export const UserTagListModelBase = ModelBase
  .named('UserTagList')
  .props({
    __typename: types.optional(types.literal("UserTagList"), "UserTagList"),
    tagId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserTagListModelSelector extends QueryBuilder {
  tagId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`tagId`, UserModelSelector, builder) }
}
export function selectFromUserTagList() {
  return new UserTagListModelSelector()
}

export const userTagListModelPrimitives = selectFromUserTagList()
