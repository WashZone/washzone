import React, { FC, useEffect, useState } from "react"
import { Dimensions, ScrollView, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Header, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import RenderHtml from "react-native-render-html"
import { useHooks } from "../hooks"

export const Legal: FC<AppStackScreenProps<"Legal">> = observer(function Legal() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { getLegalities } = useHooks()
  const [data, setData] = useState("")

  const syncLegal = async () => {
    const res = await getLegalities()
    setData(res)
  }
  useEffect(() => {
    syncLegal()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Legal"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <ScrollView style={$content} showsVerticalScrollIndicator={false}>
        <RenderHtml contentWidth={Dimensions.get("window").width} source={{ html: data }} />
      </ScrollView>
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
