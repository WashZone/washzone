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
 * ReportUserBase
 * auto generated base class for the model ReportUserModel.
 */
export const ReportUserModelBase = ModelBase
  .named('ReportUser')
  .props({
    __typename: types.optional(types.literal("reportUser"), "reportUser"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    reportedById: types.union(types.undefined, types.late((): any => UserModel)),
    reason: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ReportUserModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get reason() { return this.__attr(`reason`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  reportedById(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`reportedById`, UserModelSelector, builder) }
}
export function selectFromReportUser() {
  return new ReportUserModelSelector()
}

export const reportUserModelPrimitives = selectFromReportUser()._id.createdAt.updatedAt.reason.status
