import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { CallStatus, Role } from ".."
import { Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import { $contentCenter } from "../../styles"

export const Actions = ({
  onHangUp,
  role,
  status,
}: {
  onHangUp: () => void
  role: Role
  status: CallStatus
}) => {
  return (
    <View style={$container}>
      {role === Role.receiver && (
        <TouchableOpacity
          onPress={onHangUp}
          style={[$actionContainer, { backgroundColor: colors.palette.angry500 }]}
        >
          <Icon icon="x" size={30} color={colors.palette.neutral100} />
        </TouchableOpacity>
      )}
      {role !== Role.receiver && (
        <TouchableOpacity
          onPress={onHangUp}
          style={[$actionContainer, { backgroundColor: colors.palette.angry500 }]}
        >
          <Icon icon="hangUpCall" size={38} color={colors.palette.neutral100} style={{marginTop:spacing.tiny}}/>
        </TouchableOpacity>
      )}
      {role === Role.receiver && (
        <TouchableOpacity
          style={[$actionContainer, { backgroundColor: colors.palette.success100 }]}
        >
          <Icon icon="audioCall" size={30} color={colors.palette.neutral100} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const $sideActionConatiner: ViewStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  ...$contentCenter,
}

const $actionContainer: ViewStyle = {
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
  alignItems: "center",
  paddingHorizontal: spacing.medium,
}
