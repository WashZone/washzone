/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { RootStoreType } from "./index"


/**
 * TopicIdArrayBase
 * auto generated base class for the model TopicIdArrayModel.
 */
export const TopicIdArrayModelBase = ModelBase
  .named('TopicIdArray')
  .props({
    __typename: types.optional(types.literal("TopicIdArray"), "TopicIdArray"),
    TopicId: types.union(types.undefined, types.null, types.late((): any => TopicDetailModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TopicIdArrayModelSelector extends QueryBuilder {
  TopicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`TopicId`, TopicDetailModelSelector, builder) }
}
export function selectFromTopicIdArray() {
  return new TopicIdArrayModelSelector()
}

export const topicIdArrayModelPrimitives = selectFromTopicIdArray()
