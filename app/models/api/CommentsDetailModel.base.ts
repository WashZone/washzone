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
 * CommentsDetailBase
 * auto generated base class for the model CommentsDetailModel.
 */
export const CommentsDetailModelBase = ModelBase
  .named('CommentsDetail')
  .props({
    __typename: types.optional(types.literal("CommentsDetail"), "CommentsDetail"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    postId: types.union(types.undefined, types.null, types.string),
    comment: types.union(types.undefined, types.null, types.string),
    date: types.union(types.undefined, types.null, types.string),
    imageUrl: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CommentsDetailModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get postId() { return this.__attr(`postId`) }
  get comment() { return this.__attr(`comment`) }
  get date() { return this.__attr(`date`) }
  get imageUrl() { return this.__attr(`imageUrl`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
}
export function selectFromCommentsDetail() {
  return new CommentsDetailModelSelector()
}

export const commentsDetailModelPrimitives = selectFromCommentsDetail()._id.createdAt.updatedAt.postId.comment.date.imageUrl
