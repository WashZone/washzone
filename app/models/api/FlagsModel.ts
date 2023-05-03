import { Instance } from "mobx-state-tree"
import { FlagsModelBase } from "./FlagsModel.base"

/* The TypeScript type of an instance of FlagsModel */
export interface FlagsModelType extends Instance<typeof FlagsModel.Type> {}

/* A graphql query fragment builders for FlagsModel */
export { selectFromFlags, flagsModelPrimitives, FlagsModelSelector } from "./FlagsModel.base"

/**
 * FlagsModel
 */
export const FlagsModel = FlagsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
