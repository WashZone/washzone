import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const VideosStoreModel = types
  .model("VideosStore")
  .props({
    videos: types.optional(types.frozen(),[]),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setVideos(videos: any) {
      self.videos = [...videos]
    },
    addToClassfieds(posts: any) {
      self.videos = [...self.videos, ...posts]
    },
    clear() {
      self.videos = []
    },
  }))
  .views((store) => ({
    get getClassifieds() {
      return store.videos
    },
  }))

export interface VideosStore extends Instance<typeof VideosStoreModel> {}
export interface VideosStoreSnapshot extends SnapshotOut<typeof VideosStoreModel> {}
