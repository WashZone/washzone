import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    topics: types.frozen(),
    stories: types.frozen(),
    homeFeed : types.frozen(),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setTopics(topics: any) {
      self.topics = topics
    },
    addToTopics(topics: any) {
      self.topics = [...self.topics, ...topics]
    },
    setHomeFeed(homeFeed: any) {
      self.homeFeed = [...homeFeed]
    },
    addToHomeFeed(homeFeed: any) {
      self.homeFeed = [...self.homeFeed, ...homeFeed]
    },
    clear() {
      self.topics = []
      self.stories = []
      self.homeFeed = []
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
