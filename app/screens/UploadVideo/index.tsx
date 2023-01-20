import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  Pressable,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Checkbox, TextInput } from "react-native-paper"
import { Button, Header, Icon, Screen, Text, Toggle } from "../../components"
import { Dropdown } from "react-native-element-dropdown"

import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { useHooks } from "../hooks"

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
]

export const UploadVideo: FC<AppStackScreenProps<"UploadVideo">> = function UploadVideo() {
  const {
    api: { queryGetVideoPlaylistByUserId },
    userStore: { _id },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [TNCAccepted, setTNCAccepted] = useState<boolean>(false)
  const [value, setValue] = useState("")
  const [allPlaylists, setAllPlaylist] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const { uploadVideo } = useHooks()

  const syncAllPlaylists = async () => {
    const allPlaylistDropDownData = []
    const res = await queryGetVideoPlaylistByUserId({ userId: _id })
    console.log("ALL PLAYLIST", res.getVideoPlaylistByUserId?.data)
    if (res.getVideoPlaylistByUserId?.data) {
      res.getVideoPlaylistByUserId?.data.map((playlist) =>
        allPlaylistDropDownData.push({ label: playlist?.playListName, value: playlist?._id }),
      )
    }
    setAllPlaylist(allPlaylistDropDownData)
  }

  const createVideo = async () => {
    if (title.length === 0) {
      Toast.show({ ...toastMessages.inputVideoTitle })
      return
    }
    if (youtubeUrl.split("=").length !== 2) {
      Toast.show({ ...toastMessages.inputYTURL })
      return
    }
    if (description.length === 0) {
      Toast.show({ ...toastMessages.inputVideoDescription })
      return
    }
    if (!TNCAccepted) {
      Toast.show({ ...toastMessages.acceptTNC })
      return
    }
    try {
      uploadVideo({
        videoHeading: title,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeUrl.split("=")[1]}/default.jpg`,
        attachmentVideoUrl: youtubeUrl,
        vedioPlaylistId: value,
      })
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  useEffect(() => {
    syncAllPlaylists()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Add a Video"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />

      <View style={$content}>
        <TextInput
          value={title}
          style={$inputContainer}
          onChangeText={setTitle}
          mode="outlined"
          label={"Title"}
          theme={$theme}
        />
        <TextInput
          multiline
          value={description}
          onChangeText={setDescription}
          style={[$inputContainer, $descriptionContainer]}
          mode="outlined"
          label={"Description"}
          theme={$theme}
          maxLength={240}
          placeholder="Enter a short description here!"
        />
        <TextInput
          value={youtubeUrl}
          onChangeText={setYoutubeUrl}
          style={$inputContainer}
          mode="outlined"
          label={"Youtube URL"}
          theme={$theme}
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
        <TouchableOpacity style={$flexRow}>
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
          <Icon icon="caretRight" color={colors.palette.neutral100} size={30} style={$iconCaret} />
        </Button>
      </View>
    </Screen>
  )
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

const $iconCaret: ImageStyle = { alignSelf: "center", marginTop: 5 }

const $submitButton: ViewStyle = {
  height: 45,
  width: 160,
  alignSelf: "center",
  marginTop: spacing.small,
  alignContent: "center",
  padding: 0,
  margin: 0,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  margin: spacing.extraLarge,
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

const $inputWrapperStyle: ViewStyle = {
  borderColor: colors.palette.primary100,
}

const $inputText: TextStyle = {
  color: colors.palette.primary100,
  borderColor: colors.palette.primary100,
}
