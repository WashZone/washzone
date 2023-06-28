import { observer } from "mobx-react-lite"
import React, { FC, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
  Toggle,
} from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { defaultImages } from "../../utils"
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validate"
import Toast from "react-native-toast-message"
import { $contentCenter, $flexRow } from "../styles"
import * as Linking from 'expo-linking'
import { toastMessages } from "../../utils/toastMessages"

interface SignupProps extends AppStackScreenProps<"Signup"> { }

export const SignupScreen: FC<SignupProps> = observer(function LoginScreen(_props) {
  const passwordInput = useRef<TextInput>()
  const emailInput = useRef<TextInput>()
  const confirmPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tncAccepted, setTncAccepted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  const {
    authenticationStore: { setAuthToken },
    userStore: { setUser },
    allChats:{setMyUserId},
    api: { mutateCreateUser },
  } = useStores()

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    if (!tncAccepted) Toast.show(toastMessages.acceptTNC)

    if (
      validateName(name) === "" &&
      validateEmail(email) === "" &&
      validateConfirmPassword(password, confirmPassword) === "" &&
      validatePassword(password) === "" &&
      tncAccepted
    ) {
      try {
        setLoading(true)
        const res = await mutateCreateUser({
          type: "email",
          isSocialLogin: false,
          lastName: name.split(" ")[1],
          firstName: name.split(" ")[0],
          password,
          email,
          name,
          picture: defaultImages.profile,
          username: ""
        })
        setUser({
          name: res.createUser.name,
          email: res.createUser.email,
          first_name: res.createUser.first_name,
          last_name: res.createUser.last_name,
          picture: res.createUser.picture,
          socialId: res.createUser.socialId,
          type: "",
          isSocialLogin: false,
          _id: res.createUser._id,
          blockedUser: [],
        })
        setMyUserId(res.createUser._id)
        setIsSubmitted(false)
        const token = new Date()
        setAuthToken(token.toString())
        setLoading(false)
      } catch (err) {
        console.log("SIGN UP ERROR", err)
        Toast.show({
          type: "error",
          text1: err?.response?.errors?.length > 0 && err?.response?.errors[0].message,
        })
        setLoading(false)
      }
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
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={colors.palette.primary100}
    >
      <View style={$logoContainer}>
        <Icon icon="appLogo" size={112} />
      </View>
      <Text testID="login-heading" tx="loginScreen.signUp" preset="heading" style={$signIn} />
      <Text tx="loginScreen.signupDescription" preset="subheading" style={$enterDetails} />

      <TextField
        value={name}
        onChangeText={setName}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="default"
        placeholderTx="loginScreen.nameLabel"
        helper={isSubmitted ? validateName(name) : ""}
        status={validateName(name) && isSubmitted ? "error" : undefined}
        onSubmitEditing={() => emailInput.current?.focus()}
        style={$inputText}
      />

      <TextField
        value={email}
        ref={emailInput}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="loginScreen.emailLabel"
        helper={isSubmitted ? validateEmail(email) : ""}
        status={validateEmail(email) && isSubmitted ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
        style={$inputText}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        placeholderTx="loginScreen.passwordLabel"
        helper={isSubmitted ? validatePassword(password) : ""}
        status={validatePassword(password) && isSubmitted ? "error" : undefined}
        onSubmitEditing={() => confirmPasswordInput.current.focus()}
        RightAccessory={PasswordRightAccessory}
        style={$inputText}
      />

      <TextField
        value={confirmPassword}
        ref={confirmPasswordInput}
        onChangeText={setConfirmPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTx="loginScreen.confirmPasswordLabel"
        helper={isSubmitted ? validateConfirmPassword(password, confirmPassword) : ""}
        status={
          validateConfirmPassword(password, confirmPassword) && isSubmitted ? "error" : undefined
        }
        onSubmitEditing={login}
        style={$inputText}
      />

      <View style={[$flexRow, $contentCenter, { marginBottom: spacing.homeScreen }]}>
        <Toggle
          containerStyle={{ marginRight: spacing.tiny }}
          inputInnerStyle={$checkBoxIn}
          inputOuterStyle={$checkBoxOut}
          onPress={() => setTncAccepted(!tncAccepted)}
          value={tncAccepted}
        />

        <Text color={colors.palette.neutral100} size="xxs" tx="loginScreen.tncIntro" />
        <Text
          color={colors.palette.glow100}
          weight="semiBold"
          onPress={() => Linking.openURL('http://admin.washzoneapp.com/Eula')}
          style={{}}
          tx="loginScreen.tncLink1"
          size="xxs"
        />
        <Text color={colors.palette.neutral100} tx="loginScreen.and" size="xxs" />
        <Text
          color={colors.palette.glow100}
          weight="semiBold"
          onPress={() => _props.navigation.navigate("Legal")}
          size="xxs"
          tx="loginScreen.tncLink2"
        />
        <Text color={colors.palette.neutral100} weight="semiBold" size="xxs" text="." />
      </View>
      <Button
        RightAccessory={() => (
          <ActivityIndicator
            style={$loadingIndicator}
            animating={loading}
            color={colors.palette.neutral100}
          />
        )}
        testID="login-button"
        text="Sign Up"
        style={$tapButton}
        preset="reversed"
        onPress={login}
        disabled={loading}
      />
      <Pressable onPress={() => _props.navigation.navigate("Login")} style={$footer}>
        <Text tx="loginScreen.navigateToLogin" size="sm" weight="light" style={$hint} />
        <Text tx="loginScreen.Login" size="sm" weight="bold" style={$footerText} />
      </Pressable>
    </Screen>
  )
})

const $checkBoxIn: ViewStyle = { height: 12, width: 12, alignSelf: "center" }

const $checkBoxOut: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  height: 24,
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  borderRadius: 10,
  borderColor: colors.palette.neutral100,
}

const $loadingIndicator: ViewStyle = { position: "absolute", right: spacing.medium }

const $footerText: TextStyle = {
  marginTop: spacing.medium,
  color: colors.palette.glow100,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
}

const $logoContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
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

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $inputText: TextStyle = {
  color: colors.palette.neutral100,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  height: 50,
}
