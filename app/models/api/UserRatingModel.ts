import { Instance } from "mobx-state-tree"
import { UserRatingModelBase } from "./UserRatingModel.base"

/* The TypeScript type of an instance of UserRatingModel */
export interface UserRatingModelType extends Instance<typeof UserRatingModel.Type> {}

/* A graphql query fragment builders for UserRatingModel */
export { selectFromUserRating, userRatingModelPrimitives, UserRatingModelSelector } from "./UserRatingModel.base"

/**
 * UserRatingModel
 */
export const UserRatingModel = UserRatingModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
