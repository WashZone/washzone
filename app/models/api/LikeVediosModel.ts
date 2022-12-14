import { Instance } from "mobx-state-tree"
import { LikeVediosModelBase } from "./LikeVediosModel.base"

/* The TypeScript type of an instance of LikeVediosModel */
export interface LikeVediosModelType extends Instance<typeof LikeVediosModel.Type> {}

/* A graphql query fragment builders for LikeVediosModel */
export { selectFromLikeVedios, likeVediosModelPrimitives, LikeVediosModelSelector } from "./LikeVediosModel.base"

/**
 * LikeVediosModel
 */
export const LikeVediosModel = LikeVediosModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
