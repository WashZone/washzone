import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    feedPosts: types.frozen(),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setPosts(posts:any) {
      self.feedPosts = posts 
    },
  }))
  .views((store) => ({
    get getPosts() {
      return store.feedPosts
    },
  }))


export interface FeedStore extends Instance<typeof FeedStoreModel> {}
export interface FeedStoreSnapshot extends SnapshotOut<typeof FeedStoreModel> {}
