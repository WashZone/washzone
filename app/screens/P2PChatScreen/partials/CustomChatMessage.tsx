import React, { useMemo } from "react"
import { View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { Text } from "../../../components"
import { useStores } from "../../../models"
import { colors, spacing } from "../../../theme"
import { messageMetadataType } from "../../../utils"
import { $flexRow } from "../../styles"

export enum CustomMessageType {
  classifiedOffer = "classified-offer",
}

export const CustomChatMessage = ({ message }: { message: any }) => {
  const {userStore:{_id : myId}} = useStores()
  const data = useMemo(() => message?.metaData, [])
  switch (data?.metaDataType) {
    case messageMetadataType.classifiedOffer: {
      const classfied = JSON.parse(data?.data || "{}")
      return (
        <View style={$offerContainer}>
          <Text
            text={ "Classified Offer !"}
            color={colors.palette.neutral100}
            size="sm"
            weight="semiBold"
          />
          <View style={[$flexRow, { maxWidth: 300, marginTop: spacing.tiny }]}>
            <FastImage style={$image} source={{ uri: classfied?.image }} />
            <View style={{ justifyContent: "flex-end" }}>
              <Text
                text={classfied?.title}
                color={colors.palette.neutral100}
                size="sm"
                weight="bold"
                numberOfLines={1}
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
              />
              <Text
                text={classfied?.description}
                color={colors.palette.neutral300}
                weight="normal"
                numberOfLines={1}
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
              />
              <Text
                text={"$ " + classfied?.amount}
                color={colors.palette.neutral100}
                size="xl"
                numberOfLines={1}
                style={{ maxWidth: 170 }}
                ellipsizeMode="tail"
                weight="medium"
              />
            </View>
          </View>
        </View>
      )
    }
    case messageMetadataType.incomingCallOffer:
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
