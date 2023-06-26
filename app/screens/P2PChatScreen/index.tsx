import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { $flex1 } from "../styles"
import { Chat, MessageType } from "@flyerhq/react-native-chat-ui"
// import DocumentPicker from 'react-native-document-picker'
import FileViewer from "react-native-file-viewer"

import {  TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../theme"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { CustomChatMessage, P2PHeader } from "./partials"
import { useStores } from "../../models"
import { useHooks } from "../hooks"
import { messageMetadataType } from "../../utils"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import Lottie from "lottie-react-native"
import { CommentInput, Text, Screen } from "../../components"
import moment from "moment"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Host } from "react-native-portalize"

const getColorFromType = (type: any) => {
  switch (type) {
    case messageMetadataType.incomingCallOfferAudio:
    case messageMetadataType.incomingCallOfferVideo:
      return colors.palette.status.away
    case messageMetadataType.incomingCallAnswer:
      return colors.palette.success100
    case messageMetadataType.hangUpCall:
      return colors.palette.angry100
    case messageMetadataType.classifiedOffer:
      return colors.palette.primary200
    default:
      return colors.palette.neutral100
  }
}

export const P2PChat: FC<AppStackScreenProps<"P2PChat">> = observer(function P2PChat(props) {
  const { receiver, roomId } = props.route.params
  const {
    userStore,
    allChats: { getRoomMessages, setLastReadId, getRoomDetails },
  } = useStores()
  console.log("GETROOMDETALIS< ", getRoomDetails(roomId))
  const { syncChatMessages, sendTextMessage, getMoreChatMessages, sendAttachment } = useHooks()
  // const [optionsModalVisible, setOptionsModalVisible] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [sending, setSending] = useState(false)
  const [syncing, setSyncing] = useState(true)
  const [isAttachmentUploading, setIsAttachmentUploading] = useState(false)
  const allMessages = getRoomMessages({ roomId })
  // const [selectedMessage, setSelectedMessage] = useState<any>({ type: "unsupported" })
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
      } catch { }
    }
  }

  const syncChat = async () => {
    const res = await syncChatMessages(roomId)
    setIsLastPage(res.lastPage)
    setTimeout(() => setSyncing(false), 500)
  }

  useEffect(() => setLastReadId(roomId, allMessages[0]?._id), [allMessages])

  useEffect(() => {
    syncChat()
  }, [])

  const onAttachmentPress = async () => {
    const res = await MediaPicker()
    if (res) {
      setIsAttachmentUploading(true)
      await sendAttachment({ roomId, attachment: res, receiverId: receiver._id })
      setIsAttachmentUploading(false)
    }
  }

  const handleSendPress = async (text: string, selectedMedia: any) => {
    setSending(true)
    if (!syncing && !loadingMore) {
      selectedMedia &&
        (await sendAttachment({ roomId, attachment: selectedMedia, receiverId: receiver._id }))
      text && (await sendTextMessage(roomId, text, receiver._id))
    }
    setSending(false)
  }

  const handleSendPressFlyer = async (text: MessageType.Text) => {
    setSending(true)
    !syncing && !loadingMore && (await sendTextMessage(roomId, text.text, receiver._id))
    setSending(false)
  }

  // const handleOnMessageLongPress = (message) => {
  // setSelectedMessage(message)
  // setOptionsModalVisible(true)
  // }

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
    const { child, message, nextMessageInGroup } = payload
    console.log("nextMessageInGroup", nextMessageInGroup)

    const isAuthorMe = message?.author?.id === userStore._id
    const isImage = message?.type === "image"
    const isLog =
      message?.type === "custom" &&
      [messageMetadataType.classifiedOffer].includes(message?.metaData?.metaDataType)
    return (
      <>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: isLog
              ? getColorFromType(message?.metaData?.metaDataType)
              : isAuthorMe
                ? colors.palette.messageAuthor
                : colors.palette.messageReceiver,
            padding: isImage ? 0 : spacing.tiny,
            paddingHorizontal: isImage ? 0 : spacing.extraSmall,
            borderRadius: isLog ? 8 : 10,
            alignItems: isAuthorMe ? "flex-end" : "flex-start",
            borderBottomRightRadius: isAuthorMe ? 0 : 10,
            borderBottomLeftRadius: isAuthorMe ? 10 : 0,
            marginBottom: 8,
          }}
        >
          {child}
        </View>
        {!nextMessageInGroup && (
          <Text
            text={moment(message?.createdAt).format("hh:mm A")}
            weight="medium"
            color={colors.palette.neutral500}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                position: "absolute",
                bottom: -12,
                fontSize: 11,
                minWidth: 55,
                textAlign: isAuthorMe ? "right" : "left",
              },
              // eslint-disable-next-line react-native/no-inline-styles
              isAuthorMe && { right: 0 },
            ]}
            numberOfLines={1}
          />
        )}
      </>
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
    <Host>

    <Screen contentContainerStyle={$flex1}>
      <P2PHeader data={receiver} roomId={roomId} />
      <Chat
        showUserNames
        renderImageMessage={renderImageMessage}
        isAttachmentUploading={isAttachmentUploading}
        sendButtonVisibilityMode="editing"
        emptyState={() =>
          syncing && (
            <Lottie          
               // eslint-disable-next-line react-native/no-inline-styles
              style={{ height: 40 }}
              source={require("../../../assets/lottie/loader.json")}
              autoPlay
              loop
            />
          )
        }
        onEndReached={onChatEndReached}
        theme={{
          insets: {
            messageInsetsHorizontal: 10,
            messageInsetsVertical: 10,
          },
          colors: {
            background: colors.palette.neutral100,
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
        renderCustomMessage={(message) => <CustomChatMessage message={message} />}
        onAttachmentPress={onAttachmentPress}
        onMessagePress={handleMessagePress}
        // onMessageLongPress={handleOnMessageLongPress}
        onSendPress={handleSendPressFlyer}
        user={user}
        renderBubble={renderBubble}
        enableAnimation
        isLastPage={isLastPage}
        showUserAvatars
        customBottomComponent={() =>
          getRoomDetails(roomId)?.blocked ? (
            <View style={[$blockedContainer, { marginBottom: useSafeAreaInsets().bottom }]}>
              <Text
                style={$blockedText}
                weight="semiBold"
                color={colors.palette.neutral600}
                text={
                  userStore?.isBlocked(receiver?._id)
                    ? "You blocked " + receiver?.first_name + '.'
                    : "You have been blocked by " + receiver?.first_name + '.'
                }
              />
            </View>
          ) : (
            <CommentInput bottomSafe createComment={handleSendPress} placeholder="Message ..." />
          )
        }
      />
      {/* <MessageOptionsModal
        message={selectedMessage}
        isVisible={optionsModalVisible}
        setVisible={setOptionsModalVisible}
        metadata={selectedMessage?.metadata}
      /> */}
    </Screen>
    </Host>

  )
})
const $blockedContainer: ViewStyle = {
  height: 30,
  paddingHorizontal: spacing.extraSmall,
  alignItems: "center",
  justifyContent: "center",
}
const testTextStyle: TextStyle = {}

const $blockedText: TextStyle = {}
