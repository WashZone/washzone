import { Instance } from "mobx-state-tree"
import { TopicTaguserModelBase } from "./TopicTaguserModel.base"

/* The TypeScript type of an instance of TopicTaguserModel */
export interface TopicTaguserModelType extends Instance<typeof TopicTaguserModel.Type> {}

/* A graphql query fragment builders for TopicTaguserModel */
export { selectFromTopicTaguser, topicTaguserModelPrimitives, TopicTaguserModelSelector } from "./TopicTaguserModel.base"

/**
 * TopicTaguserModel
 */
export const TopicTaguserModel = TopicTaguserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
