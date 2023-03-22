import React, { FC, useState } from "react"
import { ActivityIndicator, Alert, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Icon, Screen, Text, TextField } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import OTPTextInput from "react-native-otp-textinput"

export const VerifyOTP: FC<AppStackScreenProps<"VerifyOTP">> = function VerifyOTP(props) {
  const { email } = props.route.params
  const { resetPassword } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  // const [email, setEmail] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [error, setError] = useState("")
  const [otp, setOtp] = useState("")
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const onReset = async () => {
    setButtonLoading(true)

    if (newPass !== confirmPass) {
      setButtonLoading(false)
      setError("Passwords do not match!")
      return
    }
    try {
      await resetPassword({ email, otp, password: newPass })
      Alert.alert("Success!", "Your password has been changed successfully. Please Login!")
      navigation.navigate('Login')
      setButtonLoading(false)
    } catch (e) {
      console.log("erroer", e)
      setButtonLoading(false)
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Reset Password"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />

      <View style={$content}>
        <View style={$topContainer}>
          <View style={$seperator} />
          <Icon icon="key" size={53} />
          <View style={$seperator} />
        </View>

        <Text text="Enter New Password" weight="bold" style={$title} />
        <Text text={`OTP has been sent to ${email}.`} weight="medium" style={$description} />

        <Text text={error} size="xxs" color={colors.palette.angry500} />

        <TextField
          value={newPass}
          onChangeText={setNewPass}
          containerStyle={$inputText}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="New Password"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={100}
        />

        <TextField
          value={confirmPass}
          onChangeText={setConfirmPass}
          containerStyle={$inputText}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirm Password"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={20}
        />

        <OTPTextInput handleTextChange={setOtp} />
        <Button
          onPress={onReset}
          disabled={buttonLoading}
          style={[
            $submitButton,
            {
              backgroundColor: colors.palette.primary100,
            },
          ]}
          text={"Reset"}
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

const $topContainer: ViewStyle = {
  marginTop: spacing.extraLarge,
  flexDirection: "row",
  alignItems: "center",
}

const $seperator: ViewStyle = {
  height: 1,
  backgroundColor: colors.palette.primary100,
  flex: 1,
  marginHorizontal: spacing.medium,
}

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
  marginTop: spacing.extraLarge,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $title: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "center",
  fontSize: 18,
  marginTop: spacing.extraLarge,
}

const $description: TextStyle = {
  textAlign: "center",
  fontSize: 14,
  lineHeight: 28,
  marginBottom: spacing.extraLarge,
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  margin: spacing.extraLarge,
  marginVertical: spacing.massive,
}

const $inputWrapperStyle: ViewStyle = {
  borderColor: colors.palette.primary100,
  marginBottom: spacing.medium,
}

const $inputText: TextStyle = {
  color: colors.palette.primary100,
  borderColor: colors.palette.primary100,
}
