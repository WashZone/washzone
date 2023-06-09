import React, { useState } from "react"
import { View, Dimensions, ViewStyle, FlatList } from "react-native"
import { Button, Icon, ListItem, Text } from "../components"
import Share, { ShareSheet } from "react-native-share"
import Clipboard from "@react-native-clipboard/clipboard"
import { $flexRow } from "../screens/styles"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { formatName } from "../utils/formatName"
import { useHooks } from "../screens/hooks"
import { Toast } from "react-native-toast-message/lib/src/Toast"

export const ShareModal = observer(() => {
  const [disabled, setDisabled] = useState(false)
  const {
    userStore: { _id },
    allChats: { allChatRooms, getLatestMessageForRoom },
    share: { shareOptions, isShareOpen, close },
  } = useStores()
  const { shareToFriend } = useHooks()
  //  !visible && setVisible(true)
  console.log(shareOptions)
  // const shareOptions = {
  //   title: "React Native",
  //   message: "Hola mundo",
  //   url: "http://facebook.github.io/react-native/",
  //   type: "post",
  //   metadata: {}, //  for email
  // }

  const handlePress = (roomId: string, receiverId: string, receiverName: string) => {
    close()

    setTimeout(async () => {
      await shareToFriend(roomId, shareOptions, receiverId)
      Toast.show({ text1: "Successfully shared with " + receiverName + "." })
    }, 300)
  }

  const sortByLatestTime = (a, b) => {
    const aTime = new Date(getLatestMessageForRoom(a?._id).time)?.getTime()
    const bTime = new Date(getLatestMessageForRoom(b?._id).time).getTime()
    return bTime - aTime
  }

  const onCancel = () => {
    console.log("CANCEL")
    // setVisible(false)
    close()
  }

  const { bottom } = useSafeAreaInsets()

  return (
    <ShareSheet visible={isShareOpen} onCancel={onCancel}>
      <Text
        text="Choose a friend : "
        weight="semiBold"
        style={{ marginLeft: spacing.medium, marginBottom: spacing.extraSmall }}
      />
      <FlatList
        style={{ maxHeight: Dimensions.get("window").height / 2 }}
        data={allChatRooms.slice(0, 8).sort(sortByLatestTime)}
        renderItem={({ item, index }) => (
          <UserComponent handlePress={handlePress} key={index} data={item} myId={_id} />
        )}
        ListFooterComponent={<View style={{ padding: spacing.medium }} />}
      />
      <View style={[$flexRow, { paddingBottom: bottom }]}>
        <Button
          disabled={disabled}
          style={$button}
          onPress={() => {
            onCancel()
            setTimeout(() => {
              if (shareOptions?.url !== undefined) {
                Clipboard.setString(shareOptions?.url)
                Toast.show({ text1: "Copied to Clipboard" })
              }
            }, 300)
          }}
        >
          <Icon icon="attachment" size={28} />
          <Text text="Copy" weight="semiBold" />
        </Button>

        <Button
          disabled={disabled}
          style={$button}
          onPress={() => {
            setDisabled(true)
            onCancel()
            setTimeout(() => {
              Share.open({ ...shareOptions })
              setDisabled(false)
            }, 300)
          }}
        >
          <Icon icon="more" size={32} />
          <Text text="More" weight="semiBold" />
        </Button>
      </View>
    </ShareSheet>
  )
})

const UserComponent = observer(
  ({
    data,
    myId,
    handlePress,
  }: {
    data: any
    myId: string
    handlePress: (roomId: string, receiverId: string, receiverName: string) => void
  }) => {
    const {
      allChats: { getLatestMessageForRoom },
    } = useStores()
    const receiver = data?.membersId.filter((i: any) => i._id !== myId)[0]
    const latestMessage = getLatestMessageForRoom(data?._id)

    if (latestMessage?.isEmpty) return null

    return (
      <ListItem
        onPress={() => {
          handlePress(data?._id, receiver?._id, formatName(receiver?.name))
        }}
        height={33}
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
          <Text
            text={formatName(receiver?.name)}
            numberOfLines={1}
            size="sm"
            weight={"medium"}
            style={{ color: colors.palette.neutral900 }}
          />
        </View>
      </ListItem>
    )
  },
)

export default ShareModal

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

const $button: ViewStyle = {
  flexDirection: "column",
  width: Dimensions.get("screen").width / 2 - 30,
  marginHorizontal: 20,
  marginRight: 10,
  padding: 10,
}
