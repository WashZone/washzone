import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ChatRoomStoreModel = types
  .model("ChatRoomStore")
  .props({
    allChatRooms: types.frozen([]),
    chatMessages: types.frozen({}),
    lastRead: types.frozen({}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms]
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
    async addToMessages(props: { roomId: string; message: any }) {
      console.log("ADDING to room:self.chatMessages", self.chatMessages)
      console.log("self.chatMessages[props.roomId]", self.chatMessages[props.roomId])
      // if (self.chatMessages[props.roomId].length > 0) {
      console.log("ADDING to room", props)
      const temp = { ...self.chatMessages }
      temp[props.roomId] = [props.message, ...(self.chatMessages?.[props.roomId] || [])]
      self.setProp("chatMessages", temp)
      console.log("ADDED TO MESSAGES SUCCESSFULLY")
    },
    roomChatsAvailable(props: { roomId: string }) {
      return self.chatMessages ? self.chatMessages[props.roomId]?.length > 0 : false
    },
    addToChatRooms(chatRooms: any) {
      self.allChatRooms = [...chatRooms, self.allChatRooms]
    },
    setLastReadMessageIdForRoom(roomId: string) {
      console.log("LAST MEESAGE FOR ROOM ", roomId, self.chatMessages[roomId])
      if (self.chatMessages[roomId]?.length > 0) {
        console.log("LAST MEESAGE FOR ROOM ", roomId, self.chatMessages[roomId][0]?._id)
        // self.lastRead[roomId] = self.chatMessages[roomId][0]?._id
      }
    },
    clear() {
      self.allChatRooms = []
    },
  }))
  .views((store) => ({
    get getAllChatRooms() {
      return store.allChatRooms
    },
    getLatestMessageForRoom(roomId: string) {
      const room = store.allChatRooms.filter((room) => room?._id === roomId)[0]
      console.log("xxxgetLatestMessageForRoomxxx", JSON.stringify(room))
      console.log("xxxgetLatestMessageForRoomxxx ALL CHATS", JSON.stringify(store.allChatRooms))

      if (store.chatMessages[roomId]?.length > 0) {
        const latestMessage = store.chatMessages[roomId][0]
        console.log("LATEST MESSAGE FOR ROOM : ", roomId, latestMessage)
        return { message: latestMessage?.text, time: new Date(latestMessage?.createdAt) }
      } else {
        const room = store.allChatRooms.filter((room) => room?._id === roomId)[0]
        const latestMessage = room?.latestMessage
        console.log("LATEST MESSAGE FOR ROOM : ", roomId, latestMessage)
        return { message: latestMessage?.text, time: new Date(latestMessage?.createdAt) }
      }
    },
    // getUnreadCount() {
    //   console.log("Reading Unread COUNT : ",store.lastRead)

    //   const keys = Object.keys(store.lastRead)
    //   console.log(keys)
    //   let count = 0
    //   keys.forEach((key) => {
    //     if (!this.isRead(key)) count++
    //   })
    //   console.log("TOTAL UNREAD COUNT : ", count)
    //   return count
    // },
    // isRead(roomId: string) {
    //   console.log(
    //     "Reading Last read for room : ",
    //     roomId,
        
    //     store.lastRead,
    //   )

    //   if (store.lastRead[roomId]) {
    //     const latestMessageId = ''
    //     const lastReadId = store.lastRead[roomId]
    //     console.log(
    //       "IS READ FOR : ",
    //       roomId,
    //       " FOUND : LAST READ : ",
    //       lastReadId,
    //       " : Latest Message : ",
    //       latestMessageId,
    //     )
    //     return latestMessageId === lastReadId
    //   }
    //   console.log("IS READ FOR : ", roomId, " NOT FOUND")
    //   return false
    // },

  }))

export interface ChatRoomStore extends Instance<typeof ChatRoomStoreModel> {}
export interface ChatRoomStoreSnapshot extends SnapshotOut<typeof ChatRoomStoreModel> {}
