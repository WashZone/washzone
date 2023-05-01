import React, { FC, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField, Button } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { useStores } from "../../models"
import { MediaPicker } from "../../utils/device/MediaPicker"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const maxBioLength = 280

export const EditProfile: FC<AppStackScreenProps<"EditProfile">> = function EditProfile() {
  const { userStore } = useStores()
  const { updateProfile } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [firstName, setFirstName] = useState(userStore.first_name)
  const [lastName, setLastName] = useState(userStore.last_name)
  const [bio, setBio] = useState(userStore?.description || "")
  const [picture, setPicture] = useState({ uri: userStore.picture })
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [justOverflowed, setJustOverflowed] = useState<boolean>(false)

  const isActive = firstName !== "" && lastName !== ""

  const onEditPP = async () => {
    const res = await MediaPicker()
    if (res) {
      setPicture(res)
    }
  }

  const onChangeFirstName = (t: string) => {
    if (t[t.length - 1] !== " ") {
      setFirstName(t)
    }
  }

  const onChangeLastName = (t: string) => {
    if (t[t.length - 1] !== " ") {
      setLastName(t)
    }
  }

  const onChangeBio = (t: string) => {
    if (t.length > maxBioLength) {
      setJustOverflowed(true)
      setTimeout(() => setJustOverflowed(false), 200)
    } else if (t.length <= maxBioLength + 1) {
      setBio(t)
    }
  }

  const onSubmit = async () => {
    if (isActive) {
      setButtonLoading(true)
      await updateProfile(
        firstName,
        lastName,
        bio,
        picture?.uri === userStore.picture ? picture?.uri : picture,
      )
      navigation.goBack()
      setButtonLoading(false)
    }
  }

  return (
    <>
      <Header
        leftIcon="caretLeft"
        title="Edit Profile"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <Screen contentContainerStyle={[$container, $content]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={}> */}
          <FastImage source={{ uri: picture?.uri }} style={$picture} />

          <Text text="Edit Profile Picture" style={$editPP} onPress={onEditPP} />
          <TextField
            value={firstName}
            onChangeText={onChangeFirstName}
            containerStyle={$textField}
            autoCorrect={false}
            placeholder="First Name"
            style={$inputText}
            inputWrapperStyle={$inputWrapperStyle}
            placeholderTextColor={colors.palette.overlay50}
            maxLength={20}
          />

          <TextField
            value={lastName}
            onChangeText={onChangeLastName}
            containerStyle={$textField}
            autoCorrect={false}
            placeholder="Last Name"
            style={$inputText}
            inputWrapperStyle={$inputWrapperStyle}
            placeholderTextColor={colors.palette.overlay50}
            maxLength={20}
          />

          <TextField
            value={bio}
            onChangeText={onChangeBio}
            containerStyle={$textField}
            autoCorrect={false}
            placeholder="Bio"
            style={[$inputText, $bioHeight, justOverflowed && { color: colors.palette.angry500 }]}
            inputWrapperStyle={[
              $inputWrapperStyle,
              { borderColor: justOverflowed ? colors.palette.angry500 : colors.palette.primary100 },
            ]}
            placeholderTextColor={colors.palette.overlay50}
            multiline
          />

          <Button
            onPress={onSubmit}
            disabled={!isActive || buttonLoading}
            style={[
              $submitButton,
              { backgroundColor: isActive ? colors.palette.primary100 : colors.palette.neutral400 },
            ]}
            text={"Save"}
            textStyle={$textButton}
            RightAccessory={() => (
              <ActivityIndicator
                animating={buttonLoading}
                size={20}
                style={$indicator}
                color={colors.palette.neutral100}
              />
            )}
          />
        </KeyboardAwareScrollView>
      </Screen>
    </>
  )
}

const $bioHeight: ViewStyle = { height: 150 }

const $indicator: ViewStyle = { position: "absolute", right: 20 }

const $textButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
}

const $submitButton: ViewStyle = {
  height: 45,
  width: 160,
  alignItems: "center",
  borderWidth: 0,
  alignSelf: "center",
  marginTop: spacing.small,
}

const $editPP: TextStyle = {
  alignSelf: "center",
  color: colors.palette.primary100,
  marginBottom: 50,
  marginTop: 10,
}

const $picture: ImageStyle = {
  height: 100,
  width: 100,
  borderRadius: 50,
  alignSelf: "center",
  marginTop: 40,
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
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $inputWrapperStyle: ViewStyle = {
  borderColor: colors.palette.primary100,
}

const $inputText: TextStyle = {
  color: colors.palette.primary100,
  borderColor: colors.palette.primary100,
}
