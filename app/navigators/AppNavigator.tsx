import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native"
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
  AllChats,
  VerifyOTP,
  Role,
  AudioCall,
  VideoCall,
  Profile
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
  VerifyOTP: { email: string }
  Saved: undefined
  UploadVideo: undefined
  AddAClassified: undefined
  Search: undefined
  Legal: undefined
  Support: undefined
  AllChats: undefined
  UserProfile:{user:any, header?:boolean},
  P2PChat: { receiver: any; roomId: string | undefined }
  AudioCall: {
    receiver: any
    role: Role
    roomId: string
    offer?: any
    answer?: any
    cancelled?: boolean
  }
  VideoCall: {
    receiver: any
    role: Role
    roomId: string
    offer?: any
    answer?: any
    cancelled?: boolean
  }
  TestNotification: undefined
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
  const { onLoggedInBoot } = useHooks()

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
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Legal" component={Legal} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="AllChats" component={AllChats} />
            <Stack.Screen name="P2PChat" component={P2PChat} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="UserProfile" component={Profile} />
            <Stack.Screen
              name="AudioCall"
              component={AudioCall}
              options={{ presentation: "containedModal" }}
            />
            <Stack.Screen
              name="VideoCall"
              component={VideoCall}
              options={{ presentation: "containedModal" }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ presentation: "containedModal" }}
            />
            <Stack.Screen name="Saved" component={Saved} />
            <Stack.Screen
              name="UploadVideo"
              component={UploadVideo}
              // options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="AddAClassified"
              component={AddAClassified}
              // options={{ presentation: "containedModal" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
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
