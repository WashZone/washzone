import { Instance } from "mobx-state-tree"
import { ClassifiedFeedModelBase } from "./ClassifiedFeedModel.base"

/* The TypeScript type of an instance of ClassifiedFeedModel */
export interface ClassifiedFeedModelType extends Instance<typeof ClassifiedFeedModel.Type> {}

/* A graphql query fragment builders for ClassifiedFeedModel */
export { selectFromClassifiedFeed, classifiedFeedModelPrimitives, ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"

/**
 * ClassifiedFeedModel
 */
export const ClassifiedFeedModel = ClassifiedFeedModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      // console.log(JSON.stringify(self))
    }
  }))
