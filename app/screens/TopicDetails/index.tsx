import React, { FC, useEffect, useState } from "react"
import { Dimensions, RefreshControl, TextStyle, View, ViewStyle } from "react-native"
import { Header, ListItem, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { observer } from "mobx-react-lite"
import { TopicsTabProps, TopicsTabParamList } from "../../tabs"
import { formatName } from "../../utils/formatName"
import { fromNow } from "../../utils/agoFromNow"

const TopicInfoComponent = ({ topic }: { topic: any }) => {
  const publisher = topic?.UserId

  return (
    <>
      <View style={$publihserContainer}>
        <View style={$flexHori}>
          <FastImage style={$image} source={{ uri: publisher?.picture }} />
          <Text text={formatName(publisher?.name)} style={$nameText} weight='medium' />
        </View>
        <Text text={fromNow(topic?.createdAt)} style={$fromText} />
      </View>
      <Text text={topic?.topicHeading} style={$titleText} weight='semiBold' />
      <Text text={topic?.topicContent} style={$titleText} weight='normal' />
    </>
  )
}

export const TopicDetails: FC<TopicsTabProps<"TopicDetails">> = observer(function TopicDetails(
  props,
) {
  const navigation = useNavigation<NavigationProp<TopicsTabParamList>>()
  const topic = props.route.params.topic
  //   const { refreshSavedClassifieds, loadMoreSavedClassifieds } = useHooks()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // refreshSavedClassifieds()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    // await refreshSavedClassifieds()
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        safeAreaEdges={[]}
        title={topic?.topicHeading}
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <TopicInfoComponent topic={topic} />
    </Screen>
  )
})

const $flexHori: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $image: ImageStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
}

const $publihserContainer: ViewStyle = {
  height: 50 + spacing.medium * 2,
  paddingVertical: spacing.medium,
  marginHorizontal: spacing.medium,
  borderTopColor: colors.separator,
  borderTopWidth: 0.5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
  width: Dimensions.get("screen").width - 80,
}

const $nameText: TextStyle = {
  fontSize: 16,
  marginLeft: spacing.small,
  color:colors.palette.primary100
}
const $fromText: TextStyle = {
  fontSize: 14,
  marginLeft: spacing.small,
  color: colors.palette.neutral500,
}

const $titleText: TextStyle = {
  fontSize: 16,
  marginHorizontal: spacing.medium,
}


const $container: ViewStyle = {
  flex: 1,
}

const $textContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  height: 120,
  alignSelf: "center",
}
