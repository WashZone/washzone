import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {configureNotifications} from './app/utils/useNotifications'
import RNCallKeep from "react-native-callkeep"
import messaging from '@react-native-firebase/messaging'
import { IncomingCallHook } from "./app/utils/incomingCall";



const callListener = async (remoteMessage) => {
  const { backToForeground, endIncomingcallAnswer, displayIncomingCall, configure } =
  IncomingCallHook()
// const { callerInfo, type, mode } = JSON.parse(remoteMessage.data.info)
console.log('REMOTEMESSAGE : ',JSON.stringify(remoteMessage) )
// Linking.openURL(`com.washzone://incomingcall/video/`)

// if (type === messageMetadataType.incomingCallOfferVideo) {
  const incomingCallAnswer = ({ callUUID }) => {
    console.log("UUID", callUUID)
    backToForeground()
    // updateCallStatus({
    //   callerInfo,
    //   type: "ACCEPTED",
    // });
    endIncomingcallAnswer()
    Linking.openURL(`com.washzone://incomingcall/video/`).catch((err) => {
      // Toast.show(`Error`, err);
      console.log(err)
    })
  }

  const endIncomingCall = () => {
    endIncomingcallAnswer()
    // updateCallStatus({ callerInfo, type: "REJECTED" });
  }

  configure(incomingCallAnswer, endIncomingCall)
  // displayIncomingCall(callerInfo.name)
  displayIncomingCall("TEST JIRAZO")
  backToForeground()
// }
}
messaging().setBackgroundMessageHandler(callListener);

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}


AppRegistry.registerComponent("WashZone", () => gestureHandlerRootHOC(IgniteApp))
export default App
