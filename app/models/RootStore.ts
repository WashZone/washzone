import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./UserStore"
import { RootStore as APIRootStore,  usersChatModelPrimitives } from "./api"
import { createHttpClient } from "mst-gql"
import { FeedStoreModel } from "./FeedStore"
import { TopicsStoreModel } from "./TopicsStore"
import { ClassifiedStoreModel } from "./ClassifiedStore"
import { VideosStoreModel } from "./VideosStore"
import { SavedStoreModel } from "./SavedStore"
import { SettingsStoreModel } from "./SettingsStore"
import { InteractionStoreModel } from "./InteractionStore"
import { SearchStoreModel } from "./SearchStore"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { ChatRoomStoreModel } from "./ChatRoomStore"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { navigationRef } from "../navigators"
import { Role } from "../screens"
import { messageMetadataType } from "../utils"
import { CallStoreModel } from "./CallStore"

const baseURL = "http://18.219.176.209:3002"

export const env = {
  gqlHttpClient: createHttpClient(`${baseURL}/graphql`),
  gqlWsClient: new SubscriptionClient("ws://18.219.176.209:3002/graphql", {
    reconnect: true,
  }),
}

export const RootStoreModel = types
  .model("RootStore")
  .props({
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    feedStore: types.optional(FeedStoreModel, {}),
    topics: types.optional(TopicsStoreModel, {}),
    allChats: types.optional(ChatRoomStoreModel, {}),
    classfieds: types.optional(ClassifiedStoreModel, {}),
    videos: types.optional(VideosStoreModel, {}),
    saved: types.optional(SavedStoreModel, {}),
    settings: types.optional(SettingsStoreModel, {}),
    interaction: types.optional(InteractionStoreModel, {}),
    api: types.optional(APIRootStore, {}),
    searchStore: types.optional(SearchStoreModel, {}),
    callStore: types.optional(CallStoreModel, {
      ongoingCall: false,
      offer: "",
      answer: "",
      status: "",
    }),
  })
  .actions(withSetPropAction)
  .actions((self) => ({

    subscribeAll() {
      console.log("SUBSCRIBING", self.userStore.name, self.userStore._id)
      // const navigation = useNavigation<NavigationProp<AppStackParamList>>()
      self.api.subscribeNewuserchat(
        // { authorId: self.userStore._id },
        { userId: self.userStore._id },
        usersChatModelPrimitives
          .roomId("_id")
          .authorId("_id")
          .metaData("metaDataType data classifiedId")
          .toString(),
        // Handling New Message Arrival
        async (message) => {
          // if(message.)
          /* eslint-disable */
          console.log("SUBSCRIBED", self.userStore.name, JSON.stringify(message))
          if (message?.authorId?._id !== self.userStore._id) {
            console.log("FIRS FOR LOOP IN TO message?.authorId?._id !== self.userStore._id")
            if (message?.metaData?.metaDataType === messageMetadataType.incomingCallOfferAudio) {
              navigationRef.navigate("CallScreen", {
                mode: "audio",
                receiverId: message?.authorId?._id,
                role: Role.receiver,
                roomId: message?.roomId?._id,
                offer: message?.metaData?.data,
              })
              // self.callStore.setOffer(message?.metaData?.data)
            }
            if (message?.metaData?.metaDataType === messageMetadataType.incomingCallOfferVideo) {
              navigationRef.navigate("CallScreen", {
                mode: "video",
                receiverId: message?.authorId?._id,
                role: Role.receiver,
                roomId: message?.roomId?._id,
                offer: message?.metaData?.data,
              })
              // self.callStore.setOffer(message?.metaData?.data)
            }
            if (message?.metaData?.metaDataType === messageMetadataType.incomingCallAnswer) {
              self.callStore.setAnswer(message?.metaData?.data)
              navigationRef.current.setParams({ answer: message?.metaData?.data })
            }
            if (message?.metaData?.metaDataType === messageMetadataType.hangUpCall) {
              // self.callStore.setOngoingCall(false)
              // navigationRef.current.setParams({ answer: message?.metaData?.data })
              navigationRef.current.setParams({ cancelled: true })
            }
          }
          console.log("roomId:chatMessages", message?.roomId?._id)
          console.log("allChats:chatMessages", self.allChats.chatMessages[message?.roomId?._id])
          const isNewRoom =  (!self.allChats.chatMessages[message?.roomId?._id]?.length)|| (self.allChats.chatMessages[message?.roomId?._id]?.length === 0) 
          if (isNewRoom) {
            const res = await self.api.mutateGetroomByUsers({ memberId: self.userStore._id })
            console.log("SYNCING ALL CHATS IN ROOTSTORE", JSON.stringify(res))
            self.allChats.setChatRooms(res.getroomByUsers?.data)
          }
         setTimeout( () =>  message?.roomId &&
            self.allChats.addToMessages({
              roomId: message?.roomId?._id as string,
              message: message,
            }), isNewRoom ? 2000 : 0)
        },
        (err) => console.log("ERRR", err),
      )
    },
  }))

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
