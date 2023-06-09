import { Instance } from "mobx-state-tree"
import { LastReadModelBase } from "./LastReadModel.base"

/* The TypeScript type of an instance of LastReadModel */
export interface LastReadModelType extends Instance<typeof LastReadModel.Type> {}

/* A graphql query fragment builders for LastReadModel */
export { selectFromLastRead, lastReadModelPrimitives, LastReadModelSelector } from "./LastReadModel.base"

/**
 * LastReadModel
 */
export const LastReadModel = LastReadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
