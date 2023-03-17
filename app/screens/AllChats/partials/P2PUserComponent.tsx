import { NavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { Icon, ListItem, Text } from "../../../components"
import { useStores } from "../../../models"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { fromNow } from "../../../utils/agoFromNow"
import { formatDate } from "../../../utils/formatDate"
import { formatName } from "../../../utils/formatName"
import { $flex1, $flexRow } from "../../styles"
export const P2PUserComponent = observer(function p2PUserComponent({
  data,
  myId,
  onLongPress,
}: {
  data: any
  myId: string
  onLongPress: (id:string) => void
}) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const {
    allChats: { getLatestMessageForRoom },
  } = useStores()

  const receiver = data?.membersId.filter((i: any) => i._id !== myId)[0]

  const handlePress = () => {
    navigation.navigate("P2PChat", { receiver: receiver, roomId: data?._id })
  }

  return (
    <ListItem
      onLongPress={() => onLongPress(data?._id)}
      onPress={handlePress}
      height={66}
      style={{ alignItems: "center" }}
      containerStyle={$container}
      LeftComponent={
        <View>
          <FastImage
            style={$imageContainer}
            source={{
              uri: receiver?.picture,
            }}
          />
        </View>
      }
    >
      <View style={$contentContainer}>
        <View style={$topContentContainer}>
          <Text text={formatName(receiver?.name)} weight="semiBold" size="md" />
          <Text size="xxs" text={fromNow(getLatestMessageForRoom(data?._id).time)} />
        </View>
        <Text
          text={getLatestMessageForRoom(data?._id).message}
          numberOfLines={1}
          size="sm"
          style={{ color: colors.palette.neutral500 }}
        />
      </View>
    </ListItem>
  )
})

const $topContentContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

// const $lastSentMessage :TextStyle ={

// }

const $contentContainer: ViewStyle = {
  height: 66,
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
  height: 66,
  width: 66,
  borderRadius: 33,
}
