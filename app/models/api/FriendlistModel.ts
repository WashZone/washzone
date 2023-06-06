import { Instance } from "mobx-state-tree"
import { FriendlistModelBase } from "./FriendlistModel.base"

/* The TypeScript type of an instance of FriendlistModel */
export interface FriendlistModelType extends Instance<typeof FriendlistModel.Type> {}

/* A graphql query fragment builders for FriendlistModel */
export { selectFromFriendlist, friendlistModelPrimitives, FriendlistModelSelector } from "./FriendlistModel.base"

/**
 * FriendlistModel
 */
export const FriendlistModel = FriendlistModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
