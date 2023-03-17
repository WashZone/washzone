import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CallStoreModel = types
  .model("CallStore")
  .props({
    ongoingCall: types.boolean,
    offer: types.string,
    answer: types.string,
    status: types.string,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setOngoingCall(status: boolean) {
      console.log("SETTING CALL TO", status)
      self.ongoingCall = status
    },
    setStatus(status: string) {
      if (self.ongoingCall) self.status = status
    },
    setOffer(offer: string) {
      if (self.ongoingCall) self.offer = offer
    },
    setAnswer(answer: string) {
      if (self.ongoingCall) self.answer = answer
    },
    clear() {
      self.ongoingCall = false
      self.answer = ""
      self.offer = ""
    },
    clearJustData() {
      self.answer = ""
      self.offer = ""
    },
  }))
  .views((store) => ({
    get getAnswer() {
      return store.answer
    },
    get getOffer() {
      return store.offer
    },
  }))

export interface CallStore extends Instance<typeof CallStoreModel> {}
export interface CallStoreSnapshot extends SnapshotOut<typeof CallStoreModel> {}
