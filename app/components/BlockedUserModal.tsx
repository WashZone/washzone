import React from "react"
import { ViewStyle, View, TextStyle, Linking } from "react-native"
import { Text, Screen, Button } from "."
import Modal from "react-native-modal"
import { colors, spacing } from "../theme"

export const BlockedUserModal = ({ isVisible }: { isVisible: boolean }) => {
  const contactViaEmail = () => {
    Linking.openURL("mailto:contact@washzone.com?subject=I have been blocked!&body=")
  }

  return (
    <Modal
      backdropColor="#000"
      isVisible={isVisible}
      swipeDirection={["down", "right", "left", "up"]}
      coverScreen
    >
      <Screen backgroundColor={colors.transparent} contentContainerStyle={$parentContainer}>
        <View style={$contentContainer}>
          <Text text={"You have been blocked!"} style={$headerTitle} weight="semiBold" size="md" />
          {/* <Text text={"Contact us via email!"} weight="semiBold" /> */}
          <Button
            onPress={contactViaEmail}
            style={[$submitButton, { backgroundColor: colors.palette.primary100 }]}
          >
            <Text text="Contact Us" style={$submitText} weight="semiBold" />
          </Button>
        </View>
      </Screen>
    </Modal>
  )
}

const $headerTitle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "center",
  marginVertical: spacing.medium,
}

const $parentContainer: ViewStyle = { justifyContent: "center", flex: 1 }

const $submitText: TextStyle = {
  fontSize: 18,
  color: colors.palette.neutral100,
}

const $submitButton: ViewStyle = {
  height: 45,
  width: "100%",
  alignSelf: "center",
  marginTop: spacing.small,
  alignContent: "center",
  padding: 0,
  margin: 0,
}

const $contentContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: spacing.medium,
  borderRadius: 10,
}
