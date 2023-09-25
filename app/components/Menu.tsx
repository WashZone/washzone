import React from "react"
import { Menu as PaperMenu } from "react-native-paper"
import { colors } from "../theme"
import { Icon } from "./Icon"
import { View, ViewStyle } from "react-native"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"

type TMenuItem = {
  title: string
  icon: IconSource
  onPress: () => void
}

type TMenuProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data: Array<TMenuItem>
  containerStyle?: ViewStyle
  anchorColor?: string
  anchorContainer?: ViewStyle
  anchorIconSize?: number
}

export const Menu = ({
  visible,
  setVisible,
  data,
  anchorColor = colors.palette.primary100,
  containerStyle = {},
  anchorContainer = $anchorContainer,
  anchorIconSize = 24,
}: TMenuProps) => {
  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <View style={containerStyle}>
      <PaperMenu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Icon
            onPress={openMenu}
            icon="more"
            size={anchorIconSize}
            color={anchorColor}
            containerStyle={anchorContainer}
          />
        }
        contentStyle={{backgroundColor: colors.palette.neutral200}}
      >
        {data.map((i) => (
          <PaperMenu.Item key={i.title} leadingIcon={i.icon} title={i.title} onPress={i.onPress} />
        ))}
      </PaperMenu>
    </View>
  )
}

const $anchorContainer: ViewStyle = {
  width: 32,
  height: 32,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: colors.palette.overlayNeutral50,
}

export const $verticalAbsoluteTop: ViewStyle = {
  position: "absolute",
  right: 8,
  top: 20,
  // transform: [{ rotate: "90deg" }],
}

export default Menu
