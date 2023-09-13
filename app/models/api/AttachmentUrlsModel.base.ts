/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"

/**
 * AttachmentUrlsBase
 * auto generated base class for the model AttachmentUrlsModel.
 */
export const AttachmentUrlsModelBase = ModelBase.named("AttachmentUrls")
  .props({
    __typename: types.optional(types.literal("attachmentUrls"), "attachmentUrls"),
    url: types.union(types.undefined, types.null, types.string),
    thumbnailUrl: types.union(types.undefined, types.null, types.string),
    type: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore<RootStoreType>()
    },
  }))

export class AttachmentUrlsModelSelector extends QueryBuilder {
  get url() {
    return this.__attr(`url`)
  }
  get thumbnailUrl() {
    return this.__attr(`thumbnailUrl`)
  }
  get type() {
    return this.__attr(`type`)
  }
}
export function selectFromAttachmentUrls() {
  return new AttachmentUrlsModelSelector()
}

export const attachmentUrlsModelPrimitives = selectFromAttachmentUrls().url.thumbnailUrl.type
