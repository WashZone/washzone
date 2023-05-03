import { Instance } from "mobx-state-tree"
import { BlockUserModelBase } from "./BlockUserModel.base"

/* The TypeScript type of an instance of BlockUserModel */
export interface BlockUserModelType extends Instance<typeof BlockUserModel.Type> {}

/* A graphql query fragment builders for BlockUserModel */
export { selectFromBlockUser, blockUserModelPrimitives, BlockUserModelSelector } from "./BlockUserModel.base"

/**
 * BlockUserModel
 */
export const BlockUserModel = BlockUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
