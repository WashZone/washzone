import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    topics: types.frozen([]),
    stories: types.frozen([]),
    homeFeed: types.frozen([]),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    updateHomePostInteractionLocally(postId, interaction, newCount) {
      const temp = self.homeFeed.map((i) => {
        if (i._id === postId) {
          return { ...i, interaction, ...newCount }
        } else {
          return i
        }
      })
      self.homeFeed = temp
    },
    syncLocalRead(userId:string){
      self.stories =  self.stories.map(i => i?.followId?._id ===userId? {...i, unreadCount:0} : i)
    },
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
    },
  }))

export interface FeedStore extends Instance<typeof FeedStoreModel> {}
export interface FeedStoreSnapshot extends SnapshotOut<typeof FeedStoreModel> {}
