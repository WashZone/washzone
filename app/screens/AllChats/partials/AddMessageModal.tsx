import React from "react"
import { FlatList, KeyboardAvoidingView, View, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { TextInput } from "react-native-paper"

import { BottomModal, Screen } from '../../../components'
import { spacing } from "../../../theme"
import { $flex1 } from "../../styles"

export const AddMessageModal = ({ isVisible, setVisible }) => {
    return (
        <BottomModal propagateSwipe isVisible={isVisible} setVisible={setVisible}>

            <View style={$contentContainer}>
                <TextInput mode='outlined' label={'Search'} placeholder="Input Any user's name" />
                <KeyboardAwareScrollView scrollEnabled style={$scrollContainer}>
                   {/* <FlatList data/> */}
                    {/* <View style={{ height: 100, width: '100%', backgroundColor: 'red' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'green' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'red' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'green' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'red' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'green' }} />
                    <View style={{ height: 100, width: '100%', backgroundColor: 'red' }} /> */}
                </KeyboardAwareScrollView>
            </View>

        </BottomModal>
    )
}

const $scrollContainer: ViewStyle = {
    flex: 1,
}


const $contentContainer: ViewStyle = {
    height: 600,
    width: '100%',
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.large
}