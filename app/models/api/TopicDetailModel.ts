import { Instance } from "mobx-state-tree"
import { TopicDetailModelBase } from "./TopicDetailModel.base"

/* The TypeScript type of an instance of TopicDetailModel */
export interface TopicDetailModelType extends Instance<typeof TopicDetailModel.Type> {}

/* A graphql query fragment builders for TopicDetailModel */
export { selectFromTopicDetail, topicDetailModelPrimitives, TopicDetailModelSelector } from "./TopicDetailModel.base"

/**
 * TopicDetailModel
 */
export const TopicDetailModel = TopicDetailModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
