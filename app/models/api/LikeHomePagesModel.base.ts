/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HomePageDetailModel, HomePageDetailModelType } from "./HomePageDetailModel"
import { HomePageDetailModelSelector } from "./HomePageDetailModel.base"
import { HomePageIdArrayModel, HomePageIdArrayModelType } from "./HomePageIdArrayModel"
import { HomePageIdArrayModelSelector } from "./HomePageIdArrayModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * LikeHomePagesBase
 * auto generated base class for the model LikeHomePagesModel.
 */
export const LikeHomePagesModelBase = ModelBase
  .named('LikeHomePages')
  .props({
    __typename: types.optional(types.literal("likeHomePages"), "likeHomePages"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    HomePageId: types.union(types.undefined, types.null, types.late((): any => HomePageDetailModel)),
    likeviews: types.union(types.undefined, types.null, types.number),
    dislikeviews: types.union(types.undefined, types.null, types.number),
    status: types.union(types.undefined, types.null, types.string),
    HomePageIdarrayIds: types.union(types.undefined, types.null, types.array(types.late((): any => HomePageIdArrayModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LikeHomePagesModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get likeviews() { return this.__attr(`likeviews`) }
  get dislikeviews() { return this.__attr(`dislikeviews`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  HomePageId(builder: string | HomePageDetailModelSelector | ((selector: HomePageDetailModelSelector) => HomePageDetailModelSelector) | undefined) { return this.__child(`HomePageId`, HomePageDetailModelSelector, builder) }
  HomePageIdarrayIds(builder: string | HomePageIdArrayModelSelector | ((selector: HomePageIdArrayModelSelector) => HomePageIdArrayModelSelector) | undefined) { return this.__child(`HomePageIdarrayIds`, HomePageIdArrayModelSelector, builder) }
}
export function selectFromLikeHomePages() {
  return new LikeHomePagesModelSelector()
}

export const likeHomePagesModelPrimitives = selectFromLikeHomePages()._id.createdAt.updatedAt.likeviews.dislikeviews.status
