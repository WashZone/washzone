import React, { useRef, useState } from "react"
import { ViewStyle, View, ActivityIndicator, TextStyle } from "react-native"
import { Text, Screen, Button } from "../../components"
import Modal from "react-native-modal"
import { colors, spacing } from "../../theme"
import { Rating } from "react-native-ratings"
import SwipeRating from "react-native-ratings/dist/SwipeRating"

export const RateUserModal = ({
  isVisible,
  setModalVisible,
}: {
  isVisible: boolean
  setModalVisible: (b: boolean) => void
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [rating, setRating] = useState<any>()
  const ratingRef = useRef<SwipeRating>()

  const rateUser = async () => {
    console.log("RATING", rating)
    setButtonLoading(true)
    setModalVisible(false)
    setButtonLoading(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={!buttonLoading && ["down"]}
      onSwipeComplete={() => !buttonLoading && setModalVisible(false)}
      onBackdropPress={() => !buttonLoading && setModalVisible(false)}
    >
      <Screen backgroundColor={colors.transparent} contentContainerStyle={$parentContainer}>
        <View style={$contentContainer}>
          <Text text={"Rate User  "} style={$headerTitle} weight="semiBold" />
          <Rating
            ref={ratingRef}
            onFinishRating={(rating) => setRating(rating)}
            ratingColor={colors.palette.primary100}
            ratingTextColor={colors.palette.primary100}
            ratingBackgroundColor={colors.palette.neutral100}
            showRating
            startingValue={3}
            imageSize={40}
            style={{ backgroundColor: colors.palette.neutral100, marginTop: spacing.extraSmall }}
          />
          {/* <TextInput mode="outlined" label={"Title"} value={title} onChangeText={setTitle} />
          <Text text={error} style={$errorText} weight="medium" /> */}
          <Button
            onPress={rateUser}
            disabled={buttonLoading}
            style={[$submitButton, { backgroundColor: colors.palette.primary100 }]}
          >
            {buttonLoading ? (
              <ActivityIndicator
                animating={buttonLoading}
                size={20}
                color={colors.palette.neutral100}
              />
            ) : (
              <Text tx="common.submit" style={$submitText} weight="semiBold" />
            )}
          </Button>
        </View>
      </Screen>
    </Modal>
  )
}

const $headerTitle: TextStyle = {
  color: colors.palette.primary100,
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
