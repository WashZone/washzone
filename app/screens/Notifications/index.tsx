import React, { FC, useEffect } from "react"
import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { EmptyState, Header, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps, goBack } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { $flex1, $flexRow } from "../styles"
import { formatName } from "../../utils/formatName"
import { fromNow } from "../../utils/agoFromNow"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import {
  ClassifiedsTabParamList,
  HomeTabParamList,
  TopicsTabParamList,
  VideosTabParamList,
} from "../../tabs"
import { NotificationType } from "../../utils/enums"
import { BROKEN_IMAGE } from "../../utils"

export const Notifications: FC<AppStackScreenProps<"Notifications">> = observer(
  function Notifications() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()
    const { fetchNotifications } = useHooks()
    const {
      notificationStore: { setLastRead, notifications },
    } = useStores()
    const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
    const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
    const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
    const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()
    useEffect(() => {
      fetchNotifications().then(() => {
        notifications?.length > 0 && setLastRead(notifications[0]?.updatedAt)
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
            ListFooterComponent={<View style={{ height: spacing.large }} />}
            ListHeaderComponent={<View style={{ height: spacing.homeScreen }} />}
            data={notifications}
            renderItem={({ item, index }) => (
              <NotificationComponent
                item={item}
                index={index}
                navigationClassified={navigationClassified}
                navigationTopic={navigationTopic}
                navigationHome={navigationHome}
                navigationVideo={navigationVideo}
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

const UIComponent = ({ name, onPress, imageUri, count, module, type, updatedAt }) => {
  return (
    <TouchableOpacity
      style={$itemContainer}
      onPress={() => {
        goBack()
        onPress()
      }}
    >
      <View style={$flexRow}>
        <FastImage defaultSource={BROKEN_IMAGE} source={{ uri: imageUri }} style={$notificationImage} />
        <View style={[$flex1, { paddingVertical: spacing.tiny, paddingRight: spacing.extraSmall }]}>
          <Text
            text={
              type === "liked"
                ? count > 0
                  ? `${name} and ${count} others ${type} your ${module}.`
                  : `${name} ${type} your ${module}.`
                : count > 0
                  ? `${name} and others made a total of ${count + 1} comments on your ${module}.`
                  : `${name} commented on your ${module}.`
            }
            size="xxs"
            weight="medium"
            numberOfLines={2}
            style={$flex1}
          />
          <Text
            weight="medium"
            text={fromNow(updatedAt)}
            size="xxs"
            style={$textRight}
            color={colors.palette.neutral500}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const NotificationComponent = ({
  item,
  index,
  navigationClassified,
  navigationHome,
  navigationTopic,
  navigationVideo,
}) => {
  switch (item?.notificationType) {
    case NotificationType.likeOnPost:
    case NotificationType.likeOnTopic:
    case NotificationType.likeOnVideo: {
      const author = item?.authorId
      const details =
        item?.notificationType === NotificationType.likeOnPost
          ? {
            onPress: () =>
              navigationHome.navigate("PostInfo", { post: item?.HomePageId[0]?._id }),
            module: "post",
            image: item?.HomePageId[0]?.attachmentUrl,
          }
          : item?.notificationType === NotificationType.likeOnTopic
            ? {
              onPress: () =>
                navigationTopic.navigate("TopicInfo", { topic: item?.TopicId[0]?._id }),
              module: "discussion",
              image: item?.TopicId[0]?.attachmentUrl,
            }
            : {
              onPress: () =>
                navigationVideo.navigate("VideoDetails", { data: item?.videoId[0]?._id }),
              module: "video",
              image: item?.videoId[0]?.thumbnailUrl,
            }

      return (
        <UIComponent
          name={formatName(item?.userId?.name)}
          onPress={details.onPress}
          imageUri={details?.image}
          count={item?.count}
          module={details.module}
          type={"liked"}
          updatedAt={item?.updatedAt}
        />
      )
    }
    case NotificationType.commentOnTopic:
    case NotificationType.commentOnPost: {
      const author = item?.authorId
      const details =
        item?.notificationType === NotificationType.commentOnPost
          ? {
            onPress: () =>
              navigationHome.navigate("PostInfo", { post: item?.HomePageId[0]?._id }),
            module: "post",
            image: item?.HomePageId[0]?.attachmentUrl,
          }
          : {
            onPress: () =>
              navigationTopic.navigate("TopicInfo", { topic: item?.TopicId[0]?._id }),
            module: "discussion",
            image: item?.TopicId[0]?.attachmentUrl,
          }

      return (
        <UIComponent
          name={formatName(item?.userId?.name)}
          onPress={details.onPress}
          imageUri={details?.image}
          count={item?.count}
          module={details.module}
          type={"commented"}
          updatedAt={item?.updatedAt}
        />
      )
    }
    case NotificationType.classified: {
      const data = JSON.parse(item.metaData?.data)
      const author = item?.authorId[0]

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

            <View
              style={[$flex1, { paddingVertical: spacing.tiny, paddingRight: spacing.extraSmall }]}
            >
              <Text
                text={`${formatName(author?.name)} offered ${item?.metaData?.currency + item?.metaData?.amount
                  } on ${data?.title}.`}
                size="xxs"
                weight="medium"
                style={$flex1}
                numberOfLines={2}
              />
              <Text
                weight="medium"
                text={fromNow(item?.updatedAt)}
                size="xxs"
                style={$textRight}
                color={colors.palette.neutral500}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    default:
      return null
  }
}

const $textRight: TextStyle = { textAlign: "right" }

const $notificationImage: ImageStyle = {
  height: 68,
  width: 68,
  marginRight: spacing.extraSmall,
}

const $itemContainer: ViewStyle = {
  // paddingHorizontal: spacing.medium,
  // paddingVertical: spacing.extraSmall,
  borderBottomWidth: 1,
  borderColor: colors.separator,
  height: 68,
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
