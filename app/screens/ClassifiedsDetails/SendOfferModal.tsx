import { NavigationProp, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Keyboard, TextStyle, View, ViewStyle } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { $fontWeightStyles, BottomModal, Button, Text, TextField } from "../../components"
import { AppStackParamList } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"

export const SendOfferModal = ({ isVisible, setVisible, receiver, classified }) => {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { sendClassfiedOffer, getOrCreateRoom } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const onSend = async () => {
    setLoading(true)
    const roomId = await getOrCreateRoom(receiver?._id)

    const res = await sendClassfiedOffer(roomId, receiver?._id, amount, {
      id: classified?._id,
      amount,
      title: classified?.title,
      description: classified?.classifiedDetail,
      image: classified?.attachmentUrl,
    })
    Keyboard.dismiss()
    setLoading(false)
    setVisible(false)
    navigation.navigate("P2PChat", { receiver: receiver, roomId: roomId })
    setAmount("")
  }

  return (
    <BottomModal isVisible={isVisible} setVisible={setVisible} avoidKeyboard>
      <View style={$contentCenter}>
        <Text
          text={"Your Offer:"}
          color={colors.palette.neutral100}
          weight="semiBold"
          style={{ marginBottom: spacing.extraSmall, marginHorizontal: spacing.tiny }}
        />
        <View>
          <TextField
            containerStyle={[{ height: 50 }]}
            inputWrapperStyle={{ height: 50 }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            style={[$inputTextStyle, { marginLeft: 42 }]}
          />
          <Text
            text="$"
            style={[
              $inputTextStyle,
              {
                position: "absolute",
                left: 10,
                lineHeight: 50,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        </View>
        <Button style={$button} disabled={parseInt(amount) === 0 || amount === ""} onPress={onSend}>
          {loading ? (
            <ActivityIndicator color={colors.palette.primary100} />
          ) : (
            <Text text="Send" color={colors.palette.primary100} weight="semiBold" />
          )}
        </Button>
      </View>
    </BottomModal>
  )
}

const $button: ViewStyle = { marginTop: spacing.medium, height: 45 }

const $textButton: TextStyle = {
  fontSize: 16,
  color: colors.palette.primary100,
}

const $inputTextStyle: TextStyle = {
  textAlignVertical: "center",
  fontSize: 40,
  color: colors.palette.neutral100,
  ...$fontWeightStyles.medium,
  letterSpacing: 1,
  lineHeight: 46,
  height: 50,
  marginVertical: 0,
  marginHorizontal: 0,
}

const $contentCenter: ViewStyle = {
  padding: spacing.medium,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
  flexDirection: "row",
}

const $optionLabel: TextStyle = {
  ...$fontWeightStyles.medium,
  color: colors.palette.neutral100,
}
