import React, { FC } from "react"
import { ScrollView, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Header, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"

export const Support: FC<AppStackScreenProps<"Support">> = observer(function Support() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Support"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <ScrollView style={$content} showsVerticalScrollIndicator={false}></ScrollView>
    </Screen>
  )
})

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "center",
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  marginHorizontal: spacing.extraLarge,
  flex: 1,
}
