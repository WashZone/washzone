import { Instance } from "mobx-state-tree"
import { LikeHomePagesModelBase } from "./LikeHomePagesModel.base"

/* The TypeScript type of an instance of LikeHomePagesModel */
export interface LikeHomePagesModelType extends Instance<typeof LikeHomePagesModel.Type> {}

/* A graphql query fragment builders for LikeHomePagesModel */
export { selectFromLikeHomePages, likeHomePagesModelPrimitives, LikeHomePagesModelSelector } from "./LikeHomePagesModel.base"

/**
 * LikeHomePagesModel
 */
export const LikeHomePagesModel = LikeHomePagesModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
