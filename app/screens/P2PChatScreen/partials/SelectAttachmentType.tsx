import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { BottomModal } from "../../../components"
import { spacing } from "../../../theme"

import { $contentCenter } from "../../styles"

export const SelectAttachmentType = ({ isVisible, setVisible }) => {

  return (
    <BottomModal isVisible={isVisible} setVisible={setVisible}>
      <View style={$container}>
        <TouchableOpacity style={$optionContainer}></TouchableOpacity>
        <TouchableOpacity style={$optionContainer}></TouchableOpacity>
      </View>
    </BottomModal>
  )
}

const $optionContainer: ViewStyle = {
  width: '50%',
  ...$contentCenter
}


const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
  flexDirection: 'row',
}

