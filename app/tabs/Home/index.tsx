import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Feed, Profile, PostInfo, FollowerFollowing, PostList } from "../../screens"

export type Change = {
  action: "update" | "delete"
  moduleType: "post" | "topic"
  moduleId: string
  data?: any
}

export type HomeTabParamList = {
  Feed: { focused?: boolean }
  PostInfo: { post: any; highlightedComment?: any }
  Profile: { user: any; header?: boolean; change?: Change }
  PostList: { user: any }
  FollowerFollowing: { initialTab?: "followers" | "following"; user: any }
}

export type HomeTabProps<T extends keyof HomeTabParamList> = StackScreenProps<HomeTabParamList, T>

const Stack = createNativeStackNavigator<HomeTabParamList>()

const HomeTab = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Feed"}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="PostInfo" component={PostInfo} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="FollowerFollowing" component={FollowerFollowing} />
    </Stack.Navigator>
  )
})

export const Home = observer(function AppNavigator() {
  return <HomeTab />
})
