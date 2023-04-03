import React, { FC, useEffect, useState } from "react"
import { FlatList, TextStyle, Touchable, TouchableOpacity, View, ViewStyle } from "react-native"
import { EmptyState, Header, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { messageMetadataType } from "../../utils"
import { CustomMessageType } from "../P2PChatScreen/partials"
import FastImage from "react-native-fast-image"
import { $flex1, $flexRow } from "../styles"
import { formatName } from "../../utils/formatName"
import { fromNow } from "../../utils/agoFromNow"

export const Notifications: FC<AppStackScreenProps<"Notifications">> = function Notifications() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { getNotifications } = useHooks()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications().then((res) => setNotifications(res))
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
        <FlatList ListHeaderComponent={<View style={{height:10}}/>} data={notifications} renderItem={NotificationComponent} />
      ) : (
        <EmptyState preset="notifications" buttonOnPress={() => navigation.goBack()} />
      )}
    </Screen>
  )
}

const NotificationComponent = ({ item, index }) => {
  switch (item.metaData?.metaDataType) {
    case CustomMessageType.classifiedOffer: {
      const data = JSON.parse(item.metaData?.data)
      const author = item?.authorId
      return (
        <TouchableOpacity style={$itemContainer}>
          <View style={$flexRow}>
            <FastImage
              source={{ uri: data?.image }}
              style={{ height: 40, width: 40, borderRadius: 8, marginRight: spacing.extraSmall }}
            />
            <Text
              text={`${formatName(author?.name)} offered ${
                item?.metaData?.currency + item?.metaData?.amount
              } on ${data?.title}.`}
              size="xs"
              style={$flex1}
            />
          </View>
          <Text text={fromNow(item?.createdAt)} size="xxs" style={{ textAlign: "right" }} />
        </TouchableOpacity>
      )
    }
    default:
      return null
  }
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
