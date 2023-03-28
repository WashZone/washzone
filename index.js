import App from "./app/app.tsx"
import React, { useEffect } from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"
import messaging from "@react-native-firebase/messaging"
import { IncomingCallHook } from "./app/utils/incomingCall"
import { CallTypes, useHooks } from "./app/screens/hooks"
import { navigationRef } from "./app/navigators"
import { formatName } from "./app/utils/formatName"
import { Role } from "./app/screens"

function IgniteApp() {
  const { backToForeground, endIncomingcallAnswer, displayIncomingCall, configure, endAllCall } =
    IncomingCallHook()
  const { getRoomById, getUserById } = useHooks()

  const callListener = async (remoteMessage) => {
    const { data } = remoteMessage
    const { type, receiver, roomId } = data
    const { name, _id } = JSON.parse(receiver)
    switch (type) {
      case CallTypes.answer: {
        const res = await getRoomById(roomId)
        navigationRef.current.setParams({ answer: res?.answer })
        break
      }
      case CallTypes.hangup: {
        navigationRef.current.setParams({ cancelled: true })
        endAllCall()
        break
      }
      case CallTypes.audioOffer: {
        const incomingCallAnswer = async () => {
          backToForeground()
          const res = await getRoomById(roomId)
          const receiverData = await getUserById(_id)

          setTimeout(
            () =>
              navigationRef.navigate("CallScreen", {
                mode: "audio",
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              }),
            1000,
          )
        }

        const endIncomingCall = () => {
          endIncomingcallAnswer()
        }

        configure(incomingCallAnswer, endIncomingCall)
        displayIncomingCall(formatName(name), type === CallTypes.videoOffer)
        break
      }
      case CallTypes.videoOffer: {
        const incomingCallAnswer = async () => {
          backToForeground()
          const res = await getRoomById(roomId)
          const receiverData = await getUserById(_id)

          setTimeout(
            () =>
              navigationRef.navigate("CallScreen", {
                mode: "video",
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              }),
              1000,
          )
        }

        const endIncomingCall = () => {
          endIncomingcallAnswer()
        }

        configure(incomingCallAnswer, endIncomingCall)
        displayIncomingCall(formatName(name), type === CallTypes.videoOffer)
        // backToForeground()
        break
      }
    }
  }

  useEffect(() => {
    messaging().setBackgroundMessageHandler(callListener)
    messaging().onMessage(callListener)
  }, [])
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("WashZone", () => gestureHandlerRootHOC(IgniteApp))
export default App
