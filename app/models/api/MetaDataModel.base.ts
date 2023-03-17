/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MetaDataBase
 * auto generated base class for the model MetaDataModel.
 */
export const MetaDataModelBase = ModelBase
  .named('MetaData')
  .props({
    __typename: types.optional(types.literal("MetaData"), "MetaData"),
    metaDataType: types.union(types.undefined, types.null, types.string),
    classifiedId: types.union(types.undefined, types.null, types.string),
    amount: types.union(types.undefined, types.null, types.string),
    currency: types.union(types.undefined, types.null, types.string),
    data: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MetaDataModelSelector extends QueryBuilder {
  get metaDataType() { return this.__attr(`metaDataType`) }
  get classifiedId() { return this.__attr(`classifiedId`) }
  get amount() { return this.__attr(`amount`) }
  get currency() { return this.__attr(`currency`) }
  get data() { return this.__attr(`data`) }
}
export function selectFromMetaData() {
  return new MetaDataModelSelector()
}

export const metaDataModelPrimitives = selectFromMetaData().metaDataType.classifiedId.amount.currency.data
