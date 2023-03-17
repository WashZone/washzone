/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HomecommentsModel, HomecommentsModelType } from "./HomecommentsModel"
import { HomecommentsModelSelector } from "./HomecommentsModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * HomePageDetailBase
 * auto generated base class for the model HomePageDetailModel.
 */
export const HomePageDetailModelBase = ModelBase
  .named('HomePageDetail')
  .props({
    __typename: types.optional(types.literal("HomePageDetail"), "HomePageDetail"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    commentId: types.union(types.undefined, types.late((): any => HomecommentsModel)),
    Discription: types.union(types.undefined, types.null, types.string),
    attachmentType: types.union(types.undefined, types.null, types.string),
    attachmentUrl: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
    likeviews: types.union(types.undefined, types.null, types.integer),
    dislikeviews: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class HomePageDetailModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get Discription() { return this.__attr(`Discription`) }
  get attachmentType() { return this.__attr(`attachmentType`) }
  get attachmentUrl() { return this.__attr(`attachmentUrl`) }
  get status() { return this.__attr(`status`) }
  get likeviews() { return this.__attr(`likeviews`) }
  get dislikeviews() { return this.__attr(`dislikeviews`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  commentId(builder: string | HomecommentsModelSelector | ((selector: HomecommentsModelSelector) => HomecommentsModelSelector) | undefined) { return this.__child(`commentId`, HomecommentsModelSelector, builder) }
}
export function selectFromHomePageDetail() {
  return new HomePageDetailModelSelector()
}

export const homePageDetailModelPrimitives = selectFromHomePageDetail()._id.createdAt.updatedAt.Discription.attachmentType.attachmentUrl.status.likeviews.dislikeviews
