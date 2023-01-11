/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { VideoUploadModelSelector } from "./VideoUploadModel.base"
import { RootStoreType } from "./index"


/**
 * ChannelListBase
 * auto generated base class for the model ChannelListModel.
 */
export const ChannelListModelBase = ModelBase
  .named('ChannelList')
  .props({
    __typename: types.optional(types.literal("ChannelList"), "ChannelList"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    channelId: types.union(types.undefined, types.null, types.string),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    videoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
    channelName: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChannelListModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get channelId() { return this.__attr(`channelId`) }
  get channelName() { return this.__attr(`channelName`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  videoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`videoId`, VideoUploadModelSelector, builder) }
}
export function selectFromChannelList() {
  return new ChannelListModelSelector()
}

export const channelListModelPrimitives = selectFromChannelList()._id.createdAt.updatedAt.channelId.channelName.status
