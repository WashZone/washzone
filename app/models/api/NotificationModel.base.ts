/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * NotificationBase
 * auto generated base class for the model NotificationModel.
 */
export const NotificationModelBase = ModelBase
  .named('Notification')
  .props({
    __typename: types.optional(types.literal("Notification"), "Notification"),
    body: types.union(types.undefined, types.null, types.string),
    title: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class NotificationModelSelector extends QueryBuilder {
  get body() { return this.__attr(`body`) }
  get title() { return this.__attr(`title`) }
}
export function selectFromNotification() {
  return new NotificationModelSelector()
}

export const notificationModelPrimitives = selectFromNotification().body.title
