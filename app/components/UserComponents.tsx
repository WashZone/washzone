import React from "react"
import { View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, spacing } from "../theme"
import { Text, ListItem } from "."
import { formatName } from "../utils/formatName"

export const MiniUserComponent = ({ onPress, item }: { onPress?: (a: any) => void; item: any }) => {
  return (
    <ListItem
      onPress={() => {
        onPress(item)
      }}
      height={33}
      style={$alignCenter}
      containerStyle={$container}
      LeftComponent={
        <View>
          <FastImage
            style={$imageContainer}
            source={{
              uri: item?.picture,
            }}
          />
        </View>
      }
    >
      <View style={$contentContainer}>
        <Text
          text={formatName(item?.name)}
          numberOfLines={1}
          size="sm"
          weight={"medium"}
          style={{ color: colors.palette.neutral900 }}
        />
      </View>
    </ListItem>
  )
}

export default MiniUserComponent

const $contentContainer: ViewStyle = {
  height: 40,
  flex: 1,
  marginLeft: spacing.medium,
  justifyContent: "center",
}

const $container: ViewStyle = {
  borderTopWidth: 0.5,
  borderBottomWidth: 0.5,
  borderColor: colors.separator,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
}

const $imageContainer: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
}
const $alignCenter: ViewStyle = { alignItems: "center" }
