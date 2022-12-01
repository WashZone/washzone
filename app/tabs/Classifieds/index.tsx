import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { spacing } from "../../theme"

export const Classifieds: FC<TabScreenProps<"Classifieds">> = function Classifieds(_props) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}></Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}
