import { Instance } from "mobx-state-tree"
import { UsersChatModelBase } from "./UsersChatModel.base"

/* The TypeScript type of an instance of UsersChatModel */
export interface UsersChatModelType extends Instance<typeof UsersChatModel.Type> {}

/* A graphql query fragment builders for UsersChatModel */
export { selectFromUsersChat, usersChatModelPrimitives, UsersChatModelSelector } from "./UsersChatModel.base"

/**
 * UsersChatModel
 */
export const UsersChatModel = UsersChatModelBase
  .actions(self => ({
    // afterAll(){
    //   self.
    // },
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
