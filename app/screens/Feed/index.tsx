import React, { FC, useState } from "react"
import { HomeTabProps } from "../../tabs/Home"
import { CreatePost } from "./partials/CreatePost"
import { Posts } from "./partials/Posts"
import { Stories } from "./partials/Stories"
import { Screen } from "../../components"
import { RefreshControl } from "react-native"
import { useHooks } from "./hooks"

export const Feed: FC<HomeTabProps<"Feed">> = function Home(_props) {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { getAndUpdatePosts } = useHooks()
  const onRefresh = () => {
    getAndUpdatePosts(false)
    setRefreshing(false)
  }

  return (
    <Screen
      preset="scroll"
      ScrollViewProps={{
        showsVerticalScrollIndicator: false,
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}
    >
      <CreatePost />
      <Stories />
      <Posts />
    </Screen>
  )
}
