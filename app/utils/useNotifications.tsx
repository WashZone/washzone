import messaging from "@react-native-firebase/messaging"

export const notificationHandler = async () => {
  await messaging().requestPermission()


  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
  }
}
