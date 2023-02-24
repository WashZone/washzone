import { Instance } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"
import { selectFromUsersChat } from "./UsersChatModel.base"

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.actions((self) => ({
  afterAll() {
    // self.afterCreate() {
    //   console.log("CREATD AND SUBSCRIBING")
    //   self.subscribeNewuserchat({}, selectFromUsersChat().authorId.toString(), (message) =>
    //     console.log("NEW MESSAGE", message),
    //   )
    // }
    // self.afterCreate
   
  },
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
}))
