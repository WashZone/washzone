import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Header, Screen } from "../../components"
import { colors } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export const Notifications: FC<AppStackScreenProps<"Notifications">> = function Notifications() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Notifications"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
    </Screen>
  )
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = {
  flex: 1,
}
