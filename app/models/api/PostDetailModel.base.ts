/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentsDetailModel, CommentsDetailModelType } from "./CommentsDetailModel"
import { CommentsDetailModelSelector } from "./CommentsDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * PostDetailBase
 * auto generated base class for the model PostDetailModel.
 */
export const PostDetailModelBase = ModelBase
  .named('PostDetail')
  .props({
    __typename: types.optional(types.literal("PostDetail"), "PostDetail"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    commentId: types.union(types.undefined, types.late((): any => CommentsDetailModel)),
    postContent: types.union(types.undefined, types.null, types.string),
    attachmentType: types.union(types.undefined, types.null, types.string),
    attachmentUrl: types.union(types.undefined, types.null, types.string),
    fileName: types.union(types.undefined, types.null, types.string),
    type: types.union(types.undefined, types.null, types.string),
    uri: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PostDetailModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get postContent() { return this.__attr(`postContent`) }
  get attachmentType() { return this.__attr(`attachmentType`) }
  get attachmentUrl() { return this.__attr(`attachmentUrl`) }
  get fileName() { return this.__attr(`fileName`) }
  get type() { return this.__attr(`type`) }
  get uri() { return this.__attr(`uri`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  commentId(builder: string | CommentsDetailModelSelector | ((selector: CommentsDetailModelSelector) => CommentsDetailModelSelector) | undefined) { return this.__child(`commentId`, CommentsDetailModelSelector, builder) }
}
export function selectFromPostDetail() {
  return new PostDetailModelSelector()
}

export const postDetailModelPrimitives = selectFromPostDetail()._id.createdAt.updatedAt.postContent.attachmentType.attachmentUrl.fileName.type.uri.status
