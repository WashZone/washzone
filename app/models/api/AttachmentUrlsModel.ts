import { Instance } from "mobx-state-tree"
import { AttachmentUrlsModelBase } from "./AttachmentUrlsModel.base"

/* The TypeScript type of an instance of AttachmentUrlsModel */
export interface AttachmentUrlsModelType extends Instance<typeof AttachmentUrlsModel.Type> {}

/* A graphql query fragment builders for AttachmentUrlsModel */
export { selectFromAttachmentUrls, attachmentUrlsModelPrimitives, AttachmentUrlsModelSelector } from "./AttachmentUrlsModel.base"

/**
 * AttachmentUrlsModel
 */
export const AttachmentUrlsModel = AttachmentUrlsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
