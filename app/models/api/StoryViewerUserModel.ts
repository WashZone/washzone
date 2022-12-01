import { Instance } from "mobx-state-tree"
import { StoryViewerUserModelBase } from "./StoryViewerUserModel.base"

/* The TypeScript type of an instance of StoryViewerUserModel */
export interface StoryViewerUserModelType extends Instance<typeof StoryViewerUserModel.Type> {}

/* A graphql query fragment builders for StoryViewerUserModel */
export { selectFromStoryViewerUser, storyViewerUserModelPrimitives, StoryViewerUserModelSelector } from "./StoryViewerUserModel.base"

/**
 * StoryViewerUserModel
 */
export const StoryViewerUserModel = StoryViewerUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
