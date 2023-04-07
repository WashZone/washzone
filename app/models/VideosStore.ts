import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Interaction } from "../utils/enums"
import { likeDislikeCountUpdater } from "../utils/helpers"

export const VideosStoreModel = types
  .model("VideosStore")
  .props({
    videos: types.optional(types.frozen(), []),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setVideos(videos: any) {
      self.videos = [...videos]
    },
    updateVideoInteractionLocally(videoId, interaction, newCount) {
      const temp = self.videos.map((j) =>
        j.map((i) => {
          if (i._id === videoId) {
            return { ...i, interaction, ...newCount }
          } else {
            return i
          }
        }),
      )
      self.videos = temp
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
