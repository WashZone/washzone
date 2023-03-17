import React, { useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { $fontWeightStyles, BottomModal, Icon, IconTypes, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { MediaPicker } from "../../../utils/device/MediaPicker"
import { $contentCenter } from "../../styles"

export const CallInititateModal = ({ isVisible, setVisible, receiver, sendCall, handleLeave }) => {
  return (
    <BottomModal isVisible={isVisible} setVisible={setVisible}>
      <Text text={`Initiate Call with ${receiver?.name}`} />
      <View style={$container}>
        <Icon
          icon="x"
          onPress={handleLeave}
          containerStyle={[
            {
              height: 70,
              width: 70,
              borderRadius: 35,
              backgroundColor: colors.palette.angry100,
            },
            $contentCenter,
          ]}
        />
        <Icon
          icon="audioCall"
          onPress={sendCall}
          containerStyle={[
            {
              height: 70,
              width: 70,
              borderRadius: 35,
              backgroundColor: colors.palette.success100,
            },
            $contentCenter,
          ]}
        />
      </View>
    </BottomModal>
  )
}

const $optionContainer: ViewStyle = {
  width: "50%",
  ...$contentCenter,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
  flexDirection: "row",
}

const $optionLabel: TextStyle = {
  ...$fontWeightStyles.medium,
  color: colors.palette.neutral100,
}
