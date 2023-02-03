/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * LegalitiesBase
 * auto generated base class for the model LegalitiesModel.
 */
export const LegalitiesModelBase = ModelBase
  .named('Legalities')
  .props({
    __typename: types.optional(types.literal("Legalities"), "Legalities"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    LegalitiesData: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LegalitiesModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get LegalitiesData() { return this.__attr(`LegalitiesData`) }
}
export function selectFromLegalities() {
  return new LegalitiesModelSelector()
}

export const legalitiesModelPrimitives = selectFromLegalities()._id.createdAt.updatedAt.LegalitiesData
