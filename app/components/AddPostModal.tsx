import React, { useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal, Icon, $baseTextStyle } from "."
import { set } from "date-fns"
import { navigationRef } from "../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../tabs"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { $contentCenter } from "../screens/styles"
const expandedHeight = 400
const buttonColors = ["#FF5733", "#33FFA8", "#3373FF"]
const buttons = [{ label: "Post" }, { label: "Discuss" }]

export const AddPostModal = () => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <Button style={$addButton} onPress={() => setVisible(true)}>
        <Icon icon={"plus"} size={40} color={colors.palette.primary300} />
      </Button>
      <BottomModal
        isVisible={isVisible}
        setVisible={setVisible}
        backgroundColor={colors.palette.neutral100}
      >
        <BottomModalContent hide={() => setVisible(false)} />
      </BottomModal>
    </>
  )
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
export const BottomModalContent = ({ hide }) => {
  const buttonHeights = buttons.map(() => useSharedValue(50))
  const textInputOpacities = buttons.map(() => useSharedValue(0))
  const sharedVal = useSharedValue(0)
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()
  const expandPost = () => {
    // buttonHeights.forEach((height, i) => {
    //   height.value = withTiming(i === index ? expandedHeight : 50, {
    //     duration: 300,
    //     easing: Easing.out(Easing.exp),
    //   })
    //   textInputOpacities[i].value = withTiming(i === index ? 1 : 0, {
    //     duration: 300,
    //     easing: Easing.out(Easing.exp),
    //   })
    // })
  }

  const $postButtonAnimated = useAnimatedStyle(() => {
    return {}
  })

  return (
    <View>
      <Text
        text="Would you like to post or discuss?"
        numberOfLines={2}
        style={$headerText}
        weight="medium"
      />
      {/* {buttons.map(({ label }, index) => ( */}
      <AnimatedTouchable
        style={[$button, { backgroundColor: colors.palette.primary300 }, $postButtonAnimated]}
        onPress={expandPost}
      >
        {/* <TextInput style={$textInput} placeholder="Enter text" /> */}

        <Text style={$baseTextStyle} color={colors.palette.neutral100} text="POST" />
      </AnimatedTouchable>
      {/* ))} */}

      <Button
        text="DISCUSS"
        textColor={colors.palette.neutral100}
        style={[$button, { backgroundColor: colors.palette.primary300 }]}
      />
      <Button text="CANCEL" textColor={colors.palette.primary300} style={$button} onPress={hide} />
    </View>
  )
}

const $textInput: ViewStyle = {
  width: "100%",
  height: 40,
  paddingHorizontal: 10,
  marginTop: 10,
  backgroundColor: "white",
}

const $buttonText: TextStyle = {
  color: "white",
  fontSize: 16,
}

const $addButton: ViewStyle = {
  padding: 12,
  margin: 12,
  width: 80,
  height: 50,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
}

const $headerText: TextStyle = {
  marginVertical: spacing.medium,
  textAlign: "center",
}

const $button: ViewStyle = {
  padding: 12,
  margin: 12,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
  ...$contentCenter,
}

export default AddPostModal
