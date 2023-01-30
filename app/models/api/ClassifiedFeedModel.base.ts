/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { UserRatingModel, UserRatingModelType } from "./UserRatingModel"
import { UserRatingModelSelector } from "./UserRatingModel.base"
import { RootStoreType } from "./index"


/**
 * ClassifiedFeedBase
 * auto generated base class for the model ClassifiedFeedModel.
 */
export const ClassifiedFeedModelBase = ModelBase
  .named('ClassifiedFeed')
  .props({
    __typename: types.optional(types.literal("classifiedFeed"), "classifiedFeed"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    ratingId: types.union(types.undefined, types.null, types.late((): any => UserRatingModel)),
    classifiedDetail: types.union(types.undefined, types.null, types.string),
    attachmentType: types.union(types.undefined, types.null, types.string),
    attachmentUrl: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
    prize: types.union(types.undefined, types.null, types.string),
    title: types.union(types.undefined, types.null, types.string),
    condition: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ClassifiedFeedModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get classifiedDetail() { return this.__attr(`classifiedDetail`) }
  get attachmentType() { return this.__attr(`attachmentType`) }
  get attachmentUrl() { return this.__attr(`attachmentUrl`) }
  get status() { return this.__attr(`status`) }
  get prize() { return this.__attr(`prize`) }
  get title() { return this.__attr(`title`) }
  get condition() { return this.__attr(`condition`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  ratingId(builder: string | UserRatingModelSelector | ((selector: UserRatingModelSelector) => UserRatingModelSelector) | undefined) { return this.__child(`ratingId`, UserRatingModelSelector, builder) }
}
export function selectFromClassifiedFeed() {
  return new ClassifiedFeedModelSelector()
}

export const classifiedFeedModelPrimitives = selectFromClassifiedFeed()._id.createdAt.updatedAt.classifiedDetail.attachmentType.attachmentUrl.status.prize.title.condition
