import React, { useState } from "react"
import { ActivityIndicator } from "react-native-paper"
import { BottomModal, Button, Text, TextField } from "../../components"
import { colors, spacing } from "../../theme"
import { $contentCenter } from "../styles"

export const ReportUserModal = ({ isVisible, setVisible, onReport, userName }) => {
    const [reason, setReason] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const onReportPress = async () => {
        setButtonLoading(true)
        await onReport(reason.trim())
        setButtonLoading(false)
    }

    return (
        <BottomModal
            isVisible={isVisible}
            setVisible={setVisible}
            backgroundColor={colors.palette.angry100}
            avoidKeyboard
        >
            <Text
                text={"Report " + userName + "?"}
                size="lg"
                weight="semiBold"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textAlign: "center", margin: spacing.homeScreen }}
                color={colors.palette.angry500}
            />
            <TextField
                placeholderTextColor={colors.palette.neutral700}
                placeholder="What's the reason ?"
                multiline
                maxLength={256}
                numberOfLines={5}
                value={reason}
                onChangeText={setReason}
            />

            <Button
                // text="Report"
                onPress={onReportPress}
                preset="reversed"
                disabled={reason?.length < 4}
                style={{
                    padding: spacing.homeScreen,
                    marginHorizontal: spacing.homeScreen,
                    marginTop: spacing.homeScreen,
                    backgroundColor: colors.palette.angry500,
                    ...$contentCenter,
                }}
            >
                {buttonLoading ? (
                    <ActivityIndicator color={colors.palette.neutral100} />
                ) : (
                    <Text weight="semiBold" text={"Report"} style={{ color: colors.palette.neutral100 }} />
                )}
            </Button>
        </BottomModal>
    )
}

export default ReportUserModal
