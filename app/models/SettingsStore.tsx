import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const SettingsStoreModel = types
  .model("SettingsStore")
  .props({
    notifications: types.optional(types.boolean, true),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    toggleNotification() {
        self.notifications = !self.notifications
      },
  }))
  .views((store) => ({
    get getSettings() {
      return store
    },
  }))

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshot extends SnapshotOut<typeof SettingsStoreModel> {}
