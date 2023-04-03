import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { CallStatus, Role } from "../audioCall"
import { Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import { $contentCenter } from "../../styles"

export const Actions = ({
  onHangUp,
  role,
  status,
  acceptCall,
  setSpeaker,
  setMute,
  mute,
  speaker,
}: {
  setSpeaker: (b: boolean) => void
  setMute: (b: boolean) => void
  mute: boolean
  speaker: boolean
  acceptCall: () => void
  onHangUp: () => void
  role: Role
  status: CallStatus
}) => {
  if (status === CallStatus.processing) return null
  return (
    <View style={$container}>
      {status === CallStatus.connected ? (
        <>
          <TouchableOpacity
            onPress={() => setMute(!mute)}
            style={[$sideActionConatiner, { backgroundColor: colors.palette.greyOverlay100 }]}
          >
            <Icon
              icon={mute ? "microphone_block" : "microphone"}
              size={28}
              color={colors.palette.neutral100}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onHangUp}
            style={[$actionContainer, { backgroundColor: colors.palette.angry500 }]}
          >
            <Icon
              icon="hangUpCall"
              size={38}
              color={colors.palette.neutral100}
              style={{ marginTop: spacing.tiny }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSpeaker(!speaker)}
            style={[$sideActionConatiner, { backgroundColor: colors.palette.greyOverlay100 }]}
          >
            <Icon
              icon={speaker ? "speaker" : "no_audio"}
              size={28}
              color={colors.palette.neutral100}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {role === Role.receiver && (
            <TouchableOpacity
              onPress={onHangUp}
              style={[$actionContainer, { backgroundColor: colors.palette.angry500 }]}
            >
              <Icon icon="x" size={30} color={colors.palette.neutral100} />
            </TouchableOpacity>
          )}
          {role === Role.initiator && (
            <TouchableOpacity
              onPress={onHangUp}
              style={[$actionContainer, { backgroundColor: colors.palette.angry500 }]}
            >
              <Icon
                icon="hangUpCall"
                size={38}
                color={colors.palette.neutral100}
                style={{ marginTop: spacing.tiny }}
              />
            </TouchableOpacity>
          )}
          {role === Role.receiver && (
            <TouchableOpacity
              testID="accept-call"
              onPress={acceptCall}
              style={[$actionContainer, { backgroundColor: colors.palette.success100 }]}
            >
              <Icon icon="audioCall" size={30} color={colors.palette.neutral100} />
            </TouchableOpacity>
          )}
        </>
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
