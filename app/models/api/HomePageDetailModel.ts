import { Instance } from "mobx-state-tree"
import { HomePageDetailModelBase } from "./HomePageDetailModel.base"

/* The TypeScript type of an instance of HomePageDetailModel */
export interface HomePageDetailModelType extends Instance<typeof HomePageDetailModel.Type> {}

/* A graphql query fragment builders for HomePageDetailModel */
export { selectFromHomePageDetail, homePageDetailModelPrimitives, HomePageDetailModelSelector } from "./HomePageDetailModel.base"

/**
 * HomePageDetailModel
 */
export const HomePageDetailModel = HomePageDetailModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
