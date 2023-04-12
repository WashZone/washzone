/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { TopicIdArrayModel, TopicIdArrayModelType } from "./TopicIdArrayModel"
import { TopicIdArrayModelSelector } from "./TopicIdArrayModel.base"
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
    status: types.union(types.undefined, types.null, types.string),
    TopicIdarrayIds: types.union(types.undefined, types.null, types.array(types.late((): any => TopicIdArrayModel))),
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
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  TopicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`TopicId`, TopicDetailModelSelector, builder) }
  TopicIdarrayIds(builder: string | TopicIdArrayModelSelector | ((selector: TopicIdArrayModelSelector) => TopicIdArrayModelSelector) | undefined) { return this.__child(`TopicIdarrayIds`, TopicIdArrayModelSelector, builder) }
}
export function selectFromLikeTopics() {
  return new LikeTopicsModelSelector()
}

export const likeTopicsModelPrimitives = selectFromLikeTopics()._id.createdAt.updatedAt.status
