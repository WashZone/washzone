import { NavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { ListItem, Text } from "../../../components"
import { useStores } from "../../../models"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { fromNow } from "../../../utils/agoFromNow"
import { formatName } from "../../../utils/formatName"

export const P2PUserComponent = observer(function p2PUserComponent({
  data,
  myId,
  onLongPress,
}: {
  data: any
  myId: string
  onLongPress: (id: string) => void
}) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const {
    allChats: { getLatestMessageForRoom, rooms },
  } = useStores()

  const receiver = data?.membersId.filter((i: any) => i._id !== myId)[0]

  const handlePress = () => {
    navigation.navigate("P2PChat", { receiver, roomId: data?._id })
  }
  const latestMessage = getLatestMessageForRoom(data?._id)
  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    console.log('rooms', rooms)
    console.log("IS READ:",rooms[data?._id], ' === ',latestMessage?.id )
    if (rooms[data?._id] === latestMessage?.id) setIsRead(true)
    else {
      setIsRead(false)
    }
  }, [latestMessage])

  return (
    <ListItem
      onLongPress={() => onLongPress(data?._id)}
      onPress={handlePress}
      height={66}
      style={$alignCenter}
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
          <Text size="xxs" text={fromNow(latestMessage.time)} />
        </View>
        <Text
          text={latestMessage.message}
          numberOfLines={1}
          size="sm"
          weight={isRead ? "normal" : "medium"}
          style={{ color: colors.palette.neutral700 }}
        />
      </View>
    </ListItem>
  )
})

const $topContentContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $alignCenter :ViewStyle ={ alignItems: "center" }

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
