/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VedioUploadModel, VedioUploadModelType } from "./VedioUploadModel"
import { VedioUploadModelSelector } from "./VedioUploadModel.base"
import { RootStoreType } from "./index"


/**
 * LikeVediosBase
 * auto generated base class for the model LikeVediosModel.
 */
export const LikeVediosModelBase = ModelBase
  .named('LikeVedios')
  .props({
    __typename: types.optional(types.literal("likeVedios"), "likeVedios"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    videoId: types.union(types.undefined, types.null, types.late((): any => VedioUploadModel)),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LikeVediosModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  videoId(builder: string | VedioUploadModelSelector | ((selector: VedioUploadModelSelector) => VedioUploadModelSelector) | undefined) { return this.__child(`videoId`, VedioUploadModelSelector, builder) }
}
export function selectFromLikeVedios() {
  return new LikeVediosModelSelector()
}

export const likeVediosModelPrimitives = selectFromLikeVedios()._id.createdAt.updatedAt.status
