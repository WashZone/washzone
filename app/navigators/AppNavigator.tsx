import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import * as Linking from "expo-linking"
import {
  EditProfile,
  LoginScreen,
  Notifications,
  SignupScreen,
  Settings,
  ResetPassword,
  ForgotPassword,
  Saved,
  UploadVideo,
  AddAClassified,
  Search,
  Legal,
  Support,
  P2PChat, 
  AllChats
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { DrawerNavigator } from "./Drawer/DrawerNavigator"
import { useHooks } from "../screens/hooks"
import { BlockedUserModal } from "../components/BlockedUserModal"

export type AppStackParamList = {
  Login: undefined
  Drawer: undefined
  Signup: undefined
  Notifications: undefined
  EditProfile: undefined
  Settings: undefined
  ResetPassword: undefined
  ForgotPassword: undefined
  Saved: undefined
  UploadVideo: undefined
  AddAClassified: undefined
  Search: undefined
  Legal: undefined
  Support: undefined
  AllChats : undefined
  P2PChat : any
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated, isBlocked },
  } = useStores()
  console.log("dsfsadfdasfISBLOCKEd", isBlocked)
  const { onLoggedInBoot } = useHooks()
  const url = Linking.useURL()

  const openUrl = () => {
    console.log("RUNNING OPEN URL", url)
    if (url !== null) {
      Linking.openURL(url)
    }
  }
  useEffect(() => openUrl(), [url])
  useEffect(() => {
    isAuthenticated && onLoggedInBoot()
  }, [isAuthenticated])

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuthenticated ? "Drawer" : "Login"}
      >
        {isAuthenticated ? (
          <>
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Legal" component={Legal} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="AllChats" component={AllChats} />
            <Stack.Screen name="P2PChat" component={P2PChat} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ presentation: "containedModal" }}
            />
            <Stack.Screen name="Saved" component={Saved} /> 
            <Stack.Screen
              name="UploadVideo"
              component={UploadVideo}
              options={{ presentation: "containedModal" }}
            />
            <Stack.Screen
              name="AddAClassified"
              component={AddAClassified}
              options={{ presentation: "containedModal" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
      <BlockedUserModal isVisible={isBlocked} />
    </>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
