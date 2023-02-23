import React, { useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { $fontWeightStyles, BottomModal, IconTypes, ListItem } from "../../../components"
import { colors, spacing } from "../../../theme"
import { MediaPicker } from "../../../utils/device/MediaPicker"
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
  flexDirection:'row',
}

const $optionLabel: TextStyle = {
  ...$fontWeightStyles.medium,
  color: colors.palette.neutral100,
}
