import React, { useEffect, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { $fontWeightStyles, BottomModal, IconTypes, ListItem } from "../../../components"
import { colors, spacing } from "../../../theme"
import { CustomMessageType } from "./CustomChatMessage"

export const MessageOptionsModal = ({ isVisible, setVisible, message, metadata }) => {
  const getDefaultOptions = (type: string, metadata?: { type: string }) => {
    const defaultOptions = [
      {
        label: "View Profile",
        onPress: () => console.log("View Profile"),
        icon: "userProfile" as IconTypes,
      },
      // { label: "Delete", onPress: () => console.log("DELETING"), icon: "delete" as IconTypes },
    ]
    const additionalOptions = () => {
      switch (type) {
        case "text":
          return []
        case "file":
        case "image":
          return [
            {
              label: "Download",
              onPress: () => console.log("Downloading"),
              icon: "download" as IconTypes,
            },
            {
              label: "Share",
              onPress: () => console.log("SHARING"),
              icon: "share3Dot" as IconTypes,
            },
          ]
        case "custom":
          switch (metadata.type) {
            case CustomMessageType.classifiedOffer:
              return [
                {
                  label: "View Classified",
                  onPress: () => console.log("Downloading"),
                  icon: 'classifieds' as IconTypes,
                },
              ]
          }
        default:
          return []
      }
    }
    return [...defaultOptions, ...additionalOptions()]
  }

  const [options, setOptions] = useState(getDefaultOptions(message?.type, message?.metadata))

  useEffect(() => {
    setOptions(getDefaultOptions(message.type, message?.metadata))
  }, [message])

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
