import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ClassifiedStoreModel = types
  .model("ClassifiedStore")
  .props({
    classifieds: types.optional(types.frozen(), []),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setClassifieds(classifieds: any) {
      self.classifieds = classifieds
    },
    addToClassfieds(classifieds: any) {
      self.classifieds = [...self.classifieds, ...classifieds]
    },
    clear() {
      self.classifieds = []
    },
  }))
  .views((store) => ({
    get getClassifieds() {
      return store.classifieds
    },
  }))

export interface ClassifiedStore extends Instance<typeof ClassifiedStoreModel> { }
export interface ClassifiedStoreSnapshot extends SnapshotOut<typeof ClassifiedStoreModel> { }
