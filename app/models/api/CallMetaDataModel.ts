import { Instance } from "mobx-state-tree"
import { CallMetaDataModelBase } from "./CallMetaDataModel.base"

/* The TypeScript type of an instance of CallMetaDataModel */
export interface CallMetaDataModelType extends Instance<typeof CallMetaDataModel.Type> {}

/* A graphql query fragment builders for CallMetaDataModel */
export { selectFromCallMetaData, callMetaDataModelPrimitives, CallMetaDataModelSelector } from "./CallMetaDataModel.base"

/**
 * CallMetaDataModel
 */
export const CallMetaDataModel = CallMetaDataModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
