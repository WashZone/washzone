import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    _id: types.maybe(types.string),
    email: types.maybe(types.string),
    first_name: types.optional(types.string, ""),
    socialId: types.maybe(types.string),
    description: types.maybe(types.string),
    last_name: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    picture: types.optional(types.string, ""),
    isSocialLogin: types.optional(types.boolean, false),
    type: null || "facebook" || "google",
  })
  .actions((store) => ({
    setName(firstName?: string, lastName?: string) {
      store.first_name = firstName
      store.last_name = lastName
      store.name = firstName + " " + lastName
    },
    setPicture(value: string) {
      store.picture = value
    },
    setEmail(value: string) {
      store.email = value
    },
    logout() {
      store.email = ""
      store.first_name = ""
      store.last_name = ""
      store.name = ""
      store.picture = ""
      store.socialId = ""
      store.isSocialLogin = false
      store.type = null
    },
    setUser(user: any) {
      store.email = user?.email
      store.first_name = user?.first_name
      store.last_name = user?.last_name
      store.name = user?.name
      store.picture = user?.picture
      store.socialId = user?.socialId
      store.isSocialLogin = user?.isSocialLogin
      store.type = user?.type
      store._id=user?._id
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UsertoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}