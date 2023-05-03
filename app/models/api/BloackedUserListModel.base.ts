/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * BloackedUserListBase
 * auto generated base class for the model BloackedUserListModel.
 */
export const BloackedUserListModelBase = ModelBase
  .named('BloackedUserList')
  .props({
    __typename: types.optional(types.literal("BloackedUserList"), "BloackedUserList"),
    blockUserById: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class BloackedUserListModelSelector extends QueryBuilder {
  get blockUserById() { return this.__attr(`blockUserById`) }
}
export function selectFromBloackedUserList() {
  return new BloackedUserListModelSelector()
}

export const bloackedUserListModelPrimitives = selectFromBloackedUserList().blockUserById
