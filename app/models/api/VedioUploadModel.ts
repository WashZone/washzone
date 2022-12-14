import { Instance } from "mobx-state-tree"
import { VedioUploadModelBase } from "./VedioUploadModel.base"

/* The TypeScript type of an instance of VedioUploadModel */
export interface VedioUploadModelType extends Instance<typeof VedioUploadModel.Type> {}

/* A graphql query fragment builders for VedioUploadModel */
export { selectFromVedioUpload, vedioUploadModelPrimitives, VedioUploadModelSelector } from "./VedioUploadModel.base"

/**
 * VedioUploadModel
 */
export const VedioUploadModel = VedioUploadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
