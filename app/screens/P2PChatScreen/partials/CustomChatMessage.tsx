import React, { useMemo } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { messageMetadataType } from "../../../utils"
import { $flexRow } from "../../styles"
import {
  ClassifiedsTabParamList,
  HomeTabParamList,
  TopicsTabParamList,
  VideosTabParamList,
} from "../../../tabs"

export enum CustomMessageType {
  classifiedOffer = "classified-offer",
}

export const CustomChatMessage = ({ message }: { message: any }) => {

  const data = useMemo(() => message?.metaData, [])
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationTopic = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const navigationVideo = useNavigation<NavigationProp<VideosTabParamList>>()
  switch (data?.metaDataType) {
    case messageMetadataType.classifiedOffer: {
      const parsedData = JSON.parse(data?.data || "{}")

      return (
        <View style={$offerContainer}>
          <Text
            text={"Classified Offer !"}
            color={colors.palette.neutral100}
            size="sm"
            weight="semiBold"
          />
          <View style={[$flexRow,
                // eslint-disable-next-line react-native/no-inline-styles
                { maxWidth: 300, marginTop: spacing.tiny }]}>
            <FastImage style={$image} source={{ uri: parsedData?.image }} />
            <View 
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ justifyContent: "flex-end" }}>
              <Text
                text={parsedData?.title}
                color={colors.palette.neutral100}
                size="sm"
                weight="bold"
                numberOfLines={1}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
              />
              <Text
                text={parsedData?.description}
                color={colors.palette.neutral300}
                weight="normal"
                numberOfLines={1}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
              />
              <Text
                text={"$ " + parsedData?.amount}
                color={colors.palette.neutral100}
                size="xl"
                numberOfLines={1}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
                weight="medium"
              />
            </View>
          </View>
        </View>
      )
    }
    case messageMetadataType.incomingCallOfferAudio:
    case messageMetadataType.incomingCallOfferVideo:
      return (
        <View style={{ padding: spacing.tiny }}>
          <Text text="Initiated A Call" size="xs" weight="medium" />
        </View>
      )
    case messageMetadataType.incomingCallAnswer:
      return (
        <View style={{ padding: spacing.tiny }}>
          <Text text="Call Answered!" size="xs" weight="medium" />
        </View>
      )
    case messageMetadataType.hangUpCall:
      return (
        <View>
          <Text text="Hung Up A Call" size="xs" weight="medium" />
        </View>
      )
    case messageMetadataType.sharedClassified: {
      const parsedData = JSON.parse(data?.data || "{}")
      const id = parsedData?.url.split("/")[parsedData?.url.split("/")?.length - 1]

      return (
        <Pressable onPress={() => navigationClassified.navigate('ClassifiedsDetails', { classified: id })}>
          <Text
            text="Shared a classified"
            size="xs"
            weight="medium"
            color={colors.palette.neutral100}
          />
          <Text
            text="Click to view"
            size="xxxs"
            weight="medium"
            color={colors.palette.neutral300}
          />
        </Pressable>
      )
    }
    case messageMetadataType.sharedDiscussion: {
      const parsedData = JSON.parse(data?.data || "{}")
      const id = parsedData?.url.split("/")[parsedData?.url.split("/")?.length - 1]

      return (
        <Pressable onPress={() => navigationTopic.navigate("TopicInfo", { topic: id })}>
          <Text
            text="Shared a discussion"
            size="xs"
            weight="medium"
            color={colors.palette.neutral100}
          />
          <Text
            text="Click to view"
            size="xxxs"
            weight="medium"
            color={colors.palette.neutral300}
          />
        </Pressable>
      )
    }
    case messageMetadataType.sharedPost: {
      const parsedData = JSON.parse(data?.data || "{}")
      const id = parsedData?.url.split("/")[parsedData?.url.split("/")?.length - 1]

      return (
        <Pressable onPress={() => navigationHome.navigate("PostInfo", { post: id })}>
          <Text text="Shared a post" size="xs" weight="medium" color={colors.palette.neutral100} />
          <Text
            text="Click to view"
            size="xxxs"
            weight="medium"
            color={colors.palette.neutral300}
          />
        </Pressable>
      )
    }
    case messageMetadataType.sharedVideo: {
      const parsedData = JSON.parse(data?.data || "{}")
      const id = parsedData?.url.split("/")[parsedData?.url.split("/")?.length - 1]

      return (
        <Pressable onPress={() => navigationVideo.navigate("VideoDetails", { data: id })}>
          <Text text="Shared a video" size="xs" weight="medium" color={colors.palette.neutral100} />
          <Text
            text="Click to view"
            size="xxxs"
            weight="medium"
            color={colors.palette.neutral300}
          />
        </Pressable>
      )
    }
    default:
      return null
  }
}

const $image: ImageStyle = {
  height: 80,
  width: 80,
  borderRadius: spacing.tiny,
  marginRight: spacing.extraSmall,
}

const $offerContainer: ViewStyle = {
  paddingVertical: spacing.tiny,
}
