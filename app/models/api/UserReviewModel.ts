import { Instance } from "mobx-state-tree"
import { UserReviewModelBase } from "./UserReviewModel.base"

/* The TypeScript type of an instance of UserReviewModel */
export interface UserReviewModelType extends Instance<typeof UserReviewModel.Type> {}

/* A graphql query fragment builders for UserReviewModel */
export { selectFromUserReview, userReviewModelPrimitives, UserReviewModelSelector } from "./UserReviewModel.base"

/**
 * UserReviewModel
 */
export const UserReviewModel = UserReviewModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
