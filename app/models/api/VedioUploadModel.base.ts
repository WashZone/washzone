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
 * VedioUploadBase
 * auto generated base class for the model VedioUploadModel.
 */
export const VedioUploadModelBase = ModelBase
  .named('VedioUpload')
  .props({
    __typename: types.optional(types.literal("VedioUpload"), "VedioUpload"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    videoHeading: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    attachmentVedioUrl: types.union(types.undefined, types.null, types.string),
    view: types.union(types.undefined, types.null, types.number),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VedioUploadModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get videoHeading() { return this.__attr(`videoHeading`) }
  get description() { return this.__attr(`description`) }
  get attachmentVedioUrl() { return this.__attr(`attachmentVedioUrl`) }
  get view() { return this.__attr(`view`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
}
export function selectFromVedioUpload() {
  return new VedioUploadModelSelector()
}

export const vedioUploadModelPrimitives = selectFromVedioUpload()._id.createdAt.updatedAt.videoHeading.description.attachmentVedioUrl.view.status
