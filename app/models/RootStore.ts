import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./UserStore"
import { RootStore as APIRootStore, usersChatModelPrimitives } from "./api"
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
import { CallStoreModel } from "./CallStore"
import { NotificationStoreModel } from "./NotificationStore"

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
    allChats: types.optional(ChatRoomStoreModel, { unreadCount: 0 }),
    classfieds: types.optional(ClassifiedStoreModel, {}),
    videos: types.optional(VideosStoreModel, {}),
    saved: types.optional(SavedStoreModel, {}),
    settings: types.optional(SettingsStoreModel, {}),
    interaction: types.optional(InteractionStoreModel, {}),
    api: types.optional(APIRootStore, {}),
    searchStore: types.optional(SearchStoreModel, {}),
    notificationStore: types.optional(NotificationStoreModel, { lastReadDate: "" }),
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
      self.api.subscribeNewuserchat(
        { userId: self.userStore._id },
        usersChatModelPrimitives
          .roomId("_id")
          .authorId("_id")
          .metaData("metaDataType data classifiedId")
          .toString(),
        // Handling New Message Arrival
        async (message) => {
          console.log("NEW MESSAGE", message)
          const isNewRoom =
            !self.allChats.chatMessages[message?.roomId?._id]?.length ||
            self.allChats.chatMessages[message?.roomId?._id]?.length === 0
          if (isNewRoom) {
            const res = await self.api.mutateGetroomByUsers({ memberId: self.userStore._id })
            self.allChats.setChatRooms(res.getroomByUsers?.data)
          }
          setTimeout(
            () =>
              message?.roomId &&
              self.allChats.addToMessages({
                roomId: message?.roomId?._id as string,
                message,
              }),
            isNewRoom ? 2000 : 0,
          )
        },
        (err) => console.log("ERRR", err),
      )
    },
  }))

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
