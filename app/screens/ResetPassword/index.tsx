import React, { FC, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Screen, TextField } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"

export const ResetPassword: FC<AppStackScreenProps<"ResetPassword">> = function ResetPassword() {
  const {
    api: { mutateResetPassword },
    userStore: { _id },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const isActive = currentPass !== "" && newPass !== "" && confirmPass !== ""

  const onSave = async () => {
    setButtonLoading(true)
    try {
      const res = await mutateResetPassword({
        userId: _id,
        newPassword: confirmPass,
        oldPassword: currentPass,
      })
      Toast.show({ ...toastMessages.passwordResetSuccess })
      setButtonLoading(false)
    } catch (e) {
      Toast.show({ ...toastMessages.incorrectCredentials })
      setButtonLoading(false)
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Password Reset"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />

      <View style={$content}>
        <TextField
          value={currentPass}
          onChangeText={setCurrentPass}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Current Password"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={20}
        />

        <TextField
          value={newPass}
          onChangeText={setNewPass}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="New Password"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={20}
        />

        <TextField
          value={confirmPass}
          onChangeText={setConfirmPass}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirm Password"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={20}
        />

        <Button
          onPress={onSave}
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
      </View>
    </Screen>
  )
}

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
