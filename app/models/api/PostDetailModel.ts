import { Instance } from "mobx-state-tree"
import { PostDetailModelBase } from "./PostDetailModel.base"

/* The TypeScript type of an instance of PostDetailModel */
export interface PostDetailModelType extends Instance<typeof PostDetailModel.Type> {}

/* A graphql query fragment builders for PostDetailModel */
export { selectFromPostDetail, postDetailModelPrimitives, PostDetailModelSelector } from "./PostDetailModel.base"

/**
 * PostDetailModel
 */
export const PostDetailModel = PostDetailModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
