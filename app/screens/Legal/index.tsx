import React, { FC, useEffect, useState } from "react"
import { Dimensions, ScrollView, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Header, Screen } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import RenderHtml from "react-native-render-html"
import { useHooks } from "../hooks"

const tagsStyles = {
  body: {
    color: colors.palette.neutral800,
    backgroundColor:colors.palette.neutral100
  },
  h1: {
    color: colors.palette.neutral800,
  },
  h2: {
    color: colors.palette.neutral800,
  },
  h3: {
    color: colors.palette.neutral800,
  },
  h4: {
    color: colors.palette.neutral800,
  },
  p: { color: colors.palette.neutral800 },
  li: { color: colors.palette.neutral800 },
  ul: { color: colors.palette.neutral800 },
}

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
        backgroundColor={colors.palette.neutral100}
        leftIcon="caretLeft"
        title="Legal"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <ScrollView style={$content} showsVerticalScrollIndicator={false}>
        <RenderHtml
          tagsStyles={tagsStyles}
          contentWidth={Dimensions.get("window").width}
          source={{ html: data }}
        />
      </ScrollView>
    </Screen>
  )
})

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "center",
}

const $container: ViewStyle = {
  backgroundColor:colors.palette.neutral100,
  flex: 1,
}

const $content: ViewStyle = {
  marginHorizontal: spacing.extraLarge,
  flex: 1,
}
