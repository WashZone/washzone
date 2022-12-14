import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const SavedStoreModel = types
  .model("SavedStore")
  .props({
    savedClassifieds: types.frozen(),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setSavedClassifieds(posts: any) {
      self.savedClassifieds = posts
    },
    addToSavedClassifieds(posts: any) {
      self.savedClassifieds = [...self.savedClassifieds, ...posts]
    },
    clear() {
      self.savedClassifieds = []
    },
  }))
  .views((store) => ({
    get getSavedClassifieds() {
      return store.savedClassifieds
    },
  }))

export interface SavedStore extends Instance<typeof SavedStoreModel> {}
export interface SavedStoreSnapshot extends SnapshotOut<typeof SavedStoreModel> {}
