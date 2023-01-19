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
import AppLovinMAX from "react-native-applovin-max/src/index"
import { useHooks } from "./screens/hooks"
import Toast from "react-native-toast-message"

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
  screens: {
    ClassifiedLinked: {
      path: "classified/:classifiedId",
      parse: {
        classifiedId: (classifiedId: string) => classifiedId,
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

function App(props: AppProps) {
  const { hideSplashScreen } = props
  const { onBoot } = useHooks()
  const SDK_KEY =
    "U0OTon6ehwaUryCOnQkOPUyWxZJn8XLdTl5KVBzC5ThxUuJGI2fhWbDS9XEI4ZxcI0xpCu0IRhEwZTBtarZ5Rn"

  const [AppLovinSDKRegistered, setAppLovinSDKRegistered] = React.useState(false)
  useEffect(() => {
    // MAX Consent Flow for iOS 14.5+

    if (Platform.OS === "ios" && parseFloat(Platform.Version) >= 14.5) {
      // Enable the iOS consent flow programmatically - NSUserTrackingUsageDescription must be added to the Info.plist
      AppLovinMAX.setConsentFlowEnabled(true)
      AppLovinMAX.setPrivacyPolicyUrl("https://www.freeprivacypolicy.com/blog/privacy-policy-url/") // mandatory
    }

    AppLovinMAX.initialize(SDK_KEY, (configuration) => {
      console.log("CONFIGURATION", configuration)
      setAppLovinSDKRegistered(true)
      if (Platform.OS === "android") {
        if (configuration.consentDialogState === AppLovinMAX.ConsentDialogState.APPLIES) {
          // Show user consent dialog
          AppLovinMAX.showConsentDialog()
        }
      }
      // MREC Ad Listeners
      AppLovinMAX.addEventListener("OnMRecAdLoadedEvent", (adInfo) => {
        console.log("MREC ad loaded from " + JSON.stringify(adInfo))
      })
      AppLovinMAX.addEventListener("OnMRecAdLoadFailedEvent", (errorInfo) => {
        console.log(
          "MREC ad failed to load with error code " +
            errorInfo.code +
            " and message: " +
            errorInfo.message,
        )
      })
      AppLovinMAX.addEventListener("OnMRecAdClickedEvent", (adInfo) => {
        console.log("MREC ad clicked ", adInfo)
      })
      AppLovinMAX.addEventListener("OnMRecAdExpandedEvent", (adInfo) => {
        console.log("MREC ad expanded ", adInfo)
      })
      AppLovinMAX.addEventListener("OnMRecAdCollapsedEvent", (adInfo) => {
        console.log("MREC ad collapsed ", adInfo)
      })
      AppLovinMAX.addEventListener("OnMRecAdRevenuePaid", (adInfo) => {
        console.log("MREC ad revenue paid: " + adInfo)
      })
    })

    // Native Ad Listeners
    AppLovinMAX.addEventListener("OnNativeAdLoadedEvent", (adInfo) => {
      console.log("Native ad loaded from: " + adInfo.networkName)
    })
    AppLovinMAX.addEventListener("OnNativeAdLoadFailedEvent", (errorInfo) => {
      console.log(JSON.stringify(errorInfo))
      console.log("Native ad failed to load with error code " + JSON.stringify(errorInfo))
    })
    AppLovinMAX.addEventListener("OnNativeAdClickedEvent", (adInfo) => {
      console.log("Native ad clicked ", adInfo)
    })
    AppLovinMAX.addEventListener("OnNativeAdRevenuePaid", (adInfo) => {
      console.log("Native ad revenue paid: " + adInfo.revenue)
    })
    setTimeout(hideSplashScreen, 2000)
  }, [])

  const prefix = Linking.createURL("/")
  console.log("PREFIXES", prefix)

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
