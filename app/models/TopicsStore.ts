import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const TopicsStoreModel = types
  .model("TopicsStore")
  .props({
    topics: types.frozen([]),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setTopics(topics: any) {
      self.topics = topics
    },
    addToTopics(topics: any) {
        self.topics = [ ...topics, ...self.topics]
      },  
    clear() {
      self.topics = []
    },
  }))
  .views((store) => ({
    get getTopics() {
      return store.topics
    },
  }))

export interface TopicsStore extends Instance<typeof TopicsStoreModel> {}
export interface TopicsStoreSnapshot extends SnapshotOut<typeof TopicsStoreModel> {}
