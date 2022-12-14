import { Instance } from "mobx-state-tree"
import { ChannelListModelBase } from "./ChannelListModel.base"

/* The TypeScript type of an instance of ChannelListModel */
export interface ChannelListModelType extends Instance<typeof ChannelListModel.Type> {}

/* A graphql query fragment builders for ChannelListModel */
export { selectFromChannelList, channelListModelPrimitives, ChannelListModelSelector } from "./ChannelListModel.base"

/**
 * ChannelListModel
 */
export const ChannelListModel = ChannelListModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
