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
 * HomeCommentTagListBase
 * auto generated base class for the model HomeCommentTagListModel.
 */
export const HomeCommentTagListModelBase = ModelBase
  .named('HomeCommentTagList')
  .props({
    __typename: types.optional(types.literal("homeCommentTagList"), "homeCommentTagList"),
    taghomecommentId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class HomeCommentTagListModelSelector extends QueryBuilder {
  taghomecommentId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`taghomecommentId`, UserModelSelector, builder) }
}
export function selectFromHomeCommentTagList() {
  return new HomeCommentTagListModelSelector()
}

export const homeCommentTagListModelPrimitives = selectFromHomeCommentTagList()
