import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, Button, BottomModal } from "."

export const ChooseMediaModal = (props: {
    onTakePhoto: () => Promise<void>
    onChooseFromLibrary: () => Promise<void>
    isVisible: boolean
    setVisible: (b: boolean) => void
}) => {
    const { isVisible, setVisible, onTakePhoto, onChooseFromLibrary } = props
    return (
        <BottomModal
            isVisible={isVisible}
            setVisible={setVisible}
            backgroundColor={colors.palette.neutral100}
        >
            <Text text="Select a photo or Video." style={$headerText} weight='medium' />
            <Button
                text="TAKE A PHOTO"
                textColor={colors.palette.neutral100}
                onPress={async () => { await onTakePhoto(); setVisible(false) }}
                style={[$button, { backgroundColor: colors.palette.primary300 }]}
            />
            <Button
                text="CHOOSE FROM LIBRARY"
                textColor={colors.palette.neutral100}
                onPress={async () => { await onChooseFromLibrary(); setVisible(false) }}
                style={[$button, { backgroundColor: colors.palette.primary300 }]}
            />
            <Button
                text="CANCEL"
                onPress={() => props.setVisible(false)}
                style={$button}
                textStyle ={{color:colors.palette.primary300}}
                pressedStyle={{ backgroundColor: colors.palette.primary300, borderColor: colors.palette.primary300 }}
                pressedTextStyle={{ color: colors.palette.neutral700 }}
            />
        </BottomModal>
    )
}


const $headerText: TextStyle = {
    marginVertical: spacing.medium, textAlign: 'center'
}

const $button: ViewStyle = {
    padding: 12,
    margin: 12,
    borderRadius: 30,
    borderColor: colors.palette.primary300,
    borderWidth: 1,
}

export default ChooseMediaModal
