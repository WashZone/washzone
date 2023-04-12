import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Interaction } from "../utils/enums"
import { withSetPropAction } from "./helpers/withSetPropAction"

const InteractionVariantsTopics = types.model({
  liked: types.array(types.string),
  disliked: types.array(types.string),
  lastSyncedLiked: types.array(types.string),
  lastSyncedDisliked: types.array(types.string),
})
const InteractionVariantsVideos = types.model({
  liked: types.array(types.string),
  disliked: types.array(types.string),
  saved: types.array(types.string),
  lastSyncedLiked: types.array(types.string),
  lastSyncedDisliked: types.array(types.string),
})
const InteractionVariantsClassified = types.model({
  saved: types.array(types.string),
})

export const InteractionStoreModel = types
  .model("InteractionStore")
  .props({
    videos: types.optional(InteractionVariantsVideos, {}),
    topics: types.optional(InteractionVariantsTopics, {}),
    classified: types.optional(InteractionVariantsClassified, {}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    isVideoSaved(id: string) {
      return self.videos.saved.includes(id)
    },
    isClassifiedSaved(id: string) {
      return self.classified.saved.includes(id)
    },
    async syncSavedInteractions(data: { savedVideos: string[]; savedClassifieds: string[] }) {
      self.setProp("videos", {
        liked: [...self.videos.liked],
        disliked: [...self.videos.disliked],
        saved: [...data.savedVideos],
      })
      self.setProp("classified", { saved: [...data.savedClassifieds] })
    },
    addToLikedTopics(id: string) {
      self.setProp("topics", { liked: [...self.topics.liked, id], disliked: self.topics.disliked })
    },
    addToLikedVideos(id: string) {
      !self.videos.liked.includes(id) && self.videos.liked.push(id)
    },
    addToDislikedTopics(id: string) {
      self.setProp("topics", {
        disliked: [...self.topics.disliked, id],
        liked: self.topics.liked,
      })
    },
    addToDislikedVideos(id: string) {
      self.setProp("videos", {
        disliked: [...self.videos.disliked, id],
        liked: self.videos.liked,
      })
    },
    removefromLikedTopics(id: string) {
      self.setProp("topics", {
        disliked: self.topics.disliked,
        liked: self.topics.liked.filter((i) => i !== id),
      })
    },
    removefromLikedVideos(id: string) {
      self.setProp("videos", {
        disliked: self.videos.disliked,
        liked: self.videos.liked.filter((i) => i !== id),
      })
    },
    removefromDislikedTopics(id: string) {
      self.setProp("topics", {
        disliked: self.topics.disliked.filter((i) => i !== id),
        liked: self.topics.liked,
      })
    },
    removefromDislikedVideos(id: string) {
      self.setProp("videos", {
        disliked: self.videos.disliked.filter((i) => i !== id),
        liked: self.videos.liked,
      })
    },
    removeFromSavedClassifieds(id: string) {
      self.setProp("classified", {
        saved: self.classified.saved.filter((i) => i !== id),
      })
    },
    addToSavedClassified(id: string) {
      !self.classified.saved.includes(id) && self.classified.saved.push(id)
    },
    removeFromSavedVideos(id: string) {
      self.setProp("videos", {
        saved: self.videos.saved.filter((i) => i !== id),
      })
    },
    addToSavedVideos(id: string) {
      !self.videos.saved.includes(id) && self.videos.saved.push(id)
    },
  }))
  .views((store) => ({
    getInteractionOnVideo(id: string) {
      if (store.videos.liked.includes(id)) return Interaction.like
      if (store.videos.disliked.includes(id)) return Interaction.dislike
      return Interaction.null
    },
    getSavedInteractionOnVideo(id: string) {
      console.log('store.videos.saved', store.videos.saved)
      if (store.videos.saved.includes(id)) return Interaction.saved
      return Interaction.notSaved
    },
    getInteractionOnTopic(id: string) {
      if (store.topics.liked.includes(id)) {
        return Interaction.like
      }
      if (store.topics.disliked.includes(id)) {
        return Interaction.dislike
      }
      return Interaction.null
    },
    getInteractionOnClassified(id: string) {
      if (store.classified.saved.includes(id)) return Interaction.saved
      return Interaction.notSaved
    },
    getTopicInteractionOffset(id: string) {
      const val = { likedOffset: 0, dislikedOffset: 0 }
      if (store.topics.liked.includes(id) && !store.topics.lastSyncedLiked.includes(id)) {
        val.likedOffset = -1
      }
      if (!store.topics.liked.includes(id) && store.topics.lastSyncedLiked.includes(id)) {
        val.likedOffset = 1
      }
      if (store.topics.disliked.includes(id) && !store.topics.lastSyncedDisliked.includes(id)) {
        val.dislikedOffset = -1
      }
      if (!store.topics.disliked.includes(id) && store.topics.lastSyncedDisliked.includes(id)) {
        val.dislikedOffset = 1
      }
      return val
    },
    getVideoInteractionOffset(id: string) {
      const val = { likedOffset: 0, dislikedOffset: 0 }
      if (store.videos.liked.includes(id) && !store.videos.lastSyncedLiked.includes(id))
        val.likedOffset = -1
      if (!store.videos.liked.includes(id) && store.videos.lastSyncedLiked.includes(id))
        val.likedOffset = 1
      if (store.videos.disliked.includes(id) && !store.videos.lastSyncedDisliked.includes(id))
        val.dislikedOffset = -1
      if (!store.videos.disliked.includes(id) && store.videos.lastSyncedDisliked.includes(id))
        val.dislikedOffset = 1
      return val
    },

  }))

export interface InteractionStore extends Instance<typeof InteractionStoreModel> { }
export interface InteractionStoreSnapshot extends SnapshotOut<typeof InteractionStoreModel> { }
