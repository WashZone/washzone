import React, { FC, useEffect, useState } from "react"
import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { EmptyState, Header, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps, goBack } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { CustomMessageType } from "../P2PChatScreen/partials"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { $flex1, $flexRow } from "../styles"
import { formatName } from "../../utils/formatName"
import { fromNow } from "../../utils/agoFromNow"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { ClassifiedsTabParamList, TopicsTabParamList } from "../../tabs"
import { NotificationType } from "../../utils/enums"

export const Notifications: FC<AppStackScreenProps<"Notifications">> = observer(
  function Notifications() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()
    const { fetchNotifications } = useHooks()
    const {
      notificationStore: { setLastRead, notifications },
    } = useStores()
    const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
    const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
    useEffect(() => {
      fetchNotifications().then(() => {
        notifications?.length > 0 && setLastRead(notifications[0]?.createdAt)
      })
    }, [])

    return (
      <Screen preset="fixed" contentContainerStyle={$container}>
        <Header
          leftIcon="caretLeft"
          title="Notifications"
          titleStyle={$titleStyle}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral600}
          backgroundColor={colors.palette.neutral100}
        />
        {notifications?.length > 0 ? (
          <FlatList
            ListHeaderComponent={<View style={{ height: spacing.homeScreen }} />}
            data={notifications}
            renderItem={({ item, index }) => (
              <NotificationComponent
                item={item}
                index={index}
                navigationClassified={navigationClassified}
                navigationTopic={navigationTopic}
              />
            )}
          />
        ) : (
          <EmptyState preset="notifications" buttonOnPress={() => navigation.goBack()} />
        )}
      </Screen>
    )
  },
)

const NotificationComponent = ({ item, index, navigationClassified, navigationTopic }) => {
  switch (item?.notificationType) {
    case NotificationType.commentOnTopic: {
      const author = item?.authorId

      return (
        <TouchableOpacity
          key={index}
          style={$itemContainer}
          onPress={() => {
            goBack()
            navigationTopic.navigate("TopicInfo", { topic: item?.TopicId })
          }}
        >
          <View style={$flexRow}>
            <FastImage source={{ uri: author?.picture }} style={$notificationImage} />
            <Text
              text={
                item?.count > 0
                  ? `_____ and others made a total of ${item?.count} comments on your discussion.`
                  : `_____ commented on your discussion.`
              }
              size="xxs"
              weight="medium"
              style={$flex1}
            />
          </View>
          <Text
            weight="medium"
            text={fromNow(item?.updatedAt)}
            size="xxs"
            style={$textRight}
            color={colors.palette.neutral500}
          />
        </TouchableOpacity>
      )
    }
    case NotificationType.classified: {
      const data = JSON.parse(item.metaData?.data)
      const author = item?.authorId

      return (
        <TouchableOpacity
          key={index}
          style={$itemContainer}
          onPress={() => {
            goBack()
            navigationClassified.navigate("ClassifiedsDetails", { classified: data?.id })
          }}
        >
          <View style={$flexRow}>
            <FastImage source={{ uri: data?.image }} style={$notificationImage} />
            <Text
              text={`${formatName(author?.name)} offered ${
                item?.metaData?.currency + item?.metaData?.amount
              } on ${data?.title}.`}
              size="xxs"
              weight="medium"
              style={$flex1}
            />
          </View>
          <Text
            weight="medium"
            text={fromNow(item?.updatedAt)}
            size="xxs"
            style={$textRight}
            color={colors.palette.neutral500}
          />
        </TouchableOpacity>
      )
    }
    default:
      return null
  }
}

const $textRight: TextStyle = { textAlign: "right" }

const $notificationImage: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 8,
  marginRight: spacing.extraSmall,
}

const $itemContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
  borderBottomWidth: 1,
  borderColor: colors.separator,

  backgroundColor: colors.palette.neutral100,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = {
  flex: 1,
}
