import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "../../../components"
import { colors } from "../../../theme"
import { $contentCenter } from "../../styles"

export const Actions = ({onHangUp}) => {
  return (
    <View style={$container}>
      <TouchableOpacity onPress={onHangUp} style={[$iconContainer, { backgroundColor: colors.palette.angry500 }]}>
        <Icon icon="audioCall" size={30} color={colors.palette.neutral100} />
      </TouchableOpacity>
    </View>
  )
}

const $iconContainer: ViewStyle = {
  height: 80,
  width: 80,
  borderRadius: 40,
  ...$contentCenter,
}

const $container: ViewStyle = {
  position: "absolute",
  bottom: 40,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-end",
}
