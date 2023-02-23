import React, { useEffect, useRef, useState } from "react"
import { ViewStyle, View, ActivityIndicator, TextStyle } from "react-native"
import { Text, Screen, Button, BottomModal } from "../../components"
import Modal from "react-native-modal"
import { colors, spacing } from "../../theme"
import { Rating } from "react-native-ratings"
import SwipeRating from "react-native-ratings/dist/SwipeRating"
import { useHooks } from "../hooks"
import Toast from "react-native-toast-message"

export const RateUserModal = ({
  isVisible,
  setModalVisible,
  userId,
}: {
  isVisible: boolean
  setModalVisible: (b: boolean) => void
  userId: string
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [rating, setRating] = useState<any>()
  const ratingRef = useRef<SwipeRating>()
  const { getRatingOnUser, rateUser } = useHooks()

  const syncRating = async () => {
    const res = await getRatingOnUser(userId)
    setRating(res)
  }

  useEffect(() => {
    isVisible && syncRating()
  }, [isVisible])

  const onSubmit = async () => {
    setButtonLoading(true)
    const res = await rateUser(userId, rating)
    if (res) {
      setModalVisible(false)
      Toast.show({ type: "success", text1: `Rated ${rating} starred.` })
    }
    setButtonLoading(false)
  }

  return (
    <BottomModal isVisible={isVisible} setVisible={setModalVisible}>
      <View style={$contentContainer}>
        <Text text={"Rate User  "} style={$headerTitle} weight="semiBold" />
        <Rating
          ref={ratingRef}
          onFinishRating={(rating) => setRating(rating)}
          ratingColor={colors.palette.primary100}
          ratingTextColor={colors.palette.neutral100}
          ratingBackgroundColor={colors.palette.primary100}
          showRating
          tintColor={colors.palette.primary100}
          startingValue={rating}
          imageSize={40}
          style={{ backgroundColor: colors.palette.primary100, marginTop: spacing.extraSmall }}
        />
        {/* <TextInput mode="outlined" label={"Title"} value={title} onChangeText={setTitle} />
          <Text text={error} style={$errorText} weight="medium" /> */}
        <Button
          onPress={onSubmit}
          disabled={buttonLoading}
          style={[$submitButton, { backgroundColor: colors.palette.neutral100 }]}
          textStyle={{ color: colors.palette.primary100 }}
        >
          {buttonLoading ? (
            <ActivityIndicator
              animating={buttonLoading}
              size={20}
              color={colors.palette.primary100}
            />
          ) : (
            <Text tx="common.submit" style={$submitText} weight="semiBold" />
          )}
        </Button>
      </View>
    </BottomModal>
  )
}

const $headerTitle: TextStyle = {
  color: colors.palette.neutral100,
}

const $parentContainer: ViewStyle = { justifyContent: "center", flex: 1, height: 500 }

const $submitText: TextStyle = {
  fontSize: 18,
  color: colors.palette.primary100,
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
  padding: spacing.medium,
}
