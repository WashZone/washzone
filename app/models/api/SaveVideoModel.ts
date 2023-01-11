import { Instance } from "mobx-state-tree"
import { SaveVideoModelBase } from "./SaveVideoModel.base"

/* The TypeScript type of an instance of SaveVideoModel */
export interface SaveVideoModelType extends Instance<typeof SaveVideoModel.Type> {}

/* A graphql query fragment builders for SaveVideoModel */
export { selectFromSaveVideo, saveVideoModelPrimitives, SaveVideoModelSelector } from "./SaveVideoModel.base"

/**
 * SaveVideoModel
 */
export const SaveVideoModel = SaveVideoModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
