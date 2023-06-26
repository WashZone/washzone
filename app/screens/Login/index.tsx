import { useIsFocused } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import { Dimensions, Image, Keyboard, Linking, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Button, iconRegistry, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import LoginView from "./Login"
import { SocialLogin } from "./SocialLoginButtons"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

interface LogoProps {
  animVal: SharedValue<number>
}
const dimesions = Dimensions.get("screen")
const Logo = ({ animVal }: LogoProps) => {
  const AnimatedImage = Animated.createAnimatedComponent(Image)

  const animatedLogo = useAnimatedStyle(() => {
    const height = interpolate(
      animVal.value,
      [0, 1, 2],
      [dimesions.height - 550, dimesions.height - 650, 0],
    )
    const width = interpolate(
      animVal.value,
      [0, 1, 2],
      [dimesions.height - 550, dimesions.height - 650, 0],
    )

    return {
      height,
      width,
      resizeMode: "contain",
    }
  })

  return useMemo(
    () => (
      <Animated.View style={$logoContainer}>
        <AnimatedImage source={iconRegistry.appLogo} style={animatedLogo} />
      </Animated.View>
    ),
    [animVal],
  )
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const focus = useIsFocused()
  const animVal = useSharedValue(0)
  const [firstLoad, setFirstLoad] = useState(false)

  useEffect(() => {
    if (focus) {
      if (firstLoad && animVal.value === 0) {
        animVal.value = withTiming(1, { duration: 300 })
      }
    } else {
      Keyboard.dismiss()
    }
    setFirstLoad(true)
  }, [focus])

  function login() {
    animVal.value = withTiming(1, {
      duration: 300,
    })
  }

  function handleKeyboard(focus: boolean) {
    animVal.value = withTiming(focus ? 2 : 1, {
      duration: 300,
    })
  }

  const animatedViewTop = useAnimatedStyle(() => {
    const height = interpolate(animVal.value, [0, 1], [150, 0])
    const opacity = interpolate(animVal.value, [0, 0.2], [1, 0])
    return {
      height,
      opacity,
      width: "100%",
    }
  })

  const animatedContentContainer = useAnimatedStyle(() => {
    const height = interpolate(animVal.value, [0, 1], [150, 410])

    return {
      height,
      width: "100%",
      justifyContent: "flex-end",
    }
  })

  const animatedViewBottom = useAnimatedStyle(() => {
    const height = interpolate(animVal.value, [0, 1], [0, 300])

    return {
      flex: animVal.value,
      height,
      width: "100%",
      marginBottom: 30,
      paddingHorizontal: 30,
    }
  })

  const animatedSocialLoginView = useAnimatedStyle(() => {
    const height = interpolate(animVal.value, [0, 1], [240, 200])

    return {
      height,
      justifyContent: "flex-end",
      backgroundColor: colors.palette.neutral100,
      paddingBottom: 40,
    }
  })

  return (
    <Screen
      androidKeyboardBehavior="height"
      keyboardOffset={-200}
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
    >
      <View style={$topView}>
        <Logo animVal={animVal} />
        <Animated.View style={animatedContentContainer}>
          <Animated.View style={animatedViewTop}>
            <Text tx="loginScreen.welcomeText" style={$headerText} preset="h2" />
            <Text
              tx="loginScreen.description"
              style={$subHeaderText}
              preset="subheading2"
              numberOfLines={2}
            />
            <View style={$buttonContainer}>
              <Button
                testID="get-started-button"
                text="Sign Up"
                style={$tapButton}
                preset="reversed"
                textColor={colors.palette.neutral100}
                onPress={() => navigation.navigate("Signup")}
              />
              <Button
                testID="get-started-button"
                text="LogIn"
                style={$tapButton}
                preset="reversed"
                onPress={login}
              />
            </View>
          </Animated.View>
          <Animated.View style={animatedViewBottom}>
            <LoginView handleKeyboard={handleKeyboard} />
          </Animated.View>
        </Animated.View>
        <Animated.View style={animatedSocialLoginView}>
          <SocialLogin />
          <View style={$footerContainer}>
            <Text tx="loginScreen.tncIntro" style={$textLight} />
            <Text
              tx="loginScreen.tncLink1"
              onPress={() => Linking.openURL("http://admin.washzoneapp.com/Eula")}
              style={$textHyperLink}
            />
            <Text tx="loginScreen.and" style={$textLight} />
            <Text
              onPress={() => navigation.navigate("Legal")}
              tx="loginScreen.tncLink2"
              style={$textHyperLink}
            />
          </View>
        </Animated.View>
      </View>
    </Screen>
  )
})

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const $textLight: TextStyle = {
  color: colors.palette.neutral400,
  fontSize: 12,
}

const $textHyperLink: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral800,
  textDecorationLine: "underline",
}

const $footerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}

const $subHeaderText: TextStyle = {
  textAlign: "center",
  alignSelf: "center",
  width: "85%",
  marginBottom: 8,
  color: colors.palette.neutral100,
}

const $headerText: TextStyle = {
  textAlign: "center",
  width: "80%",
  alignSelf: "center",
  color: colors.palette.neutral100,
}

const $logoContainer: ViewStyle = {
  paddingTop: 20,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $topView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.primary100,
  justifyContent: "center",
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $tapButton: ViewStyle = {
  width: "40%",
  marginTop: spacing.extraSmall,
  marginBottom: spacing.extraLarge,
  marginHorizontal: 10,
  height: 50,
}
