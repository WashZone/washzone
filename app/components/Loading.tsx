import React from "react"
import Lottie from "lottie-react-native"
import { Screen } from "./Screen"
import { $contentCenter, $flex1 } from "../screens/styles"
import { colors } from "../theme"
import { ViewStyle } from "react-native"

export default function Loading() {
  return (
    <Screen
      contentContainerStyle={[$flex1, $contentCenter, { backgroundColor: colors.transparent }]}
    >
      <Lottie style={$lottie} source={require("../../assets/lottie/loader.json")} autoPlay loop />
    </Screen>
  )
}

const $lottie: ViewStyle = { height: 40, backgroundColor: colors.transparent }
