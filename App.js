import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync()

function WashZone() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

registerRootComponent(() => gestureHandlerRootHOC(WashZone))
export default WashZone
