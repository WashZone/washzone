import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const ShareOptionsModel = types.model({
  message: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  url: types.optional(types.string, ""),
  type: types.optional(types.string, ""),
  attachment: types.optional(types.string, ""),
})

export const ShareStoreModel = types
  .model("ShareStore")
  .props({
    shareOptions: types.optional(ShareOptionsModel, {}),
    isShareOpen: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    share(shareOptions: {
      message: string;
      title: string;
      url: string;
      type: string,
      attachment: string,
    }) {
      self.shareOptions = shareOptions
      self.isShareOpen = true
    },
    close() {
      self.isShareOpen = false
    },
  }))
  .views((store) => ({
    get getShareOptions() {
      return store.shareOptions
    },
  }))

export interface ShareStore extends Instance<typeof ShareStoreModel> { }
export interface ShareStoreSnapshot extends SnapshotOut<typeof ShareStoreModel> { }
