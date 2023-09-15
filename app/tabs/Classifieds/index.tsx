import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ClassifiedsFeed, ClassifiedsDetails } from "../../screens"

export type ClassifiedsTabParamList = {
  ClassifiedsFeed: undefined
  ClassifiedsDetails: { classified: any }
}

export type ClassifiedsTabProps<T extends keyof ClassifiedsTabParamList> = StackScreenProps<
  ClassifiedsTabParamList,
  T
>

const Stack = createNativeStackNavigator<ClassifiedsTabParamList>()

const ClassifiedsTab = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"ClassifiedsFeed"}>
      <Stack.Screen name="ClassifiedsFeed" component={ClassifiedsFeed} />
      <Stack.Screen name="ClassifiedsDetails" component={ClassifiedsDetails} />
    </Stack.Navigator>
  )
})

export const Classifieds = observer(function AppNavigator() {
  return <ClassifiedsTab />
})
