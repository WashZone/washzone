import { Instance } from "mobx-state-tree"
import { UserTagListModelBase } from "./UserTagListModel.base"

/* The TypeScript type of an instance of UserTagListModel */
export interface UserTagListModelType extends Instance<typeof UserTagListModel.Type> {}

/* A graphql query fragment builders for UserTagListModel */
export { selectFromUserTagList, userTagListModelPrimitives, UserTagListModelSelector } from "./UserTagListModel.base"

/**
 * UserTagListModel
 */
export const UserTagListModel = UserTagListModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
