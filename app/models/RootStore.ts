import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./UserStore"
import { RootStore as APIRootStore } from "./api"
import { createHttpClient } from "mst-gql"
import { FeedStoreModel } from "./FeedStore"
import { TopicsStoreModel } from "./TopicsStore"
import { ClassifiedStoreModel } from "./ClassifiedStore"
import { VideosStoreModel } from "./VideosStore"
import { SavedStoreModel } from "./SavedStore"
import { SettingsStoreModel } from "./SettingsStore"
import { InteractionStoreModel } from "./InteractionStore"
import { SearchStoreModel } from "./SearchStore"

const baseURL = "http://3.138.137.129:3002"

export const env = {
  gqlHttpClient: createHttpClient(`${baseURL}/graphql`),
}

export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  feedStore: types.optional(FeedStoreModel, {}),
  topics: types.optional(TopicsStoreModel, {}),
  classfieds: types.optional(ClassifiedStoreModel, {}),
  videos: types.optional(VideosStoreModel, {}),
  saved: types.optional(SavedStoreModel, {}),
  settings: types.optional(SettingsStoreModel, {}),
  interaction: types.optional(InteractionStoreModel, {}),
  api: types.optional(APIRootStore, {}),
  searchStore: types.optional(SearchStoreModel, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
