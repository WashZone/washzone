/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HomePageDetailModel, HomePageDetailModelType } from "./HomePageDetailModel"
import { HomePageDetailModelSelector } from "./HomePageDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * LastReadBase
 * auto generated base class for the model LastReadModel.
 */
export const LastReadModelBase = ModelBase
  .named('LastRead')
  .props({
    __typename: types.optional(types.literal("lastRead"), "lastRead"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    targetId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    HomePageId: types.union(types.undefined, types.null, types.late((): any => HomePageDetailModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LastReadModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  targetId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`targetId`, UserModelSelector, builder) }
  HomePageId(builder: string | HomePageDetailModelSelector | ((selector: HomePageDetailModelSelector) => HomePageDetailModelSelector) | undefined) { return this.__child(`HomePageId`, HomePageDetailModelSelector, builder) }
}
export function selectFromLastRead() {
  return new LastReadModelSelector()
}

export const lastReadModelPrimitives = selectFromLastRead()._id.createdAt.updatedAt
