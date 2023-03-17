import { Instance } from "mobx-state-tree"
import { NotificationModelBase } from "./NotificationModel.base"

/* The TypeScript type of an instance of NotificationModel */
export interface NotificationModelType extends Instance<typeof NotificationModel.Type> {}

/* A graphql query fragment builders for NotificationModel */
export { selectFromNotification, notificationModelPrimitives, NotificationModelSelector } from "./NotificationModel.base"

/**
 * NotificationModel
 */
export const NotificationModel = NotificationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
