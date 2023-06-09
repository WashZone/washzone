import React, { useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal, Icon } from "."

export const AddPostModal = () => {
  const [isVisible, setVisible] = useState(false)
  return (
    <>
      <Button style={$addButton} onPress={() => setVisible(true)}>
        <Icon icon={"plus"} size={40} color={colors.palette.primary300} />
      </Button>
      <BottomModal
        isVisible={isVisible}
        setVisible={setVisible}
        backgroundColor={colors.palette.neutral100}
      >
        <Text text="Would you like to post or discuss?" numberOfLines={2} style={$headerText} weight="medium" />
        <Button
          text="POST"
          textColor={colors.palette.neutral100}
          style={[$button, { backgroundColor: colors.palette.primary300 }]}
        />
        <Button
          text="DISCUSS"
          textColor={colors.palette.neutral100}
          style={[$button, { backgroundColor: colors.palette.primary300 }]}
        />
        <Button
          text="CANCEL"
          textColor={colors.palette.primary300}
          style={$button}
          onPress={() => setVisible(false)}
        />
      </BottomModal>
    </>
  )
}

const $addButton: ViewStyle = {
  padding: 12,
  margin: 12,
  width: 80,
  height: 50,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
}

const $headerText: TextStyle = {
  marginVertical: spacing.medium,
  textAlign: "center",
}

const $button: ViewStyle = {
  padding: 12,
  margin: 12,
  borderRadius: 30,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
}

export default AddPostModal
