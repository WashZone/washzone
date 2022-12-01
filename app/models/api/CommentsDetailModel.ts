import { Instance } from "mobx-state-tree"
import { CommentsDetailModelBase } from "./CommentsDetailModel.base"

/* The TypeScript type of an instance of CommentsDetailModel */
export interface CommentsDetailModelType extends Instance<typeof CommentsDetailModel.Type> {}

/* A graphql query fragment builders for CommentsDetailModel */
export { selectFromCommentsDetail, commentsDetailModelPrimitives, CommentsDetailModelSelector } from "./CommentsDetailModel.base"

/**
 * CommentsDetailModel
 */
export const CommentsDetailModel = CommentsDetailModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
