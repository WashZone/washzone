import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { $contentCenter, $flex1, $flexRow, $justifyCenter } from "../styles"
import { Screen, Header, Icon } from "../../components"
import { Chat, MessageType } from "@flyerhq/react-native-chat-ui"
import { PreviewData } from "@flyerhq/react-native-link-preview"
// import DocumentPicker from 'react-native-document-picker'
import FileViewer from "react-native-file-viewer"
import { launchImageLibrary } from "react-native-image-picker"
import { v4 as uuidv4 } from "uuid"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Pressable, TextStyle, TouchableOpacity, View } from "react-native"
import { colors, spacing } from "../../theme"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { MessageOptionsModal } from "./partials/MessageOptionsModal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { P2PHeader } from "./partials"



export const P2PChat: FC<AppStackScreenProps<"P2PChat">> = observer(function P2PChat(props) {
  const { receiver } = props.route.params

  const testData = [
    {
      author: {
        createdAt: 1677025650,
        firstName: "Jirazo",
        id: "06c33e8b-e835-4736-80f4-63f44b66666d",
        imageUrl:
          receiver?.picture,
        lastSeen: 1677025650,
      },
      createdAt: 1677025650,
      id: 1,
      status: "sent",
      type: "image",
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOiUfb4VFnytmuO25W3RGvUAwj3S1fDc0eq3nVdAM0w&s',
      size: 20,
      text: "Hi There!",
    },
    {
      author: {
        createdAt: 1677025650,
        firstName: "Jirazo",
        id: "06c33e8b-e835-4736-80f4-63f44b66666c",
        imageUrl:
          receiver?.picture,
        lastSeen: 1677025650,
      },
      createdAt: 1677025650,
      id: 2,
      status: "sent",
      type: "image",
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbid4L4Db-UU3xKTLC-rF-wcVO2nEAKkPgvKmEU4TnA&s',
      size: 20,
      text: "Hi There!",
    },

    {
      author: {
        createdAt: 1677025650,
        firstName: "Jirazo",
        id: "06c33e8b-e835-4736-80f4-63f44b66666c",
        imageUrl:
          receiver?.picture,
        lastSeen: 1677025650,
      },
      createdAt: 1677025650,
      id: 4,
      status: "sent",
      type: "text",
      text: "Hi There!",
    },
    {
      author: {
        createdAt: 1677025650,
        firstName: "Jirazo",
        id: "06c33e8b-e835-4736-80f-63f44b66666c",
        imageUrl:
          receiver?.picture,
        lastSeen: 1677025650,
      },
      createdAt: 1677025650,
      id: 5,
      status: "sent",
      type: "text",
      text: "Hi There!",
    },
  ]
  const [data, setData] = useState<any>(testData)

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const [messages, setMessages] = useState(data as Array<any>)
  const [optionsModalVisible, setOptionsModalVisible] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any>({ tpye: "unsupported" })
  const user = {
    id: "06c33e8b-e835-4736-80f4-63f44b66666c",
    imageUrl:
     receiver?.picture,
    name: "Jirazo",
    status: "online",
  }


  const handleMessagePress = async (message: any) => {
    if (message.type === "file") {
      try {
        await FileViewer.open(message.uri, { showOpenWithDialog: true })
      } catch {}
    }
  }

  // const handleSendPress = (message: MessageType.PartialText) => {
  //   const textMessage: MessageType.Text = {
  //     author: user,
  //     createdAt: Date.now(),
  //     id: uuidv4(),
  //     text: message.text,
  //     type: 'text',
  //   }
  //   addMessage(textMessage)
  // }

  // const { getPlaylist } = useHooks()

  // const syncPlaylistData = async () => {
  //   const res = await getPlaylist(playlistId)

  //   setPlaylistData(res)
  // }

  // useEffect(() => {
  //   syncPlaylistData()
  // }, [])

  const onAttachmentPress = async () => {
    const res = await MediaPicker()
  }

  const handleSendPress = (text) => {
    console.log(text)
  }

  const handleOnMessageLongPress = (message) => {
    console.log(message)
    setSelectedMessage(message)
    setOptionsModalVisible(true)
  }

  return (
    <View style={$flex1}>
      <P2PHeader data={receiver} />
      <Chat
        showUserAvatars
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
        messages={messages}
        onAttachmentPress={onAttachmentPress}
        onMessagePress={handleMessagePress}
        onMessageLongPress={handleOnMessageLongPress}
        // onPreviewDataFetched={handlePreviewDataFetched}
        onSendPress={handleSendPress}
        user={user}
      />
      {/* <HeaderComponent playlistData={playlistData} />
        <FlatList
          style={$flex1}
          ListHeaderComponent={<PlaylistDescription />}
          data={playlistData?.VideoDetail}
          renderItem={({ item, index }) => (
            <VideoBlock key={index} index={index} videoDetails={item} />
          )}
        /> */}
      <MessageOptionsModal
        message={selectedMessage}
        isVisible={optionsModalVisible}
        setVisible={setOptionsModalVisible}
      />
    </View>
  )
})

const testTextStyle: TextStyle = {}
