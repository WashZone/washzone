import { Instance } from "mobx-state-tree"
import { SearchTopicsModelBase } from "./SearchTopicsModel.base"

/* The TypeScript type of an instance of SearchTopicsModel */
export interface SearchTopicsModelType extends Instance<typeof SearchTopicsModel.Type> {}

/* A graphql query fragment builders for SearchTopicsModel */
export { selectFromSearchTopics, searchTopicsModelPrimitives, SearchTopicsModelSelector } from "./SearchTopicsModel.base"

/**
 * SearchTopicsModel
 */
export const SearchTopicsModel = SearchTopicsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
