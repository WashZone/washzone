import { Instance } from "mobx-state-tree"
import { RoomChatModelBase } from "./RoomChatModel.base"

/* The TypeScript type of an instance of RoomChatModel */
export interface RoomChatModelType extends Instance<typeof RoomChatModel.Type> {}

/* A graphql query fragment builders for RoomChatModel */
export { selectFromRoomChat, roomChatModelPrimitives, RoomChatModelSelector } from "./RoomChatModel.base"

/**
 * RoomChatModel
 */
export const RoomChatModel = RoomChatModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
