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
 * UserReviewBase
 * auto generated base class for the model UserReviewModel.
 */
export const UserReviewModelBase = ModelBase
  .named('UserReview')
  .props({
    __typename: types.optional(types.literal("UserReview"), "UserReview"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    reviewerId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    classifiedId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    reviewContent: types.union(types.undefined, types.null, types.string),
    reviewStar: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserReviewModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get reviewContent() { return this.__attr(`reviewContent`) }
  get reviewStar() { return this.__attr(`reviewStar`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  reviewerId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`reviewerId`, UserModelSelector, builder) }
  classifiedId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`classifiedId`, UserModelSelector, builder) }
}
export function selectFromUserReview() {
  return new UserReviewModelSelector()
}

export const userReviewModelPrimitives = selectFromUserReview()._id.createdAt.updatedAt.reviewContent.reviewStar.status
