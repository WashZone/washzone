import { NavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Pressable } from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps, Screen } from "../../components"
import { useStores } from "../../models"
import { AppStackParamList } from "../../navigators"
import { colors, spacing } from "../../theme"
import { $flex1 } from "../styles"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"

export const LoginView = observer(() => {
  const authPasswordInput = useRef<TextInput>()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
    userStore: { setUser },
    api: { mutateSignin },
  } = useStores()

  async function login() {
    if (validationErrors.authEmail !== "" || validationErrors.authPassword !== "") return
    try {
      const res = await mutateSignin({
        email: authEmail,
        password: authPassword,
      })
console.log("res:mutateSignin",res )
      setUser({
        name: res.signin.name,
        email: res.signin.email,
        first_name: res.signin.first_name,
        last_name: res.signin.last_name,
        picture: res.signin.picture,
        socialId: res.signin.socialId,
        type: "",
        isSocialLogin: false,
        _id: res.signin._id,
      })
      setAuthToken(String(Date.now()))
    } catch (error) {
      Toast.show({ ...toastMessages.incorrectCredentials })
    }
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral100}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$flex1}
      safeAreaEdges={[]}
      backgroundColor={colors.palette.primary100}
    >
      <Text testID="login-heading" tx="loginScreen.Login" preset="heading" style={$signIn} />
      <Text tx="loginScreen.loginDescription" preset="subheading" style={$enterDetails} />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="loginScreen.emailLabel"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
        style={$inputText}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        placeholderTx="loginScreen.passwordLabel"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
        style={$inputText}
      />

      <Text
        tx="loginScreen.forgotPassword"
        size="sm"
        weight="bold"
        style={$forgotPass}
        onPress={() => navigation.navigate("ForgotPassword")}
      />

      <Button
        testID="login-button"
        text='Log In'
        style={$tapButton}
        preset="reversed"
        onPress={login}
        textColor={colors.palette.neutral100}
      />
      <Pressable onPress={() => navigation.navigate("Signup")} style={$footer}>
        <Text tx="loginScreen.noAccont" size="sm" weight="light" style={$hint} />
        <Text tx='loginScreen.signUp' size="sm" weight="bold" style={$footerText} />
      </Pressable>
    </Screen>
  )
})

export default LoginView

const $footerText: TextStyle = {
  marginTop: spacing.medium,
  color: colors.palette.glow100,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
}

const $signIn: TextStyle = {
  marginBottom: spacing.extraSmall,
  textAlign: "center",
  fontSize: 24,
  color: colors.palette.neutral100,
  marginTop: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
  color: colors.palette.neutral100,
  textAlign: "center",
}

const $hint: TextStyle = {
  color: colors.palette.overlayNeutral50,
  marginTop: spacing.medium,
}

const $forgotPass: TextStyle = {
  color: colors.palette.glow100,
  fontSize: 16,
  textAlign: "right",
  marginBottom: 10,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $inputText: TextStyle = {
  color: colors.palette.neutral100,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  marginHorizontal: spacing.extraSmall,
  height: 50,
}
