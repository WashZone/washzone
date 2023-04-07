import { Instance } from "mobx-state-tree"
import { TopicIdArrayModelBase } from "./TopicIdArrayModel.base"

/* The TypeScript type of an instance of TopicIdArrayModel */
export interface TopicIdArrayModelType extends Instance<typeof TopicIdArrayModel.Type> {}

/* A graphql query fragment builders for TopicIdArrayModel */
export { selectFromTopicIdArray, topicIdArrayModelPrimitives, TopicIdArrayModelSelector } from "./TopicIdArrayModel.base"

/**
 * TopicIdArrayModel
 */
export const TopicIdArrayModel = TopicIdArrayModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
