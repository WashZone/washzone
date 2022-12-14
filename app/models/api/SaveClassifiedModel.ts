import { Instance } from "mobx-state-tree"
import { SaveClassifiedModelBase } from "./SaveClassifiedModel.base"

/* The TypeScript type of an instance of SaveClassifiedModel */
export interface SaveClassifiedModelType extends Instance<typeof SaveClassifiedModel.Type> {}

/* A graphql query fragment builders for SaveClassifiedModel */
export { selectFromSaveClassified, saveClassifiedModelPrimitives, SaveClassifiedModelSelector } from "./SaveClassifiedModel.base"

/**
 * SaveClassifiedModel
 */
export const SaveClassifiedModel = SaveClassifiedModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
