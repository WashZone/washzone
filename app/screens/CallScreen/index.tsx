import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppStackScreenProps } from "../../navigators"
import { Screen } from "../../components"
import { Actions } from "./partials"
import { $flex1 } from "../styles"
import { TouchableOpacity, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"

export const CallScreen: FC<AppStackScreenProps<"CallScreen">> = observer(function CallScreen(
  props,
) {
  const navigation = useNavigation()

  const onHangUp = () => navigation.goBack()

  return (
    <Screen contentContainerStyle={$flex1}>
      <Actions onHangUp={onHangUp} />
    </Screen>
  )
})
