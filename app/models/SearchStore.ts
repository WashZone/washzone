import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const SearchResults = types.model({
  classifieds: types.optional(types.frozen(), []),
  users: types.optional(types.frozen(), []),
  topics: types.optional(types.frozen(), []),
  videos: types.optional(types.frozen(), []),
})

export const SearchStoreModel = types
  .model("SearchStore")
  .props({
    searchKey: types.optional(types.string, ""),
    searchResults: types.optional(SearchResults, {}),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    isEmpty(){
      let empty =  true;
      if(self.searchResults.classifieds?.length > 0) {empty = false}
      if(self.searchResults.users?.length > 0) {empty = false}
      if(self.searchResults.topics?.length > 0) {empty = false}
      if(self.searchResults.videos?.length > 0) {empty = false}
      return empty
    },
    setResults({
      classifieds,
      users,
      topics,
      videos,
    }: {
      classifieds: any[]
      users: any[]
      topics: any[]
      videos: any[]
    }) {
      self.setProp("searchResults", {
        classifieds,
        topics,
        users,
        videos,
      })
    },
    setSearchKey(value: string) {
      self.searchKey = value
    },
  }))

export interface SearchStore extends Instance<typeof SearchStoreModel> {}
export interface SearchStoreSnapshot extends SnapshotOut<typeof SearchStoreModel> {}
