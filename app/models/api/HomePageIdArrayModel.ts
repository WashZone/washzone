import { Instance } from "mobx-state-tree"
import { HomePageIdArrayModelBase } from "./HomePageIdArrayModel.base"

/* The TypeScript type of an instance of HomePageIdArrayModel */
export interface HomePageIdArrayModelType extends Instance<typeof HomePageIdArrayModel.Type> {}

/* A graphql query fragment builders for HomePageIdArrayModel */
export { selectFromHomePageIdArray, homePageIdArrayModelPrimitives, HomePageIdArrayModelSelector } from "./HomePageIdArrayModel.base"

/**
 * HomePageIdArrayModel
 */
export const HomePageIdArrayModel = HomePageIdArrayModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
