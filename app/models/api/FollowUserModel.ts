import { Instance } from "mobx-state-tree"
import { FollowUserModelBase } from "./FollowUserModel.base"

/* The TypeScript type of an instance of FollowUserModel */
export interface FollowUserModelType extends Instance<typeof FollowUserModel.Type> {}

/* A graphql query fragment builders for FollowUserModel */
export { selectFromFollowUser, followUserModelPrimitives, FollowUserModelSelector } from "./FollowUserModel.base"

/**
 * FollowUserModel
 */
export const FollowUserModel = FollowUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
