import { Instance } from "mobx-state-tree"
import { BloackedUserListModelBase } from "./BloackedUserListModel.base"

/* The TypeScript type of an instance of BloackedUserListModel */
export interface BloackedUserListModelType extends Instance<typeof BloackedUserListModel.Type> {}

/* A graphql query fragment builders for BloackedUserListModel */
export { selectFromBloackedUserList, bloackedUserListModelPrimitives, BloackedUserListModelSelector } from "./BloackedUserListModel.base"

/**
 * BloackedUserListModel
 */
export const BloackedUserListModel = BloackedUserListModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
