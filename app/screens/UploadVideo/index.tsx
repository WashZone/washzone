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
    console.log("SYNCING PLAYLISTS")
    const allPlaylistDropDownData = []
    const res = await queryGetVideoPlaylistByUserId(
      { userId: _id },
      { fetchPolicy: "network-only" },
    )
    console.log("ALL PLAYLIST", res.getVideoPlaylistByUserId?.data)
    if (res.getVideoPlaylistByUserId?.data) {
      res.getVideoPlaylistByUserId?.data.map((playlist) =>
        allPlaylistDropDownData.push({ label: playlist?.playListName, value: playlist?._id }),
      )
    }
    console.log("SYNCING PLAYLISTS to :", allPlaylistDropDownData)
    setAllPlaylist(allPlaylistDropDownData)
  }

  const createVideo = async () => {
    if (title.length === 0) {
      Toast.show({ ...toastMessages.inputTitle })
      return
    }
    // if (youtubeUrl.split("=").length !== 2) {
    //   Toast.show({ ...toastMessages.inputYTURL })
    //   return
    // }
    if (description.length === 0) {
      Toast.show({ ...toastMessages.inputDescription })
      return
    }
    if (!TNCAccepted) {
      Toast.show({ ...toastMessages.acceptTNC })
      return
    }
    try {
      setButtonLoading(true)
      await uploadVideo({
        videoHeading: title,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeUrl.split("=")[1]}/default.jpg`,
        attachmentVideoUrl: youtubeUrl,
        vedioPlaylistId: value,
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
        title="Add a Video"
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
          label={"Description"}
          theme={$theme}
          placeholder="Enter a short description here!"
          numberOfLines={1}
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
          maxLength={180}
        />

        <Dropdown
          data={allPlaylists}
          search
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
          <Text style={$tnc} tx="addAVideo.acceptTNC" weight="medium" />
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
          <Text tx="common.add" style={$submitText} weight="semiBold" />
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

const $descriptionContainer: ViewStyle = { height: 120, paddingBottom: spacing.extraSmall }
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
