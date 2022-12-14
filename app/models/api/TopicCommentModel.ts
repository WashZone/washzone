import { Instance } from "mobx-state-tree"
import { TopicCommentModelBase } from "./TopicCommentModel.base"

/* The TypeScript type of an instance of TopicCommentModel */
export interface TopicCommentModelType extends Instance<typeof TopicCommentModel.Type> {}

/* A graphql query fragment builders for TopicCommentModel */
export { selectFromTopicComment, topicCommentModelPrimitives, TopicCommentModelSelector } from "./TopicCommentModel.base"

/**
 * TopicCommentModel
 */
export const TopicCommentModel = TopicCommentModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
