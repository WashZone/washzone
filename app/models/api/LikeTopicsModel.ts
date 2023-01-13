import { Instance } from "mobx-state-tree"
import { LikeTopicsModelBase } from "./LikeTopicsModel.base"

/* The TypeScript type of an instance of LikeTopicsModel */
export interface LikeTopicsModelType extends Instance<typeof LikeTopicsModel.Type> {}

/* A graphql query fragment builders for LikeTopicsModel */
export { selectFromLikeTopics, likeTopicsModelPrimitives, LikeTopicsModelSelector } from "./LikeTopicsModel.base"

/**
 * LikeTopicsModel
 */
export const LikeTopicsModel = LikeTopicsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
