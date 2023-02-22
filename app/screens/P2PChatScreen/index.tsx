import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { $flex1 } from "../styles"
import { Screen, Header } from "../../components"
import { Chat, MessageType } from "@flyerhq/react-native-chat-ui"
import { PreviewData } from "@flyerhq/react-native-link-preview"
// import DocumentPicker from 'react-native-document-picker'
// import FileViewer from 'react-native-file-viewer'
import { launchImageLibrary } from "react-native-image-picker"
import { v4 as uuidv4 } from "uuid"
import { useNavigation } from "@react-navigation/native"
import { TextStyle, View } from "react-native"
import { colors } from "../../theme"
import { MediaPicker } from "../../utils/device/MediaPicker"

export const P2PChat: FC<AppStackScreenProps<"P2PChat">> = observer(function P2PChat(props) {
  const { receiver } = props.route.params

  const [data, setData] = useState<any>([])

  const navigation = useNavigation()

  const [messages, setMessages] = useState(data as Array<any>)
  const user = { id: "06c33e8b-e835-4736-80f4-63f44b66666c" }

  const addMessage = (message: any) => {
    setMessages([message, ...messages])
  }

  // const handleAttachmentPress = () => {
  //   showActionSheetWithOptions(
  //     {
  //       options: ['Photo', 'File', 'Cancel'],
  //       cancelButtonIndex: 2,
  //     },
  //     (buttonIndex) => {
  //       switch (buttonIndex) {
  //         case 0:
  //           handleImageSelection()
  //           break
  //         case 1:
  //           handleFileSelection()
  //           break
  //       }
  //     }
  //   )
  // }

  // const handleFileSelection = async () => {
  //   try {
  //     const response = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.allFiles],
  //     })
  //     const fileMessage: MessageType.File = {
  //       author: user,
  //       createdAt: Date.now(),
  //       id: uuidv4(),
  //       mimeType: response.type ?? undefined,
  //       name: response.name,
  //       size: response.size ?? 0,
  //       type: 'file',
  //       uri: response.uri,
  //     }
  //     addMessage(fileMessage)
  //   } catch {}
  // }

  // const handleImageSelection = () => {
  //   launchImageLibrary(
  //     {
  //       includeBase64: true,
  //       maxWidth: 1440,
  //       mediaType: 'photo',
  //       quality: 0.7,
  //     },
  //     ({ assets }) => {
  //       const response = assets?.[0]

  //       if (response?.base64) {
  //         const imageMessage: MessageType.Image = {
  //           author: user,
  //           createdAt: Date.now(),
  //           height: response.height,
  //           id: uuidv4(),
  //           name: response.fileName ?? response.uri?.split('/').pop() ?? '🖼',
  //           size: response.fileSize ?? 0,
  //           type: 'image',
  //           uri: `data:image/*;base64,${response.base64}`,
  //           width: response.width,
  //         }
  //         addMessage(imageMessage)
  //       }
  //     }
  //   )
  // }

  // const handleMessagePress = async (message: MessageType.Any) => {
  //   if (message.type === 'file') {
  //     try {
  //       await FileViewer.open(message.uri, { showOpenWithDialog: true })
  //     } catch {}
  //   }
  // }

  // const handlePreviewDataFetched = ({
  //   message,
  //   previewData,
  // }: {
  //   message: MessageType.Text
  //   previewData: PreviewData
  // }) => {
  //   setMessages(
  //     messages.map<MessageType.Any>((m) =>
  //       m.id === message.id ? { ...m, previewData } : m
  //     )
  //   )
  // }

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

  return (
    <View style={$flex1}>
      <Header 
        titleStyle={{ color: colors.palette.neutral100 }}
        backgroundColor={colors.palette.primary100}
        title={receiver?.name} 
        leftIcon="back" 
        leftIconColor={colors.palette.neutral100}
        onLeftPress={() => navigation.goBack()} />
      <Chat
        theme={{
          insets: {
            messageInsetsHorizontal: 10,
            messageInsetsVertical: 10,
          },
          colors: {
            background: colors.background,
            inputBackground: colors.palette.primary100,
            inputText: colors.palette.neutral100,
            error: colors.palette.angry500,
            primary: colors.palette.primary100,
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
            receivedMessageBodyTextStyle: testTextStyle,
            receivedMessageCaptionTextStyle: testTextStyle,
            receivedMessageLinkDescriptionTextStyle: testTextStyle,
            receivedMessageLinkTitleTextStyle: testTextStyle,
            sentMessageBodyTextStyle: testTextStyle,
            sentMessageCaptionTextStyle: testTextStyle,
            sentMessageLinkDescriptionTextStyle: testTextStyle,
            sentMessageLinkTitleTextStyle: testTextStyle,
            userAvatarTextStyle: testTextStyle,
            userNameTextStyle: testTextStyle,
          },
          borders: { inputBorderRadius: 10, messageBorderRadius: 10 },
        }}
        messages={messages}
        onAttachmentPress={onAttachmentPress}
        // onMessagePress={handleMessagePress}
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
    </View>
  )
})

const testTextStyle: TextStyle = {}
