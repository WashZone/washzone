import React, { FC, useEffect, useState } from "react"
import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { EmptyState, Header, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { CustomMessageType } from "../P2PChatScreen/partials"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { $flex1, $flexRow } from "../styles"
import { formatName } from "../../utils/formatName"
import { fromNow } from "../../utils/agoFromNow"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"

export const Notifications: FC<AppStackScreenProps<"Notifications">> = observer(
  function Notifications() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()
    const { fetchNotifications } = useHooks()
    const {
      notificationStore: { setLastRead, notifications },
    } = useStores()

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
        {notifications ? (
          <FlatList
            ListHeaderComponent={<View style={{ height: spacing.homeScreen }} />}
            data={notifications}
            renderItem={NotificationComponent}
          />
        ) : (
          <EmptyState preset="notifications" buttonOnPress={() => navigation.goBack()} />
        )}
      </Screen>
    )
  },
)

const NotificationComponent = ({ item, index }) => {
  switch (item.metaData?.metaDataType) {
    case CustomMessageType.classifiedOffer: {
      const data = JSON.parse(item.metaData?.data)
      const author = item?.authorId
      return (
        <TouchableOpacity key={index} style={$itemContainer}>
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
            text={fromNow(item?.createdAt)}
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
