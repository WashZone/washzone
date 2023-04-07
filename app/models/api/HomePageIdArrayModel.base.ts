/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HomePageDetailModel, HomePageDetailModelType } from "./HomePageDetailModel"
import { HomePageDetailModelSelector } from "./HomePageDetailModel.base"
import { RootStoreType } from "./index"


/**
 * HomePageIdArrayBase
 * auto generated base class for the model HomePageIdArrayModel.
 */
export const HomePageIdArrayModelBase = ModelBase
  .named('HomePageIdArray')
  .props({
    __typename: types.optional(types.literal("HomePageIdArray"), "HomePageIdArray"),
    HomePageId: types.union(types.undefined, types.null, types.late((): any => HomePageDetailModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class HomePageIdArrayModelSelector extends QueryBuilder {
  HomePageId(builder: string | HomePageDetailModelSelector | ((selector: HomePageDetailModelSelector) => HomePageDetailModelSelector) | undefined) { return this.__child(`HomePageId`, HomePageDetailModelSelector, builder) }
}
export function selectFromHomePageIdArray() {
  return new HomePageIdArrayModelSelector()
}

export const homePageIdArrayModelPrimitives = selectFromHomePageIdArray()
