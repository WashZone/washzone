import React, { FC, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  Pressable,
} from "react-native"
import { TextInput } from "react-native-paper"
import { Button, Header, Icon, Screen, Text, Toggle } from "../../components"
import { Dropdown } from "react-native-element-dropdown"

import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { useHooks } from "../hooks"
import en from "../../i18n/en"
import { MediaPicker } from "../../utils/device/MediaPicker"
import FastImage, { ImageStyle as FastImageStyle } from "react-native-fast-image"

const data = [
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
  { label: "Like New", value: "Like New" },
  { label: "Excellent", value: "Excellent" },
  { label: "Good", value: "Good" },
  { label: "Fair", value: "Fair" },
  { label: "Poor", value: "Poor" },
]

const MediaHandlerComponent = ({ selectedMedia, setSelectedMedia }) => {
  const [loading, setLoading] = useState(true)
  const selectClassifiedMedia = async () => {
    const res = await MediaPicker()
    console.log("MediaHandlerComponent", res)
    setSelectedMedia(res)
  }
  return (
    <TouchableOpacity
      style={[
        $containerUploadMedia,
        !selectedMedia && {
          paddingRight: spacing.small,
        },
      ]}
      onPress={selectClassifiedMedia}
    >
      {selectedMedia ? (
        <>
          <FastImage
            onLoad={() => setLoading(false)}
            source={{ uri: selectedMedia.uri }}
            style={$mediaImage}
          />
          <ActivityIndicator
            color={colors.palette.primary100}
            style={$imageLoadingIndicator}
            animating={loading}
          />
        </>
      ) : (
        <>
          <Icon icon="uploadCloud" size={24} />
          <Text text="Upload" style={$createPlaylistText} weight="medium" />
        </>
      )}
      {selectedMedia && (
        <TouchableOpacity
          style={$removeMedia}
          onPress={() => {
            setSelectedMedia(undefined)
            setLoading(true)
          }}
        >
          <Icon icon="x" size={20} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export const AddAClassified: FC<AppStackScreenProps<"AddAClassified">> = function AddAClassified() {
  const {
    userStore: { _id },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<any>(undefined)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [TNCAccepted, setTNCAccepted] = useState<boolean>(false)
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const { createClassified, refreshClassifieds } = useHooks()

  const handleCreatePress = async () => {
    if (title.length === 0) {
      Toast.show({ ...toastMessages.inputTitle })
      return
    }
    if (description.length === 0) {
      Toast.show({ ...toastMessages.inputDescription })
      return
    }
    if (value.length === 0) {
      Toast.show({ ...toastMessages.selectionCondition })
      return
    }
    if (!selectedMedia) {
      Toast.show({ ...toastMessages.minimumOnePhotoRequired })
      return
    }
    if (!TNCAccepted) {
      Toast.show({ ...toastMessages.acceptTNC })
      return
    }
    try {
      setButtonLoading(true)
      await createClassified({
        attachmentUrl: selectedMedia.uri,
        title,
        prize: price,
        classifiedDetail: description,
        condition: value,
      })
      await refreshClassifieds()
      navigation.goBack()
      setButtonLoading(false)
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
      setButtonLoading(false)
    }
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$container}
      backgroundColor={colors.palette.neutral100}
      safeAreaEdges={["bottom"]}
    >
      <Header
        leftIcon="caretLeft"
        title={en.headerTitle.addClassfied}
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        backgroundColor={colors.palette.neutral100}
        leftIconColor={colors.palette.neutral600}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={$content}>
        <TextInput
          value={title}
          style={$inputContainer}
          onChangeText={setTitle}
          mode="outlined"
          label={"Title"}
          theme={$theme}
        />

        <TextInput
          value={price}
          onChangeText={setPrice}
          style={$inputContainer}
          mode="outlined"
          label={"Price"}
          theme={$theme}
          maxLength={240}
          multiline
          keyboardType="number-pad"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[$inputContainer, $descriptionContainer]}
          mode="outlined"
          label={"Description"}
          theme={$theme}
          maxLength={240}
          placeholder="Enter a short description here!"
          multiline
          contentStyle={{ height: 120 }}
          blurOnSubmit
        />

        <Dropdown
          data={data}
          maxHeight={300}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[$dropdown, isFocus && { borderColor: colors.palette.primary100, borderWidth: 2 }]}
          labelField="label"
          valueField="value"
          placeholderStyle={{ color: colors.palette.neutral900 }}
          itemTextStyle={{ color: colors.palette.neutral700 }}
          selectedTextStyle={{ color: colors.palette.neutral900 }}
          placeholder={"Condition"}
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

        <MediaHandlerComponent selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />

        <Pressable onPress={() => setTNCAccepted(!TNCAccepted)} style={[$flexRow]}>
          <Toggle onPress={() => setTNCAccepted(!TNCAccepted)} value={TNCAccepted} />
          <TouchableOpacity onPress={() => setTNCAccepted(!TNCAccepted)} style={$flexRow}>
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
        </Pressable>

        <Button
          onPress={handleCreatePress}
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
      </ScrollView>
    </Screen>
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
  marginHorizontal: spacing.extraLarge,
  flex: 1,
}

const $dropdown: ViewStyle = {
  height: 50,
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor: colors.palette.neutral100,
  marginVertical: spacing.extraSmall,
}

const $containerUploadMedia: ViewStyle = {
  borderColor: colors.palette.primary100,
  borderStyle: "dotted",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 10,
  paddingVertical: spacing.small,
  marginVertical: spacing.small,
}

const $mediaImage: FastImageStyle = {
  height: Dimensions.get("window").width - 2 * spacing.extraLarge,
  width: Dimensions.get("window").width - 2 * spacing.extraLarge - 2 * spacing.small,
  borderRadius: 8,
}

const $removeMedia: ViewStyle = {
  position: "absolute",
  right: spacing.medium,
  top: spacing.medium,
  backgroundColor: colors.palette.overlayNeutral50,
  padding: spacing.micro,
  borderRadius: spacing.micro,
}

const $imageLoadingIndicator: ViewStyle = {
  position: "absolute",
}
