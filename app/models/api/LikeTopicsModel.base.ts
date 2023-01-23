/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * LikeTopicsBase
 * auto generated base class for the model LikeTopicsModel.
 */
export const LikeTopicsModelBase = ModelBase
  .named('LikeTopics')
  .props({
    __typename: types.optional(types.literal("likeTopics"), "likeTopics"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    TopicId: types.union(types.undefined, types.null, types.late((): any => TopicDetailModel)),
    likeviews: types.union(types.undefined, types.null, types.number),
    dislikeviews: types.union(types.undefined, types.null, types.number),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LikeTopicsModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get likeviews() { return this.__attr(`likeviews`) }
  get dislikeviews() { return this.__attr(`dislikeviews`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  TopicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`TopicId`, TopicDetailModelSelector, builder) }
}
export function selectFromLikeTopics() {
  return new LikeTopicsModelSelector()
}

export const likeTopicsModelPrimitives = selectFromLikeTopics()._id.createdAt.updatedAt.likeviews.dislikeviews.status
