import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import moment from "moment"

export const ChatRoomStoreModel = types
  .model("ChatRoomStore")
  .props({
    allChatRooms: types.frozen([]),
    chatMessages: types.frozen({}),
    rooms: types.frozen({}),
    unreadCount: types.number,
    myUserId: types.string
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setMyUserId(id: string) {
      self.myUserId = id
    },
    getChatRooms() {
      const res = self.allChatRooms.filter(i => !this.getLatestMessageForRoom(i?._id).isEmpty)
      return res
    },
    setChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms]
      this.syncLastReadOnRooms()
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
      const temp = { ...self.chatMessages }

      temp[props.roomId] = [
        ...temp[props.roomId].slice(0, props.previousPage * 20 + 1),
        ...props.messages,
      ]

      self.setProp("chatMessages", temp)
      // }
    },
    getUnreadCount() {
      const rooms = { ...self.rooms }
      let count = 0
      Object.keys(rooms).forEach((key) => {
        const latestMessage = this.getLatestMessageForRoom(key)
        if (latestMessage.id !== rooms[key] && !latestMessage.isEmpty && latestMessage.authorId !== self.myUserId) count++
      })
      return count
    },
    setLastReadId(roomId: string, latestMessageId: string) {
      const rooms = { ...self.rooms }
      rooms[roomId] = latestMessageId
      self.rooms = rooms
      this.syncUnreadCount()
    },
    async addToMessages(props: { roomId: string; message: any }) {
      // if (self.chatMessages[props.roomId].length > 0) {
      const temp = { ...self.chatMessages }
      temp[props.roomId] = [props.message, ...(self.chatMessages?.[props.roomId] || [])]
      self.setProp("chatMessages", temp)
      this.syncUnreadCount()
    },
    syncLastReadOnRooms() {
      const temp = {}
      self.allChatRooms.forEach((i) => {
        temp[i?._id] = self.rooms[i?._id]
      })
      self.setProp("rooms", temp)
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
      // Getting the latest Message from the room Object !
      const room = self.allChatRooms.filter((room) => room?._id === roomId)[0]

      const latestMessageFromRoomObject = {
        id: room?.latestMessage?._id,
        message: room?.latestMessage?.text || "sent a media !",
        time: new Date(room?.latestMessage?.createdAt),
        isEmpty: room?.latestMessage?.membersId?.length === 0,
        authorId: room?.latestMessage?.authorId
      }

      // If we have never opened the room, then just return the latest message from the Room Object
      if (!(self.chatMessages[roomId]?.length > 0)) return latestMessageFromRoomObject

      // If not, then get the latest message from the actual chats that keeps getting synced via the Subscription
      const latestMessageFromChatMessagesForRoom = {
        id: self.chatMessages[roomId][0]?._id,
        message: self.chatMessages[roomId][0]?.text,
        time: new Date(self.chatMessages[roomId][0]?.createdAt),
        isEmpty: false,
        authorId: self.chatMessages[roomId][0]?.authorId?._id
      }

      // return whichever message is the latest
      if (
        moment(latestMessageFromChatMessagesForRoom.time).isAfter(
          moment(latestMessageFromRoomObject.time),
        )
      ) {
        return latestMessageFromChatMessagesForRoom
      }

      return latestMessageFromRoomObject
    },
  }))
  .views((store) => ({
    get getAllChatRooms() {
      return store.allChatRooms
    },
    getRoomDetails(id: string) {
      const res = store.allChatRooms.filter(i => i?._id === id)
      return res?.[0]
    },
  }))

export interface ChatRoomStore extends Instance<typeof ChatRoomStoreModel> { }
export interface ChatRoomStoreSnapshot extends SnapshotOut<typeof ChatRoomStoreModel> { }
