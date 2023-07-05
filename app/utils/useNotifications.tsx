// import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from "@notifee/react-native"
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"

import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { useHooks } from "../screens/hooks"
import { IncomingCallHook } from "./incomingCall"
import * as Linking from "expo-linking"
import { messageMetadataType } from "./constants"
import { useEffect } from "react"
import { Alert } from "react-native"

const configureNotifications = () => {


  //  const  { updateNotificationToken} = useHooks()
  // const configure =() => PushNotification.configure({
  //   onRegister: function (token) {
  //     // process token
  //     //  updateNotificationToken(token)
  //     console.log("TOKEN", token)
  //   },

  //   onNotification: function (notification) {
  //     // process the notification
  //     // required on iOS only
  //     notification.finish(PushNotificationIOS.FetchResult.NoData)
  //   },

  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   popInitialNotification: true,
  //   requestPermissions: true,
  // })
  return { callListener }
}

export { configureNotifications }

// async function displayNotification({ title, body }: { title: string; body: string }) {
//   // Create a channel required for Android Notifications
//   const channelId = await notifee.createChannel({
//     id: "default",
//     name: "Default Channel",
//   })

//   // Required for iOS
//   // See https://notifee.app/react-native/docs/ios/permissions
//   await notifee.requestPermission()

//   // Display a notification
//   const notificationId = notifee.displayNotification({
//     // id: "string" | updates Notification instead if provided id already exists
//     title: title,
//     body: body,
//     android: {
//       channelId,
//       /* smallIcon: "smallIcon" | defaults to 'ic_launcher', respectively your app icon. */
//     },
//   })
//   return notificationId
// }

// export const useNotification = () => {
//   async function displayTriggerNotification(
//     title: string,
//     body: string,
//     timestamp: number,
//     repeatFrequency: RepeatFrequency | undefined = undefined,
//   ) {
//     // Create a channel required for Android Notifications
//     const channelId = await notifee.createChannel({
//       id: "default",
//       name: "Default Channel",
//     })

//     // Create a time-based trigger
//     const trigger: TimestampTrigger = {
//       type: TriggerType.TIMESTAMP,
//       timestamp: timestamp, // fire at the provided date
//       repeatFrequency: repeatFrequency, // repeat the notification on a hourly/daily/weekly basis
//     }
//     // Please note, for iOS, a repeating trigger does not work the same as Android - the initial trigger cannot be delayed
//     // See https://notifee.app/react-native/docs/triggers

//     // You can also use Intervall triggers
//     /*
//     const trigger: IntervalTrigger = {
//       type: TriggerType.INTERVAL,
//       interval: 30
//       timeUnit: TimeUnit.MINUTES
//     };
//     */

//     // Create a trigger notification
//     const triggerNotificationId = await notifee.createTriggerNotification(
//       {
//         // id: "string" | updates Notification instead if provided id already exists
//         title: title,
//         body: body,
//         android: {
//           channelId,
//         },
//       },
//       trigger, // use displayNotification to update triggerNotifications which trigger already fired
//     )
//     return triggerNotificationId
//   }

//   // get all trigger notifications
//   async function getTriggerNotificationIds() {
//     const triggerNotificationIds = await notifee.getTriggerNotificationIds()
//     return triggerNotificationIds
//   }

//   // cancel all or specific trigger notifications
//   async function cancelTriggerNotifications(notificationIds: string[] | undefined) {
//     await notifee.cancelTriggerNotifications(notificationIds)
//   }

//   // cancel all notifications
//   async function cancelAllNotifications(): Promise<void> {
//     await notifee.cancelAllNotifications()
//   }

//   // cancel notification via notificationId or tag
//   async function cancelNotification(notificationId: string, tag: string | undefined = undefined) {
//     await notifee.cancelNotification(notificationId, tag)
//   }

//   // There are way more methods I didn't cover here that can help you in various scenarios
//   // See https://notifee.app/react-native/reference

//   return {
//     displayNotification,
//     displayTriggerNotification,
//     getTriggerNotificationIds,
//     cancelTriggerNotifications,
//     cancelAllNotifications,
//     cancelNotification,
//   }
// }

// const onMessageReceived = async (message: any) => {
//     console.log("MESSAGE onMessageReceivedonMessageReceived", message)
//   await displayNotification({ title: "TEST", body: 'TEST' })
// }

export const notificationHandler = async () => {
  await messaging().requestPermission()
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL

  // if (enabled) {
  // }

  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
  }


  // messaging().onMessage(onMessageReceived)
  // messaging().setBackgroundMessageHandler(onMessageReceived)

  // Get the token
}
