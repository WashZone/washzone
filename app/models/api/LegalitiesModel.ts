import { Instance } from "mobx-state-tree"
import { LegalitiesModelBase } from "./LegalitiesModel.base"

/* The TypeScript type of an instance of LegalitiesModel */
export interface LegalitiesModelType extends Instance<typeof LegalitiesModel.Type> {}

/* A graphql query fragment builders for LegalitiesModel */
export { selectFromLegalities, legalitiesModelPrimitives, LegalitiesModelSelector } from "./LegalitiesModel.base"

/**
 * LegalitiesModel
 */
export const LegalitiesModel = LegalitiesModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
