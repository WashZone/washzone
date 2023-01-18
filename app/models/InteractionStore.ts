import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Interaction } from "../utils/enums"
import { withSetPropAction } from "./helpers/withSetPropAction"

const InteractionVariants = types.model({
  liked: types.array(types.string),
  disliked: types.array(types.string),
})

export const InteractionStoreModel = types
  .model("InteractionStore")
  .props({
    videos: types.optional(InteractionVariants, {}),
    topics: types.optional(InteractionVariants, {}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    async syncInteractions(data: {
      videos: { liked: string[]; disliked: string[] }
      topics: { liked: string[]; disliked: string[] }
    }) {
      self.setProp("videos", data.videos)
      self.setProp("topics", data.topics)
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
  }))
  .views((store) => ({
    getInteractionOnVideo(id: string) {
      console.log("VIDEOID", id)
      console.log("INTERACTION STORE", JSON.stringify(store))
      if (store.videos.liked.includes(id)) return Interaction.like
      if (store.videos.disliked.includes(id)) return Interaction.dislike
      return Interaction.null
    },
    getInteractionOnTopic(id: string) {
      if (store.topics.liked.includes(id)) return Interaction.like
      if (store.topics.disliked.includes(id)) return Interaction.dislike
      return Interaction.null
    },
  }))

export interface InteractionStore extends Instance<typeof InteractionStoreModel> {}
export interface InteractionStoreSnapshot extends SnapshotOut<typeof InteractionStoreModel> {}
