import { useState } from "react"
import { Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"
import uuid from "react-native-uuid"
const randomUUID = 'e9ca07a4-8346-44d2-bf71-633f79fbdde3'
export const IncomingCallHook = () => {

  const [currentCallId, setCurrentCallId] = useState(null)

  const muteCall = () => RNCallKeep.setMutedCall(randomUUID, true)

  const unmuteCall = () => RNCallKeep.setMutedCall(randomUUID, false)

  const configure = (incomingcallAnswer, endIncomingCall) => {
    try {
      // setupCallKeep()
      Platform.OS === "android" && RNCallKeep.setAvailable(true)
      RNCallKeep.addEventListener("answerCall", () => {
        incomingcallAnswer();
        RNCallKeep.setCurrentCallActive(randomUUID);
      })
      RNCallKeep.addEventListener("endCall", endIncomingCall)
    } catch (error) {
      console.error("initializeCallKeep error:", error?.message)
    }
  }

  // Use startCall to ask the system to start a call - Initiate an outgoing call from this point
  const startCall = ({ handle, localizedCallerName }) => {
    // Your normal start call action
    RNCallKeep.startCall(getCurrentCallId(), handle, localizedCallerName)
  }

  const reportEndCallWithUUID = (callUUID, reason) => {
    RNCallKeep.reportEndCallWithUUID(callUUID, reason)
  }

  // These method will end the incoming call
  const endIncomingcallAnswer = () => {
    RNCallKeep.endCall(randomUUID)
    setCurrentCallId(null)
    removeEvents()
  }

  // These method will remove all the event listeners
  const removeEvents = () => {
    RNCallKeep.removeEventListener("answerCall")
    RNCallKeep.removeEventListener("endCall")
  }

  // These method will display the incoming call
  const displayIncomingCall = (callerName, isVideo) => {
    Platform.OS === "android" && RNCallKeep.setAvailable(false)

    RNCallKeep.displayIncomingCall(
      randomUUID,
      callerName,
      callerName,
      "number",
      isVideo,
      null,
    )
  }

  // Bring the app to foreground
  const backToForeground = () => {
    RNCallKeep.backToForeground()
  }

  // Return the ID of current Call
  const getCurrentCallId = () => {
    if (!currentCallId) {
      setCurrentCallId(uuid.v4())
    }
    return currentCallId
  }

  // These Method will end the call
  const endAllCall = () => {
    // RNCallKeep.endAllCalls()
    RNCallKeep.endCall(randomUUID)
    setCurrentCallId(null)
    removeEvents()
  }

  return {
    // setupCallKeep,
    configure,
    startCall,
    endAllCall,
    backToForeground,
    displayIncomingCall,
    endIncomingcallAnswer,
    reportEndCallWithUUID,
    unmuteCall,
    muteCall
  }
}

