import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
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

interface SignupProps extends AppStackScreenProps<"Signup"> {}

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
  const [attemptsCount, setAttemptsCount] = useState(0)

  const {
    authenticationStore: { setAuthToken },
    userStore:{setUser},
    api:{
      mutateCreateUser
    }
  } = useStores()

  console.log("Actual",JSON.stringify(useStores().api))

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    
    if (
      validateName(name) === "" &&
      validateEmail(email) === "" &&
      validateConfirmPassword(password, confirmPassword) === "" &&
      validatePassword(password) === ""
    ) {
      const res = await mutateCreateUser({
        type: 'User',
        isSocialLogin: false,
        lastName: name.split(' ')[1],
        firstName: name.split(' ')[0],
        password,
        email,
        name,
        picture: defaultImages.profile
      })
      setUser({
        name: res.createUser.name,
        email: res.createUser.email,
        first_name: res.createUser.first_name,
        last_name: res.createUser.last_name,
        picture: res.createUser.picture,
        socialId: res.createUser.socialId,
        type: '',
        isSocialLogin : false,
        _id: res.createUser._id
      })
      console.log(res)
      setIsSubmitted(false)
      const token = new Date()
      setAuthToken(token.toString())
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
        onSubmitEditing={()=>confirmPasswordInput.current.focus()}
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
      <Button
        testID="login-button"
        tx="loginScreen.create"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
      <Pressable onPress={() => _props.navigation.navigate("Login")} style={$footer}>
        <Text tx="loginScreen.navigateToLogin" size="sm" weight="light" style={$hint} />
        <Text tx="loginScreen.Login" size="sm" weight="bold" style={$footerText} />
      </Pressable>
    </Screen>
  )
})

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
  height:50
}
