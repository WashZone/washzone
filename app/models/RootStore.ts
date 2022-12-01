import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./UserStore"
import { RootStore as APIRootStore } from './api'
import { createHttpClient } from "mst-gql"
import { FeedStoreModel } from "./FeedStore"



const baseURL = 'https://28ec-150-129-144-58.ngrok.io'

export const env = {
  gqlHttpClient: createHttpClient(`${baseURL}/graphql`),
}


/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  feedStore: types.optional(FeedStoreModel, {}),
  api: types.optional(APIRootStore,{})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
