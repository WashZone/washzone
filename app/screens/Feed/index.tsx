import React, { FC } from "react"
import { HomeTabProps } from "../../tabs/Home"
import { CreatePost } from "./partials/CreatePost"
import { Posts } from "./partials/Posts"
import { Screen } from "../../components"
import { ViewStyle } from "react-native"

export const Feed: FC<HomeTabProps<"Feed">> = function Home(_props) {
  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <CreatePost />
      <Posts />
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
