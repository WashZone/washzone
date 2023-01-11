import { Instance } from "mobx-state-tree"
import { LikeVideosModelBase } from "./LikeVideosModel.base"

/* The TypeScript type of an instance of LikeVideosModel */
export interface LikeVideosModelType extends Instance<typeof LikeVideosModel.Type> {}

/* A graphql query fragment builders for LikeVideosModel */
export { selectFromLikeVideos, likeVideosModelPrimitives, LikeVideosModelSelector } from "./LikeVideosModel.base"

/**
 * LikeVideosModel
 */
export const LikeVideosModel = LikeVideosModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
