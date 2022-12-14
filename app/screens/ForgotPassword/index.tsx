import React, { FC, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Icon, Screen, Text, TextField } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export const ForgotPassword: FC<AppStackScreenProps<"ForgotPassword">> = function ForgotPassword() {
  const {
    api: { mutateSendEmailByUserId },
    userStore: { _id },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [currentPass, setCurrentPass] = useState("")
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const isActive = currentPass !== ""

  const onReset = async () => {
    setButtonLoading(true)
    try {
      const res = await mutateSendEmailByUserId({
        userId: _id,
      })
      console.log(res)
    } catch (e) {
      console.log("erroer", e)
      setButtonLoading(false)
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Forgot Password"
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

        <Text tx="resetPassword.title" weight="bold" style={$title} />
        <Text tx="resetPassword.description" weight="medium" style={$description} />

        <TextField
          value={currentPass}
          onChangeText={setCurrentPass}
          containerStyle={$textField}
          autoCorrect={false}
          placeholderTx="resetPassword.placeholder"
          style={$inputText}
          inputWrapperStyle={$inputWrapperStyle}
          placeholderTextColor={colors.palette.overlay50}
          maxLength={20}
        />

        <Button
          onPress={onReset}
          disabled={!isActive || buttonLoading}
          style={[
            $submitButton,
            { backgroundColor: isActive ? colors.palette.primary100 : colors.palette.neutral400 },
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
  marginTop: spacing.small,
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
