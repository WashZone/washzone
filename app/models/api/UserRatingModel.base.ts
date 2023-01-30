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
 * UserRatingBase
 * auto generated base class for the model UserRatingModel.
 */
export const UserRatingModelBase = ModelBase
  .named('UserRating')
  .props({
    __typename: types.optional(types.literal("UserRating"), "UserRating"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    ratinguserId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    ratingStar: types.union(types.undefined, types.null, types.number),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserRatingModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get ratingStar() { return this.__attr(`ratingStar`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  ratinguserId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`ratinguserId`, UserModelSelector, builder) }
}
export function selectFromUserRating() {
  return new UserRatingModelSelector()
}

export const userRatingModelPrimitives = selectFromUserRating()._id.createdAt.updatedAt.ratingStar.status
