import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./UserStore"
import { RootStore as APIRootStore, selectFromUsersChat } from "./api"
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
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    subscribeAll() {
      console.log("SUBSCRIBING", self.userStore._id)
      self.api.subscribeNewuserchat(
        // { authorId: self.userStore._id },
        {},
        selectFromUsersChat()._id.toString(),
        (message) => {
          console.log("SUBSCRIBING", self.userStore._id)
          message?.roomId &&
            self.allChats.addToMessages({
              roomId: message?.roomId as string,
              message: message,
            })
        },
        (err) => console.log("ERRR", err),
      )
    },
  }))

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
