import { Instance } from "mobx-state-tree"
import { ReciverIdArrayModelBase } from "./ReciverIdArrayModel.base"

/* The TypeScript type of an instance of ReciverIdArrayModel */
export interface ReciverIdArrayModelType extends Instance<typeof ReciverIdArrayModel.Type> {}

/* A graphql query fragment builders for ReciverIdArrayModel */
export { selectFromReciverIdArray, reciverIdArrayModelPrimitives, ReciverIdArrayModelSelector } from "./ReciverIdArrayModel.base"

/**
 * ReciverIdArrayModel
 */
export const ReciverIdArrayModel = ReciverIdArrayModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
