import { NavigationProp, useNavigation } from "@react-navigation/native"
import React from "react"
import { Keyboard, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { color } from "react-native-reanimated"
import { Icon, ListItem, Text } from "../../../components"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { formatName } from "../../../utils/formatName"
import { $flex1, $flexRow } from "../../styles"

export const ResultComponent = ({ data, setVisible }: { data: any, setVisible:(b:boolean) => void }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const handlePress = () => {
    Keyboard.dismiss()
    setVisible(false)
    navigation.navigate("P2PChat", { receiver: data , roomId: undefined })
  }

  return (
    <ListItem
      onPress={handlePress}
      height={44}
      style={{ alignItems: "center", justifyContent: "flex-start" }}
      containerStyle={$container}
      LeftComponent={
        <View style={{ marginRight: spacing.extraSmall }}>
          <FastImage
            style={$imageContainer}
            source={{
              uri: data?.picture,
            }}
          />
        </View>
      }
    >
      <View>
        <Text text={formatName(data?.name)} color={colors.palette.neutral100}/>
        {data?.description && <Text text={formatName(data?.description)} />}
      </View>
    </ListItem>
  )
}

const $contentContainer: ViewStyle = {
  height: 44,
  flex: 1,
  marginLeft: spacing.medium,
  justifyContent: "center",
}

const $container: ViewStyle = {
  borderTopWidth: 0.25,
  borderBottomWidth: 0.25,
  borderColor: colors.palette.greyOverlay100,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
}

const $imageContainer: ImageStyle = {
  height: 36,
  width: 36,
  borderRadius: 18,
}
