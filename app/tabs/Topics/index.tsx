import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { TopicDetails, TopicInfo, TopicsFeed } from "../../screens"

export type TopicsTabParamList = {
  TopicsFeed: undefined
  TopicDetails: { topic: any }
  TopicInfo: { topic: any }
}

export type TopicsTabProps<T extends keyof TopicsTabParamList> = StackScreenProps<
  TopicsTabParamList,
  T
>

const Stack = createNativeStackNavigator<TopicsTabParamList>()

const TopicsTab = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"TopicsFeed"}>
      <Stack.Screen name="TopicDetails" component={TopicDetails} />
      <Stack.Screen name="TopicsFeed" component={TopicsFeed} />
      <Stack.Screen name="TopicInfo" component={TopicInfo} />
    </Stack.Navigator>
  )
})

export const Topics = observer(function AppNavigator() {
  return <TopicsTab />
})
