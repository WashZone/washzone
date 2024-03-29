import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Feed, Profile, PostInfo } from "../../screens"

export type HomeTabParamList = {
  Feed: undefined
  TopicInfo: { topic: any }
  PostInfo: { post: any }
  Profile: { user: any, header?: boolean }
}

export type HomeTabProps<T extends keyof HomeTabParamList> = StackScreenProps<HomeTabParamList, T>

const Stack = createNativeStackNavigator<HomeTabParamList>()

const HomeTab = observer(function AppStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Feed"}>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="PostInfo" component={PostInfo} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    )
})

export const Home = observer(function AppNavigator() {
  return <HomeTab />
})
