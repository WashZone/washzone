import React, { useEffect, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { $fontWeightStyles, BottomModal, IconTypes, ListItem } from "../../../components"
import { colors, spacing } from "../../../theme"
import { useHooks } from "../../hooks"

export const OptionsModal = ({ isVisible, setVisible, onDelete }) => {
  const { deleteChatRoom } = useHooks()

  const options = [
    {
      label: "Delete",
      onPress: onDelete,
      icon: "delete" as IconTypes,
    },
  ]

  return (
    <BottomModal isVisible={isVisible} setVisible={setVisible}>
      {options.map((option) => (
        <ListItem
          key={option.label}
          rightIcon={option.icon}
          rightIconColor={colors.palette.neutral100}
          style={$listItem}
          text={option.label}
          textStyle={$optionLabel}
          onPress={option.onPress}
        />
      ))}
    </BottomModal>
  )
}

const $listItem: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $optionLabel: TextStyle = {
  ...$fontWeightStyles.medium,
  color: colors.palette.neutral100,
}
