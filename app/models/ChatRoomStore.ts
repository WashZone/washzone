import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { useHooks } from "../screens/hooks"
import { fromNow } from "../utils/agoFromNow"
import { useStores } from "./helpers/useStores"
import { withSetPropAction } from "./helpers/withSetPropAction"

const onRoomNotFound = async () => {
  const { syncAllChats } = useHooks()
  await syncAllChats()
}

export const ChatRoomStoreModel = types
  .model("ChatRoomStore")
  .props({
    allChatRooms: types.frozen([]),
    chatMessages: types.frozen({}),
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
        console.log("PARSED MESSAGES", parsedMessages.length)
        return parsedMessages
      }
      return []
    },
    // async getMore(roomId: string) {
    //   const page = parseInt((self.chatMessages[roomId].length / 10).toString())
    //   console.log("PAGE", page)

    //     const page = parseInt((self.chatMessages[roomId].length / 10).toString())
    //     console.log("PAGE", page)

    //   // if (self.chatMessages) {
    //   //   const parsedMessages = this.roomChatsAvailable({ roomId: props.roomId })
    //   //     ? self.chatMessages[props.roomId].map((i: any) => {
    //   //         return {
    //   //           ...i,
    //   //           id: i._id,
    //   //           author: { ...i?.authorId, id: i?.authorId?._id, imageUrl: i?.authorId?.picture },
    //   //           type: i?.messageType || "text",
    //   //         }
    //   //       })
    //   //     : []
    //   //   console.log("PARSED MESSAGES", parsedMessages.length)
    //   //   return parsedMessages
    //   // }
    //   // return []
    // },
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
      // console.log("self.chatMessages[props.roomId]", self.chatMessages[props.roomId])
      // if (self.chatMessages[props.roomId].length > 0) {
      console.log("ADDING to room", props)
      const temp = { ...self.chatMessages }
      temp[props.roomId] = [props.message, ...self.chatMessages[props.roomId]]
      self.setProp("chatMessages", temp)
      // }
      // else {
      //   console.log("ALL CHAT MESSAGES", self.chatMessages)
      //   // await onRoomNotFound()
      //   const temp = { ...self.chatMessages }
      //   temp[props.roomId] = [props.message]
      //   self.setProp("chatMessages", temp)
      //   console.log("chatMessages New Message", temp)
      // }
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
        console.log("LATEST MESSAGE SSSS MEESSAGES FOUND " , latestMessage)
        return { message: latestMessage?.text, time: new Date(latestMessage?.createdAt) }
      } else {
        const room = store.allChatRooms.filter((room) => room?._id === roomId)[0]
        const latestMessage = room?.latestMessage
        console.log("LATEST MESSAGE SSSS MEESSAGES NOT FOUND", latestMessage)
        return { message: latestMessage?.text, time: new Date(latestMessage?.createdAt) }
      }
    },
  }))

export interface ChatRoomStore extends Instance<typeof ChatRoomStoreModel> {}
export interface ChatRoomStoreSnapshot extends SnapshotOut<typeof ChatRoomStoreModel> {}
