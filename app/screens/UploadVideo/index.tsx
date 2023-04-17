import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-paper"
import { Button, Header, Icon, Text, Toggle } from "../../components"
import { Dropdown } from "react-native-element-dropdown"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { useHooks } from "../hooks"
import { InputPlaylistInfoModal } from "./InputPlaylistInfo"

export const UploadVideo: FC<AppStackScreenProps<"UploadVideo">> = function UploadVideo() {
  const {
    api: { queryGetVideoPlaylistByUserId },
    userStore: { _id },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [playlistModalVisible, setPlaylistModalVisible] = useState<boolean>(false)
  const [TNCAccepted, setTNCAccepted] = useState<boolean>(false)
  const [value, setValue] = useState("")
  const [allPlaylists, setAllPlaylist] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const { uploadVideo, refreshVideos } = useHooks()

  const syncAllPlaylists = async () => {
    const allPlaylistDropDownData = []
    const res = await queryGetVideoPlaylistByUserId(
      { userId: _id },
      { fetchPolicy: "network-only" },
    )

    if (res.getVideoPlaylistByUserId?.data) {
      res.getVideoPlaylistByUserId?.data.map((playlist) =>
        allPlaylistDropDownData.push({ label: playlist?.playListName, value: playlist?._id }),
      )
    }

    setAllPlaylist(allPlaylistDropDownData)
  }

  const createVideo = async () => {
    if (title.length === 0) {
      Toast.show({ ...toastMessages.inputTitle })
      return
    }
    if (
      !youtubeUrl.includes("https://www.youtube.com/watch?v=") &&
      !youtubeUrl.includes("https://youtu.be/")
    ) {
      Toast.show({ ...toastMessages.inputYTURL })
      return
    }
    if (description.length === 0) {
      Toast.show({ ...toastMessages.inputDescription })
      return
    }
    if (!TNCAccepted) {
      Toast.show({ ...toastMessages.acceptTNC })
      return
    }
    try {
      let parsedYtUrl = ""
      let ytVideoId = ""
      if (youtubeUrl.includes("https://youtu.be/")) {
        ytVideoId = youtubeUrl.replace("https://youtu.be/", "")
        parsedYtUrl = "https://www.youtube.com/watch?v=" + ytVideoId
      } else {
        ytVideoId = youtubeUrl.replace("https://www.youtube.com/watch?v=", "")
        parsedYtUrl = youtubeUrl
      }
      setButtonLoading(true)
      await uploadVideo({
        videoHeading: title,
        thumbnailUrl: `https://img.youtube.com/vi/${ytVideoId}/default.jpg`,
        attachmentVideoUrl: parsedYtUrl,
        vedioPlaylistId: value,
        description
      })
      await refreshVideos()
      navigation.goBack()
      setButtonLoading(false)
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
      setButtonLoading(false)
    }
  }

  useEffect(() => {
    syncAllPlaylists()
  }, [])

  return (
    <View style={$container}>
      <Header
        backgroundColor={colors.palette.neutral100}
        leftIcon="caretLeft"
        title="Post a Video"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={$content}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          multiline
          value={title}
          style={$inputContainer}
          onChangeText={setTitle}
          mode="outlined"
          label={"Title"}
          theme={$theme}
          maxLength={180}
        />

        <TextInput
          multiline
          value={description}
          onChangeText={setDescription}
          style={[$inputContainer, $descriptionContainer]}
          mode="outlined"
          label={'Description'}
          theme={$theme}
          placeholder="Enter a short description here!"
          numberOfLines={3}
          contentStyle={{ height: 120 }}
          blurOnSubmit
        />

        <TextInput
          multiline
          numberOfLines={1}
          value={youtubeUrl}
          onChangeText={setYoutubeUrl}
          style={$inputContainer}
          mode="outlined"
          label={"Youtube URL"}
          theme={$theme}
          autoCapitalize={'none'}
          maxLength={180}
          placeholder="https://www.youtube.com/watch?v=xxxxxx"
          placeholderTextColor={colors.palette.grey}
        />

        <Dropdown
          data={allPlaylists}
          search
          placeholderStyle={{ color: colors.palette.neutral900 }}
          itemTextStyle={{ color: colors.palette.neutral700 }}
          selectedTextStyle={{ color: colors.palette.neutral900 }}
          inputSearchStyle={{ color: colors.palette.neutral700 }}
          maxHeight={300}
          style={[$dropdown, isFocus && { borderColor: colors.palette.primary100 }]}
          labelField="label"
          valueField="value"
          placeholder={"Choose Playlist"}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value)
            setIsFocus(false)
          }}
          renderLeftIcon={() => <Icon icon="arrowDown" />}
        />
        <TouchableOpacity style={$flexRow} onPress={() => setPlaylistModalVisible(true)}>
          <Icon icon="plus" size={20} />
          <Text text="Create a playlist" style={$createPlaylistText} weight="medium" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTNCAccepted(!TNCAccepted)} style={$flexRow}>
          <Toggle onPress={() => setTNCAccepted(!TNCAccepted)} value={TNCAccepted} />
          <Text style={$tnc} tx="addAVideo.iAgree" weight="medium" />
          <TouchableOpacity onPress={() => navigation.navigate("Legal")} style={{ marginLeft: -4 }}>
            <Text
              color={colors.palette.primary100}
              style={$tnc}
              tx="addAVideo.tnc"
              weight="medium"
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <Button
          onPress={createVideo}
          disabled={buttonLoading}
          style={[$submitButton, { backgroundColor: colors.palette.primary100 }]}
          RightAccessory={() => (
            <ActivityIndicator
              animating={buttonLoading}
              size={20}
              style={$indicator}
              color={colors.palette.neutral100}
            />
          )}
        >
          <Text text="Post" style={$submitText} weight="semiBold" />
        </Button>
        <InputPlaylistInfoModal
          syncAllPlaylists={syncAllPlaylists}
          setModalVisible={setPlaylistModalVisible}
          isVisible={playlistModalVisible}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

const $submitText: TextStyle = {
  fontSize: 18,
  color: colors.palette.neutral100,
}

const $tnc: TextStyle = {
  fontSize: 14,
  marginLeft: spacing.extraSmall,
}

const $inputContainer: ViewStyle = {
  marginVertical: spacing.extraSmall,
}

const $descriptionContainer: ViewStyle = {}
const $flexRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing.extraSmall,
}

const $createPlaylistText: TextStyle = {
  color: colors.palette.primary100,
  fontSize: 14,
  marginLeft: spacing.extraSmall,
}

const $theme = {
  colors: {
    primary: colors.palette.primary100,
    border: "red",
    secondary: colors.palette.primary100,
  },
}

const $indicator: ViewStyle = { position: "absolute", right: 20 }

const $submitButton: ViewStyle = {
  height: 45,
  width: "100%",
  alignSelf: "center",
  marginTop: spacing.small,
  alignContent: "center",
  padding: 0,
  margin: 0,
  marginBottom: 20,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = { backgroundColor: colors.palette.neutral100, flex: 1 }

const $content: ViewStyle = {
  paddingHorizontal: spacing.extraLarge,
  // flex: 1,
}

const $dropdown: ViewStyle = {
  height: 50,
  borderColor: "gray",
  borderWidth: 2,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor: colors.palette.neutral100,
  marginVertical: spacing.extraSmall,
}
