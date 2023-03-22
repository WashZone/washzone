import { Instance } from "mobx-state-tree"
import { CallNotificationModelBase } from "./CallNotificationModel.base"

/* The TypeScript type of an instance of CallNotificationModel */
export interface CallNotificationModelType extends Instance<typeof CallNotificationModel.Type> {}

/* A graphql query fragment builders for CallNotificationModel */
export { selectFromCallNotification, callNotificationModelPrimitives, CallNotificationModelSelector } from "./CallNotificationModel.base"

/**
 * CallNotificationModel
 */
export const CallNotificationModel = CallNotificationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
