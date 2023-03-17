import { Instance } from "mobx-state-tree"
import { MetaDataModelBase } from "./MetaDataModel.base"

/* The TypeScript type of an instance of MetaDataModel */
export interface MetaDataModelType extends Instance<typeof MetaDataModel.Type> {}

/* A graphql query fragment builders for MetaDataModel */
export { selectFromMetaData, metaDataModelPrimitives, MetaDataModelSelector } from "./MetaDataModel.base"

/**
 * MetaDataModel
 */
export const MetaDataModel = MetaDataModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
