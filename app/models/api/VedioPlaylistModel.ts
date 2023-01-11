import { Instance } from "mobx-state-tree"
import { VedioPlaylistModelBase } from "./VedioPlaylistModel.base"

/* The TypeScript type of an instance of VedioPlaylistModel */
export interface VedioPlaylistModelType extends Instance<typeof VedioPlaylistModel.Type> {}

/* A graphql query fragment builders for VedioPlaylistModel */
export { selectFromVedioPlaylist, vedioPlaylistModelPrimitives, VedioPlaylistModelSelector } from "./VedioPlaylistModel.base"

/**
 * VedioPlaylistModel
 */
export const VedioPlaylistModel = VedioPlaylistModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
