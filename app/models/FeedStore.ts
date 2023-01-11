import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    topics: types.frozen(),
    stories: types.frozen(),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setTopics(topics: any) {
      self.topics = topics
    },
    addToTopics(topics: any) {
      self.topics = [...self.topics, ...topics]
    },
    clear() {
      self.topics = []
      self.stories = []
    },
    setStories(stories: any) {
      self.stories = stories
    },
    addToStories(stories: any) {
      self.topics = [...self.stories, ...stories]
    }
  }))

export interface FeedStore extends Instance<typeof FeedStoreModel> {}
export interface FeedStoreSnapshot extends SnapshotOut<typeof FeedStoreModel> {}
