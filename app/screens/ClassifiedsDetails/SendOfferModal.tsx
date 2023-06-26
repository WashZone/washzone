import { NavigationProp, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Keyboard, TextStyle, View, ViewStyle } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { $fontWeightStyles, BottomModal, Button, Text, TextField } from "../../components"
import { AppStackParamList } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHooks } from "../hooks"
import { toastMessages } from "../../utils/toastMessages"
import Toast from 'react-native-toast-message'

export const SendOfferModal = ({ isVisible, setVisible, receiver, classified }) => {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { sendClassfiedOffer, getOrCreateRoom } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const onSend = async () => {
    setLoading(true)
    const roomId = await getOrCreateRoom(receiver?._id)

    await sendClassfiedOffer(roomId, receiver?._id, amount, {
      id: classified?._id,
      amount,
      title: classified?.title,
      description: classified?.classifiedDetail,
      image: classified?.attachmentUrl,
    })

    setTimeout(() => {
      Keyboard.dismiss()
      setVisible(false)
      setLoading(false)
      if (!roomId) Toast.show(toastMessages.mightbeblocked)

      roomId && navigation.navigate("P2PChat", { receiver, roomId })
      setAmount("")
    }, 3000)
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
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={[{ height: 50 }]}
            // eslint-disable-next-line react-native/no-inline-styles
            inputWrapperStyle={{ height: 50 }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            style={[$inputTextStyle, 
            // eslint-disable-next-line react-native/no-inline-styles
            { marginLeft: 42 }]}
          />
          <Text
            text="$"
            style={[
              $inputTextStyle,
            // eslint-disable-next-line react-native/no-inline-styles
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
