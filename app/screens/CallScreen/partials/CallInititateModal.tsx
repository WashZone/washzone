import React from "react"
import {  View, ViewStyle } from "react-native"
import {  BottomModal, Icon, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
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
            // eslint-disable-next-line react-native/no-inline-styles
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
            // eslint-disable-next-line react-native/no-inline-styles
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

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
  flexDirection: "row",
}

