import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { $contentCenter, $flex1, $flexRow, $justifyCenter } from "../styles"
import { Screen, Text, Icon, EmptyState } from "../../components"
import { Chat, MessageType } from "@flyerhq/react-native-chat-ui"
import { PreviewData } from "@flyerhq/react-native-link-preview"
// import DocumentPicker from 'react-native-document-picker'
import FileViewer from "react-native-file-viewer"
import { launchImageLibrary } from "react-native-image-picker"
import { v4 as uuidv4 } from "uuid"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { MessageOptionsModal } from "./partials/MessageOptionsModal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CustomChatMessage, P2PHeader } from "./partials"
import { useStores } from "../../models"
import { useHooks } from "../hooks"
import { fromNow } from "../../utils/agoFromNow"
import { messageMetadataType } from "../../utils"
import { ActivityIndicator } from "react-native-paper"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"

const getColorFromType = (type: any) => {
  switch (type) {
    case messageMetadataType.incomingCallOffer:
      return colors.palette.status.away
    case messageMetadataType.incomingCallAnswer:
      return colors.palette.success100
    case messageMetadataType.hangUpCall:
      return colors.palette.angry100
    case messageMetadataType.classifiedOffer:
      return colors.palette.success100
    default:
      return colors.palette.neutral100
  }
}

export const P2PChat: FC<AppStackScreenProps<"P2PChat">> = observer(function P2PChat(props) {
  const { receiver, roomId } = props.route.params
  const {
    userStore,
    allChats: { getRoomMessages, setLastReadMessageIdForRoom },
  } = useStores()
  const { syncChatMessages, sendTextMessage, getMoreChatMessages, sendAttachment } = useHooks()
  const [optionsModalVisible, setOptionsModalVisible] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [sending, setSending] = useState(false)
  const [syncing, setSyncing] = useState(true)
  const [isAttachmentUploading, setIsAttachmentUploading] = useState(false)

  const [selectedMessage, setSelectedMessage] = useState<any>({ type: "unsupported" })
  const user = {
    id: userStore._id,
    imageUrl: userStore?.picture,
    name: userStore.name,
    status: "online",
  }

  const handleMessagePress = async (message: any) => {
    if (message.type === "file") {
      try {
        await FileViewer.open(message.uri, { showOpenWithDialog: true })
      } catch {}
    }
  }

  const syncChat = async () => {
    const res = await syncChatMessages(roomId)
    setIsLastPage(res.lastPage)
    setTimeout(() => setSyncing(false), 500)
  }

  useEffect(() => {
    syncChat()
    setLastReadMessageIdForRoom(roomId)
  }, [])

  const onAttachmentPress = async () => {
    const res = await MediaPicker()
    if (res) {
      setIsAttachmentUploading(true)
      await sendAttachment({ roomId, attachment: res, receiverId: receiver._id })
      setIsAttachmentUploading(false)
    }
  }

  const handleSendPress = async (text: MessageType.PartialText) => {
    setSending(true)
    !syncing && !loadingMore && (await sendTextMessage(roomId, text.text, receiver._id))
    setSending(false)
  }

  const handleOnMessageLongPress = (message) => {
    // setSelectedMessage(message)
    // setOptionsModalVisible(true)
  }

  const onChatEndReached = async () => {
    setLoadingMore(true)
    if (!isLastPage && !sending && !syncing) {
      console.log("END REACHD")
      const res = await getMoreChatMessages({ roomId })
      setIsLastPage(res.lastPage)
    }
    setLoadingMore(false)
  }

  const renderBubble = (payload: {
    child: React.ReactNode
    message: MessageType.Any
    nextMessageInGroup: boolean
  }) => {
    const { child, message } = payload
    const isAuthorMe = message?.author?.id === userStore._id
    const isImage = message?.type === "image"
    const isLog =
      message?.type === "custom" &&
      [
        messageMetadataType.hangUpCall,
        messageMetadataType.incomingCallAnswer,
        messageMetadataType.incomingCallOffer,
        messageMetadataType.classifiedOffer,
      ].includes(message?.metaData?.metaDataType)
    return (
      <View
        style={[
          {
            backgroundColor: isLog
              ? getColorFromType(message?.metaData?.metaDataType)
              : isAuthorMe
              ? colors.palette.primary200
              : colors.palette.neutral100,
            padding: isImage ? 0 : spacing.tiny,
            paddingHorizontal: isImage ? 0 : spacing.extraSmall,
            borderRadius: isLog ? 2 : 10,
            alignItems: isAuthorMe ? "flex-end" : "flex-start",
          },
          !isLog && {
            borderBottomRightRadius: isAuthorMe ? 0 : 10,
            borderBottomLeftRadius: !isAuthorMe ? 0 : 10,
          },
        ]}
      >
        {child}
      </View>
    )
  }

  const renderImageMessage = (message: MessageType.Image, messageWidth: number) => {
    console.log("renderImageMessage", JSON.stringify(message), messageWidth)
    const [loaded, setLoaded] = useState(false)
    const messageHeight =
      message?.height && message?.width
        ? (message.height / message?.width) * messageWidth
        : messageWidth
    return (
      <ShimmerPlaceholder
        visible={loaded}
        shimmerStyle={{ height: messageHeight, width: messageWidth }}
        LinearGradient={LinearGradient}
      >
        <FastImage
          onLoadEnd={() => setLoaded(true)}
          source={{ uri: message?.uri }}
          style={{
            height: messageHeight,
            width: messageWidth,
          }}
        />
      </ShimmerPlaceholder>
    )
  }

  return (
    <View style={$flex1}>
      <P2PHeader data={receiver} roomId={roomId} />
      <Chat
        renderImageMessage={renderImageMessage}
        isAttachmentUploading={isAttachmentUploading}
        sendButtonVisibilityMode="editing"
        emptyState={() => syncing && <ActivityIndicator />}
        onEndReached={onChatEndReached}
        theme={{
          insets: {
            messageInsetsHorizontal: 10,
            messageInsetsVertical: 10,
          },
          colors: {
            background: colors.palette.primaryOverlay15,
            inputBackground: colors.palette.primary100,
            inputText: colors.palette.neutral100,
            error: colors.palette.angry500,
            primary: colors.palette.primaryOverlay80,
            secondary: colors.palette.neutral100,
            receivedMessageDocumentIcon: colors.palette.neutral100,
            sentMessageDocumentIcon: colors.palette.neutral100,
            userAvatarImageBackground: colors.background,
            userAvatarNameColors: [colors.palette.neutral800],
          },
          fonts: {
            dateDividerTextStyle: testTextStyle,
            emptyChatPlaceholderTextStyle: testTextStyle,
            inputTextStyle: testTextStyle,
            receivedMessageBodyTextStyle: { color: colors.palette.neutral700 },
            receivedMessageCaptionTextStyle: { color: colors.palette.neutral700 },
            receivedMessageLinkDescriptionTextStyle: testTextStyle,
            receivedMessageLinkTitleTextStyle: testTextStyle,
            sentMessageBodyTextStyle: { color: colors.palette.neutral100 },
            sentMessageCaptionTextStyle: { color: colors.palette.neutral100 },
            sentMessageLinkDescriptionTextStyle: testTextStyle,
            sentMessageLinkTitleTextStyle: testTextStyle,
            userAvatarTextStyle: testTextStyle,
            userNameTextStyle: testTextStyle,
          },
          borders: { inputBorderRadius: 10, messageBorderRadius: 10 },
        }}
        messages={getRoomMessages({ roomId })}
        renderCustomMessage={(message, messageWidth) => <CustomChatMessage message={message} />}
        onAttachmentPress={onAttachmentPress}
        onMessagePress={handleMessagePress}
        onMessageLongPress={handleOnMessageLongPress}
        onSendPress={handleSendPress}
        user={user}
        renderBubble={renderBubble}
        enableAnimation
        isLastPage={isLastPage}
      />
      <MessageOptionsModal
        message={selectedMessage}
        isVisible={optionsModalVisible}
        setVisible={setOptionsModalVisible}
        metadata={selectedMessage?.metadata}
      />
    </View>
  )
})

const testTextStyle: TextStyle = {}
