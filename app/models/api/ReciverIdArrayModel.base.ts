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
 * ReciverIdArrayBase
 * auto generated base class for the model ReciverIdArrayModel.
 */
export const ReciverIdArrayModelBase = ModelBase
  .named('ReciverIdArray')
  .props({
    __typename: types.optional(types.literal("reciverIdArray"), "reciverIdArray"),
    reciverId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReciverIdArrayModelSelector extends QueryBuilder {
  reciverId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`reciverId`, UserModelSelector, builder) }
}
export function selectFromReciverIdArray() {
  return new ReciverIdArrayModelSelector()
}

export const reciverIdArrayModelPrimitives = selectFromReciverIdArray()
