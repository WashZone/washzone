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
 * TopicCommentTagBase
 * auto generated base class for the model TopicCommentTagModel.
 */
export const TopicCommentTagModelBase = ModelBase
  .named('TopicCommentTag')
  .props({
    __typename: types.optional(types.literal("topicCommentTag"), "topicCommentTag"),
    topicTagCommentId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TopicCommentTagModelSelector extends QueryBuilder {
  topicTagCommentId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`topicTagCommentId`, UserModelSelector, builder) }
}
export function selectFromTopicCommentTag() {
  return new TopicCommentTagModelSelector()
}

export const topicCommentTagModelPrimitives = selectFromTopicCommentTag()
