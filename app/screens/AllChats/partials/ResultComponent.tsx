import { NavigationProp, useNavigation } from "@react-navigation/native"
import React from "react"
import { Keyboard, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import Toast from 'react-native-toast-message'

import { ListItem, Text } from "../../../components"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { formatName } from "../../../utils/formatName"
import { useHooks } from "../../hooks"
import { toastMessages } from "../../../utils/toastMessages"

export const ResultComponent = ({
  data,
  setVisible,
}: {
  data: any
  setVisible: (b: boolean) => void
}) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { getOrCreateRoom } = useHooks()
  const handlePress = async () => {
    const roomId = await getOrCreateRoom(data?._id)
    Keyboard.dismiss()
    setVisible(false)
    if(!roomId) Toast.show(toastMessages.mightbeblocked)
    roomId && navigation.navigate("P2PChat", { receiver: data, roomId })
  }

  return (
    <ListItem
      onPress={handlePress}
      height={44}
      // eslint-disable-next-line react-native/no-inline-styles
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
      <View 
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ justifyContent: "center"  }}>
        <Text text={formatName(data?.name)} color={colors.palette.neutral100} weight="medium" />
        {data?.description && (
          <Text

            // eslint-disable-next-line react-native/no-inline-styles
            style={{height:20 }}
            text={data?.description}
            numberOfLines={1}
            size="xxs"
            color={colors.palette.neutral100}

          />
        )}
      </View>
    </ListItem>
  )
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
