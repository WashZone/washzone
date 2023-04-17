import React, { useEffect, useRef, useState } from "react"
import { ViewStyle, View, ActivityIndicator, TextStyle, Platform } from "react-native"
import { Text, Button, BottomModal } from "../../components"
import { colors, spacing } from "../../theme"
import { Rating } from "react-native-ratings"
import SwipeRating from "react-native-ratings/dist/SwipeRating"
import { useHooks } from "../hooks"
import Loading from "../../components/Loading"

export const RateUserModal = ({
  isVisible,
  setModalVisible,
  userId,
  onRateUser
}: {
  isVisible: boolean
  setModalVisible: (b: boolean) => void
  userId: string
  onRateUser: (n: number) => Promise<void>
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [rating, setRating] = useState<any>()
  const ratingRef = useRef<SwipeRating>()
  const { getRatingOnUser } = useHooks()

  const syncRating = async () => {
    setLoading(true)
    const res = await getRatingOnUser(userId)
    console.log("syncRating", res)
    setRating(res)
    setLoading(false)
  }

  useEffect(() => {
    isVisible && syncRating()
  }, [isVisible])

  const onSubmit = async () => {
    setButtonLoading(true)
    await onRateUser(rating)
    setButtonLoading(false)
  }

  return (
    <BottomModal
      isVisible={isVisible}
      setVisible={setModalVisible}
      backgroundColor={colors.palette.neutral250}
    >
      <View style={$contentContainer}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text
              text={"Rate User  "}
              style={$headerTitle}
              weight="semiBold"
              color={colors.palette.primary100}
            />
            <Text
              text={"Rated By You : " + rating + "/5"}
              style={$headerTitle}
              weight="semiBold"
              color={colors.palette.primary100}
              size="md"
            />
            <Rating
              ref={ratingRef}
              type="custom"
              onFinishRating={(rating) => setRating(rating)}
              ratingColor={colors.palette.primary100}
              ratingTextColor={colors.palette.neutral100}
              ratingBackgroundColor={colors.palette.neutral400}
              // showRating
              tintColor={colors.palette.neutral250}
              startingValue={rating}
              imageSize={40}
              style={{ marginTop: spacing.medium }}
              jumpValue={1}

              fractions={0}
            />

            {/* <TextInput mode="outlined" label={"Title"} value={title} onChangeText={setTitle} />
          <Text text={error} style={$errorText} weight="medium" /> */}
            <Button
              onPress={onSubmit}
              disabled={buttonLoading}
              style={[$submitButton, { backgroundColor: colors.palette.primary100 }]}
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
          </>
        )}
      </View>
    </BottomModal>
  )
}

const $headerTitle: TextStyle = {
  color: colors.palette.neutral100,
}

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
  padding: spacing.medium,
  height: Platform.OS === 'android' ? 200 : 180,
}
