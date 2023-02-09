import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}


AppRegistry.registerComponent("WashZone", () => gestureHandlerRootHOC(IgniteApp))
export default App
