import React from "react"
import Lottie from "lottie-react-native"
import { Screen } from "./Screen"
import { $contentCenter, $flex1 } from "../screens/styles"
import { colors } from "../theme"

export default function Loading() {
  return (
    <Screen contentContainerStyle={[$flex1, $contentCenter, { backgroundColor: colors.transparent }]}>
      <Lottie
        style={{ height: 40, backgroundColor: colors.transparent }}
        source={require("../../assets/lottie/loader.json")}
        autoPlay
        loop
      />
    </Screen>
  )
}
