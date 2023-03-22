/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * CallNotificationBase
 * auto generated base class for the model CallNotificationModel.
 */
export const CallNotificationModelBase = ModelBase
  .named('CallNotification')
  .props({
    __typename: types.optional(types.literal("CallNotification"), "CallNotification"),
    body: types.union(types.undefined, types.null, types.string),
    title: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CallNotificationModelSelector extends QueryBuilder {
  get body() { return this.__attr(`body`) }
  get title() { return this.__attr(`title`) }
}
export function selectFromCallNotification() {
  return new CallNotificationModelSelector()
}

export const callNotificationModelPrimitives = selectFromCallNotification().body.title
