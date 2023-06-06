import { Instance } from "mobx-state-tree"
import { TopicCommentTagModelBase } from "./TopicCommentTagModel.base"

/* The TypeScript type of an instance of TopicCommentTagModel */
export interface TopicCommentTagModelType extends Instance<typeof TopicCommentTagModel.Type> {}

/* A graphql query fragment builders for TopicCommentTagModel */
export { selectFromTopicCommentTag, topicCommentTagModelPrimitives, TopicCommentTagModelSelector } from "./TopicCommentTagModel.base"

/**
 * TopicCommentTagModel
 */
export const TopicCommentTagModel = TopicCommentTagModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
