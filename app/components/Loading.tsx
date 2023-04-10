import React from "react"
import Lottie from "lottie-react-native"
import { Screen } from "./Screen"
import { $contentCenter, $flex1 } from "../screens/styles"
import { Dimensions } from "react-native"

export default function Loading() {
  return (
    <Screen contentContainerStyle={[$flex1, $contentCenter]}>
      <Lottie
        style={{ height: 40 }}
        source={require("../../assets/lottie/loader.json")}
        autoPlay
        loop
      />
    </Screen>
  )
}
