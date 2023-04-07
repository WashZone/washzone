import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import moment from "moment"

export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({
    notifications: types.frozen([]),
    lastReadDate: types.string,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setNotifications(notifications: any[]) {
      self.notifications = notifications
    },
    setLastRead(lastReadDate: string) {
      self.lastReadDate = lastReadDate
    },
  }))
  .views((self) => ({
    getUnreadCount() {
      console.log("SELF>LASTREAD", self.lastReadDate)
      if (self.lastReadDate === "") return "0"
      let count = 0
      self.notifications.forEach((i) => {
        if (moment(i?.createdAt).isAfter(moment(self.lastReadDate))) count++
      })
      if (count === 10) return "9+"
      return count.toString()
    },
  }))

export interface NotificationStore extends Instance<typeof NotificationStoreModel> {}
export interface NotificationStoreSnapshot extends SnapshotOut<typeof NotificationStoreModel> {}
