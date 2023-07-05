import React, { useEffect, useState } from "react"
import { ColorValue, Keyboard, TextStyle, View, ViewStyle } from "react-native"
import Modal from "react-native-modal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "../theme"
import { Text } from "./Text"

const Handle = () => {
  return <View style={$handle} />
}

interface CustomModalProps {
  isVisible: boolean
  setVisible: (b: boolean) => void
  children: React.ReactNode
  title?: string
  propagateSwipe?: boolean
  avoidKeyboard?: boolean
  showIndicator?: boolean
  backgroundColor?: ColorValue
  keyboardOffset?: number
  disableUnMount?: boolean
}

export const BottomModal = ({
  propagateSwipe,
  isVisible,
  setVisible,
  children,
  title,
  avoidKeyboard,
  backgroundColor,
  keyboardOffset = 0,
  showIndicator = true,
  disableUnMount = false,
}: CustomModalProps) => {
  const safeArea = useSafeAreaInsets()
  const closeModal = () => setVisible(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <Modal
      propagateSwipe={propagateSwipe}
      isVisible={isVisible}
      style={$modal}
      avoidKeyboard={avoidKeyboard}
      swipeDirection={disableUnMount ? [] : ["down"]}
      onSwipeComplete={() => { !disableUnMount && closeModal() }}
      onBackdropPress={() => { !disableUnMount && closeModal() }}
    >
      <View 
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginBottom: isKeyboardVisible ? keyboardOffset : 0 }}>
        {showIndicator && <Handle />}
        <View
          style={[
            $content,
            { paddingBottom: safeArea.bottom },
            backgroundColor && { backgroundColor },
          ]}
        >
          <Text text={title} style={$title} weight="semiBold" />
          {children}
        </View>
      </View>
    </Modal>
  )
}

const $title: TextStyle = {
  textAlign: "center",
  lineHeight: 80,
  fontSize: 25,
  textAlignVertical: "center",
}

const $content: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
}

const $modal: ViewStyle = { justifyContent: "flex-end", margin: 0 }

const $handle: ViewStyle = {
  height: 3,
  width: 89,
  backgroundColor: colors.palette.neutral100,
  alignSelf: "center",
  marginVertical: 9,
}
