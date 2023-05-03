/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { HomePageDetailModel, HomePageDetailModelType } from "./HomePageDetailModel"
import { HomePageDetailModelSelector } from "./HomePageDetailModel.base"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * FlagsBase
 * auto generated base class for the model FlagsModel.
 */
export const FlagsModelBase = ModelBase
  .named('Flags')
  .props({
    __typename: types.optional(types.literal("flags"), "flags"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    postId: types.union(types.undefined, types.late((): any => HomePageDetailModel)),
    topicId: types.union(types.undefined, types.late((): any => TopicDetailModel)),
    classifiedId: types.union(types.undefined, types.late((): any => ClassifiedFeedModel)),
    type: types.union(types.undefined, types.null, types.string),
    flagsById: types.union(types.undefined, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class FlagsModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get type() { return this.__attr(`type`) }
  postId(builder: string | HomePageDetailModelSelector | ((selector: HomePageDetailModelSelector) => HomePageDetailModelSelector) | undefined) { return this.__child(`postId`, HomePageDetailModelSelector, builder) }
  topicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`topicId`, TopicDetailModelSelector, builder) }
  classifiedId(builder: string | ClassifiedFeedModelSelector | ((selector: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) | undefined) { return this.__child(`classifiedId`, ClassifiedFeedModelSelector, builder) }
  flagsById(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`flagsById`, UserModelSelector, builder) }
}
export function selectFromFlags() {
  return new FlagsModelSelector()
}

export const flagsModelPrimitives = selectFromFlags()._id.createdAt.updatedAt.type
