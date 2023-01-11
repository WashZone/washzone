import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Playlist, VideosFeed,VideoDetails } from "../../screens"

export type VideosTabParamList = {
  VideosFeed: undefined
  Playlist:undefined
  VideoDetails: {data: any}
}

export type VideosTabProps<T extends keyof VideosTabParamList> = StackScreenProps<
  VideosTabParamList,
  T
>

const Stack = createNativeStackNavigator<VideosTabParamList>()

const VideosTab = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"VideosFeed"}>
      <Stack.Screen name="VideosFeed" component={VideosFeed} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="VideoDetails" component={VideoDetails} />
    </Stack.Navigator>
  )
})

export const Videos = observer(function AppNavigator() {
  return <VideosTab />
})

