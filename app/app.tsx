/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron"
import Config from "./config"
import { Platform } from "react-native"
import AppLovinMAX from "react-native-applovin-max"
import { useHooks } from "./screens/hooks"
import Toast from "react-native-toast-message"
import { notificationHandler } from "./utils"
import RNCallKeep from "react-native-callkeep"
import { ShareModal } from "./components"

const options = {
  ios: {
    appName: "Washzone",
  },
  android: {
    alertTitle: "Permissions required",
    alertDescription: "This application needs to access your phone accounts",
    cancelButton: "Cancel",
    okButton: "ok",
    imageName: "phone_account_icon",
    additionalPermissions: [],
  },
}
RNCallKeep.setup(options).then((res) => console.log("RNCALLKEEPRESPOK OK", res))
// RNCallKeep.setAvailable(true)

// configureNotifications()

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration

const config = {
  screens: {},
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}
notificationHandler()

function App(props: AppProps) {
  const { hideSplashScreen } = props
  const { onBoot } = useHooks()
  const SDK_KEY =
    "U0OTon6ehwaUryCOnQkOPUyWxZJn8XLdTl5KVBzC5ThxUuJGI2fhWbDS9XEI4ZxcI0xpCu0IRhEwZTBtarZ5Rn"

  const [AppLovinSDKRegistered, setAppLovinSDKRegistered] = React.useState(false)

  useEffect(() => {
    if (AppLovinSDKRegistered) return

    // MAX Consent Flow for iOS 14.5+
    if (Platform.OS === "ios" && parseFloat(Platform.Version) >= 14.5) {
      // Enable the iOS consent flow programmatically - NSUserTrackingUsageDescription must be added to the Info.plist
      AppLovinMAX.setConsentFlowEnabled(true)
      AppLovinMAX.setPrivacyPolicyUrl("https://www.washzoneapp.com/privacy-policy") // mandatory
    }

    AppLovinMAX.setIsAgeRestrictedUser(false)
    AppLovinMAX.setDoNotSell(false)

    AppLovinMAX.initialize(SDK_KEY)
      .then((configuration) => {
        // SDK is initialized, start loading ads
        console.log("CONFIGURATION", configuration)
        setAppLovinSDKRegistered(true)
      })
      .catch((error) => {
        console.log("Failed to initialize SDK ", error)
        // Failed to initialize SDK
      })

    setTimeout(hideSplashScreen, 2300)
  }, [])

  const prefix = Linking.createURL("/")

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => onBoot())

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded || !AppLovinSDKRegistered)
    return null

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppNavigator
          linking={linking}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
        <Toast />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
// Access Key ID:
// AKIAY5ERXJV4ZHSJQWFL
// Secret Access Key:
// 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
