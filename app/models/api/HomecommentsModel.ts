import { Instance } from "mobx-state-tree"
import { HomecommentsModelBase } from "./HomecommentsModel.base"

/* The TypeScript type of an instance of HomecommentsModel */
export interface HomecommentsModelType extends Instance<typeof HomecommentsModel.Type> {}

/* A graphql query fragment builders for HomecommentsModel */
export { selectFromHomecomments, homecommentsModelPrimitives, HomecommentsModelSelector } from "./HomecommentsModel.base"

/**
 * HomecommentsModel
 */
export const HomecommentsModel = HomecommentsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
