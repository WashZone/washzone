import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const EditStateModel = types
  .model("EditState")
  .props({
    isEditing: types.optional(types.boolean, false),
    mode: types.optional(
      types.union(types.literal("post"), types.literal("topic"), types.null),
      null,
    ),
    data: types.frozen({}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    editPost(data) {
      self.setProp("mode", "post")
      self.setProp("data", data)
      self.setProp("isEditing", true)
    },
    editTopic(data) {
      self.setProp("mode", "topic")
      self.setProp("data", data)
      self.setProp("isEditing", true)
    },
    resetState() {
      self.setProp("isEditing", false)
      self.setProp("data", {})
    },
  }))
  .views((self) => ({
    get defaultData() {
      return self.data
    },
  }))

export interface NotificationStore extends Instance<typeof EditStateModel> {}
export interface NotificationStoreSnapshot extends SnapshotOut<typeof EditStateModel> {}
