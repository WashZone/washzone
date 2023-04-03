import App from "./app/app.tsx"
import React, { useEffect, useCallback } from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"
import messaging from "@react-native-firebase/messaging"
import { IncomingCallHook } from "./app/utils/incomingCall"
import { CallTypes, useHooks } from "./app/screens/hooks"
import { navigationRef } from "./app/navigators"
import { formatName } from "./app/utils/formatName"
import { Role } from "./app/screens"
import { debounce } from "lodash"

function IgniteApp() {
  const { backToForeground, endIncomingcallAnswer, displayIncomingCall, configure, endAllCall } =
    IncomingCallHook()
  const { getRoomById, getUserById, sendSilentAlert } = useHooks()

  const navigateVideo = useCallback(
    debounce((room, roomId, receiverData) => {
      navigationRef.navigate("VideoCall", {
        offer: room?.offer,
        receiver: receiverData,
        role: Role.receiver,
        roomId,
      })
    }, 1500),
    [],
  )

  const navigateAudio = useCallback(
    debounce((room, roomId, receiverData) => {
      navigationRef.navigate("AudioCall", {
        offer: room?.offer,
        receiver: receiverData,
        role: Role.receiver,
        roomId,
      })
    }, 1500),
    [],
  )

  const callListener = async (remoteMessage) => {
    const { data } = remoteMessage
    const { type, receiver, roomId } = data
    const { name, _id, setter } = JSON.parse(receiver)
    
    console.log("INDEX>JS MODE type", type, name, receiver)
    if (setter) {
      console.log("SETTER IDENTIFIED")
      return
    }

    switch (type) {
      case CallTypes.answer: {
        const res = await getRoomById(roomId)
        console.log("RECEIVEd AN ANSWER FROM : ", roomId)
        navigationRef.current.setParams({ answer: res?.answer })
        break
      }
      case CallTypes.hangup: {
        navigationRef.current.setParams({ cancelled: true })
        endAllCall()
        break
      }
      case CallTypes.videoOffer: {
        const incomingCallAnswer = async () => {
          backToForeground()
          const res = await getRoomById(roomId)
          const receiverData = await getUserById(_id)

          console.log("Current Screen", navigationRef.getCurrentRoute())

          navigateVideo(res, roomId, receiverData)
          console.log("navigationRef.current.getCurrentRoute")
          setTimeout(() => {
            if (navigationRef.current.getCurrentRoute()?.name === "VideoCall") {
              console.log("SETTING PARAMS ON Video CALL")
              navigationRef.setParams({
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              })
            } else {
              console.log("Navigating to Video Call")

              navigationRef.navigate("VideoCall", {
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              })
            }
          }, 1000)

          // setTimeout(() => {}, 1000)
        }

        const endIncomingCall = async () => {
          endIncomingcallAnswer()
          const res = await getUserById(_id)
          sendSilentAlert(res?.notificationToken, CallTypes.hangup, roomId)
        }

        configure(incomingCallAnswer, endIncomingCall)
        displayIncomingCall(formatName(name), type === CallTypes.videoOffer)

        break
      }
      case CallTypes.audioOffer: {
        const incomingCallAnswer = async () => {
          backToForeground()
          const res = await getRoomById(roomId)
          const receiverData = await getUserById(_id)

          console.log("Current Screen", navigationRef.getCurrentRoute())
          navigateAudio(res, roomId, receiverData)

          setTimeout(() => {
            if (navigationRef.current.getCurrentRoute()?.name === "AudioCall") {
              console.log("SETTING PARAMS ON AUDIO CALL")
              navigationRef.setParams({
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              })
            } else {
              console.log("Navigating to  AUDIO CALL")
              navigationRef.navigate("AudioCall", {
                offer: res?.offer,
                receiver: receiverData,
                role: Role.receiver,
                roomId,
              })
            }
          }, 1000)

          // setTimeout(() => {}, 1000)
        }

        const endIncomingCall = async () => {
          endIncomingcallAnswer()
          const res = await getUserById(_id)
          sendSilentAlert(res?.notificationToken, CallTypes.hangup, roomId)
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
