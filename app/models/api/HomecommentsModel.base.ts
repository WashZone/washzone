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
 * HomecommentsBase
 * auto generated base class for the model HomecommentsModel.
 */
export const HomecommentsModelBase = ModelBase
  .named('Homecomments')
  .props({
    __typename: types.optional(types.literal("Homecomments"), "Homecomments"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    HomepageId: types.union(types.undefined, types.null, types.late((): any => HomePageDetailModel)),
    comment: types.union(types.undefined, types.null, types.string),
    acttachmentUrl: types.union(types.undefined, types.null, types.string),
    acttachmentType: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class HomecommentsModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get comment() { return this.__attr(`comment`) }
  get acttachmentUrl() { return this.__attr(`acttachmentUrl`) }
  get acttachmentType() { return this.__attr(`acttachmentType`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  HomepageId(builder: string | HomePageDetailModelSelector | ((selector: HomePageDetailModelSelector) => HomePageDetailModelSelector) | undefined) { return this.__child(`HomepageId`, HomePageDetailModelSelector, builder) }
}
export function selectFromHomecomments() {
  return new HomecommentsModelSelector()
}

export const homecommentsModelPrimitives = selectFromHomecomments()._id.createdAt.updatedAt.comment.acttachmentUrl.acttachmentType
