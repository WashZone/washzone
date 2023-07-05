import React, { FC } from "react"
import { useNavigation } from "@react-navigation/native"
import { TabBar, TabView } from "react-native-tab-view"
import { observer } from "mobx-react-lite"

import { Header, Screen } from "../../components"
import { HomeTabProps } from "../../tabs"
import { colors } from "../../theme"
import { $flex1 } from "../styles"
import { FollowersList } from "./partials/Followers"
import { FollowingList } from "./partials/Followings"
import { formatName } from "../../utils/formatName"

export const FollowerFollowing: FC<HomeTabProps<"FollowerFollowing">> = observer(
  function FollowerFollowing(props) {
    const { initialTab, user } = props.route.params
    const navigation = useNavigation()
    const [index, setIndex] = React.useState(initialTab === "followers" ? 0 : 1)
    const [routes] = React.useState([
      { key: "followers", title: "Followers" },
      { key: "following", title: "Following" },
    ])
    const renderScene = ({ route }) => {
      switch (route.key) {
        case "followers":
          return <FollowersList user={user} />
        case "following":
          return <FollowingList user={user} />
        default:
          return null
      }
    }

    return (
      <Screen preset="fixed" contentContainerStyle={$flex1}>
        <Header
          safeAreaEdges={[]}
          title={formatName(user?.name)}
          titleStyle={{ color: colors.palette.neutral100 }}
          leftIcon="caretLeft"
          backgroundColor={colors.palette.primary100}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />
        <TabView
          onIndexChange={setIndex}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <TabBar
              activeColor={colors.palette.primary100}
              inactiveColor={colors.palette.neutral400}
              contentContainerStyle={{ backgroundColor: colors.palette.neutral100 }}
              indicatorStyle={{ backgroundColor: colors.palette.neutral900 }}
              {...props}
            />
          )}
        />
      </Screen>
    )
  },
)

export default FollowerFollowing
