import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ChatRoomStoreModel = types
  .model("ChatRoomStore")
  .props({
    allChatRooms: types.frozen([]),
    chatMessages: types.frozen({}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setChatRooms(chatRooms: any) {
      self.allChatRooms = chatRooms
    },
    updateRoomMessages(props: { roomId: string; messages: Array<any> }) {
      self.chatMessages[props.roomId] = props.messages
    },
    getRoomMessages(props: { roomId: string }) {
      if(self.chatMessages)
      {return this.roomChatsAvailable({ roomId: props.roomId })
        ? self.chatMessages[props.roomId]
        : []}
      return []  
    },
    addToMessages(props: { roomId: string; message: any }) {
      if (self.chatMessages[props.roomId] === undefined)
        self.chatMessages[props.roomId] = [props.message]
      else {
        self.chatMessages[props.roomId] = [...self.chatMessages[props.roomId], props.message]
      }
    },
    roomChatsAvailable(props: { roomId: string }) {
      return self.chatMessages ? self.chatMessages[props.roomId]?.length > 0 :false
    },
    addToChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms, self.allChatRooms]
    },
    clear() {
      self.allChatRooms = []
    },
  }))
  .views((store) => ({
    get getAllChatRooms() {
      return store.allChatRooms
    },
  }))

export interface ChatRoomStore extends Instance<typeof ChatRoomStoreModel> {}
export interface ChatRoomStoreSnapshot extends SnapshotOut<typeof ChatRoomStoreModel> {}
