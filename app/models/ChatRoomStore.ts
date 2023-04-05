import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ChatRoomStoreModel = types
  .model("ChatRoomStore")
  .props({
    allChatRooms: types.frozen([]),
    chatMessages: types.frozen({}),
    rooms: types.frozen({}),
    unreadCount: types.number,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms]
      this.syncUnreadCount()
    },
    updateRoomMessages(props: { roomId: string; messages: Array<any> }) {
      const temp = { ...self.chatMessages }
      temp[props.roomId] = [...props.messages]
      self.setProp("chatMessages", temp)
    },
    getRoomMessages(props: { roomId: string }) {
      if (self.chatMessages) {
        const parsedMessages = this.roomChatsAvailable({ roomId: props.roomId })
          ? self.chatMessages[props.roomId].map((i: any) => {
              return {
                ...i,
                id: i._id,
                author: { ...i?.authorId, id: i?.authorId?._id, imageUrl: i?.authorId?.picture },
                type: i?.messageType || "text",
              }
            })
          : []
        return parsedMessages
      }
      return []
    },
    async mergeChatPage(props: { roomId: string; messages: any; previousPage: number }) {
      // if (self.chatMessages[props.roomId] !== undefined) {
      console.log("ADDING to room", props?.messages.length, props)
      const temp = { ...self.chatMessages }
      console.log("PASTMESSAGES", self.chatMessages)
      console.log(
        "PASTMESSAGES",
        temp[props.roomId].slice(0, props.previousPage * 20 + 1).length,
        temp[props.roomId].slice(0, props.previousPage * 20 + 1),
      )
      temp[props.roomId] = [
        ...temp[props.roomId].slice(0, props.previousPage * 20 + 1),
        ...props.messages,
      ]
      console.log("NEWMESSAGES", temp[props.roomId].length, temp[props.roomId])
      console.log()
      self.setProp("chatMessages", temp)
      // }
    },
    getUnreadCount() {
      const rooms = { ...self.rooms }
      let count = 0
      Object.keys(rooms).forEach((key) => {
        const latestMessageId = this.getLatestMessageForRoom(key).id
        console.log("LATEST MESSAGE ID :", latestMessageId, rooms[key])
        if (latestMessageId !== rooms[key]) count++
      })
      console.log("UNREAD COUNT", count)
      return count
    },
    setLastReadId(roomId: string, latestMessageId: string) {
      const rooms = { ...self.rooms }
      console.log("roomId:roomId:setLastReadId", roomId, latestMessageId)
      rooms[roomId] = latestMessageId
      self.rooms = rooms
      console.log("rooomsghjgkjhg", self.rooms)
      console.log("rooomsghjgkjhg", self.rooms)
    },
    async addToMessages(props: { roomId: string; message: any }) {
      console.log("ADDING to room:self.chatMessages", self.chatMessages)
      console.log("self.chatMessages[props.roomId]", self.chatMessages[props.roomId])
      // if (self.chatMessages[props.roomId].length > 0) {
      console.log("ADDING to room", props)
      const temp = { ...self.chatMessages }
      temp[props.roomId] = [props.message, ...(self.chatMessages?.[props.roomId] || [])]
      self.setProp("chatMessages", temp)
      console.log("ADDED TO MESSAGES SUCCESSFULLY")
      this.syncUnreadCount()
    },
    syncUnreadCount() {
      const count = this.getUnreadCount()
      self.setProp("unreadCount", count)
    },
    roomChatsAvailable(props: { roomId: string }) {
      return self.chatMessages ? self.chatMessages[props.roomId]?.length > 0 : false
    },
    addToChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms, self.allChatRooms]
    },
    clear() {
      self.allChatRooms = []
    },
    getLatestMessageForRoom(roomId: string) {
      const room = self.allChatRooms.filter((room) => room?._id === roomId)[0]
      console.log("xxxgetLatestMessageForRoomxxx", JSON.stringify(room))
      console.log("xxxgetLatestMessageForRoomxxx ALL CHATS", JSON.stringify(self.allChatRooms))
      if (self.chatMessages[roomId]?.length > 0) {
        const latestMessage = self.chatMessages[roomId][0]
        console.log("LATEST MESSAGE FOR ROOM : ", roomId, latestMessage)
        return {
          id: latestMessage?._id,
          message: latestMessage?.text,
          time: new Date(latestMessage?.createdAt),
        }
      } else {
        const room = self.allChatRooms.filter((room) => room?._id === roomId)[0]
        const latestMessage = room?.latestMessage
        console.log("LATEST MESSAGE FOR ROOM : ", roomId, latestMessage)
        return {
          id: latestMessage?._id,
          message: latestMessage?.text,
          time: new Date(latestMessage?.createdAt),
        }
      }
    },
  }))
  .views((store) => ({
    get getAllChatRooms() {
      return store.allChatRooms
    },
  }))

export interface ChatRoomStore extends Instance<typeof ChatRoomStoreModel> {}
export interface ChatRoomStoreSnapshot extends SnapshotOut<typeof ChatRoomStoreModel> {}
