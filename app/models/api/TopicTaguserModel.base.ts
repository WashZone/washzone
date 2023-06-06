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
 * TopicTaguserBase
 * auto generated base class for the model TopicTaguserModel.
 */
export const TopicTaguserModelBase = ModelBase
  .named('TopicTaguser')
  .props({
    __typename: types.optional(types.literal("topicTaguser"), "topicTaguser"),
    tagTopicId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TopicTaguserModelSelector extends QueryBuilder {
  tagTopicId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`tagTopicId`, UserModelSelector, builder) }
}
export function selectFromTopicTaguser() {
  return new TopicTaguserModelSelector()
}

export const topicTaguserModelPrimitives = selectFromTopicTaguser()
