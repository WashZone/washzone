import { Instance } from "mobx-state-tree"
import { HomeCommentTagListModelBase } from "./HomeCommentTagListModel.base"

/* The TypeScript type of an instance of HomeCommentTagListModel */
export interface HomeCommentTagListModelType extends Instance<typeof HomeCommentTagListModel.Type> {}

/* A graphql query fragment builders for HomeCommentTagListModel */
export { selectFromHomeCommentTagList, homeCommentTagListModelPrimitives, HomeCommentTagListModelSelector } from "./HomeCommentTagListModel.base"

/**
 * HomeCommentTagListModel
 */
export const HomeCommentTagListModel = HomeCommentTagListModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
