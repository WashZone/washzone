import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, ListItem, Screen, Toggle } from "../../components"
import { colors, spacing } from "../../theme"
import * as Linking from "expo-linking"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { useHooks } from "../hooks"
import { showAlertYesNo } from "../../utils/helpers"

export const Settings: FC<AppStackScreenProps<"Settings">> = observer(function Settings() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const [status, setStatus] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const {
    userStore: { isSocialLogin, _id },
  } = useStores()

  const { getUserById, setNotificationStatus } = useHooks()

  const syncStatus = async () => {
    const res = await getUserById(_id)
    setStatus(res?.notificationStatus)
  }

  useEffect(() => {
    syncStatus()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Settings"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <View style={$content}>
        <ListItem
          onPress={async () => {
            if (disabled) return
            setDisabled(true)
            await setNotificationStatus(!status)
            syncStatus()
            setDisabled(false)
          }}
          style={$listItemStyle}
          leftIcon="bell"
          text="Notifications"
          RightComponent={<Toggle variant="switch" value={status} />}
        />
        <ListItem
          onPress={() => navigation.navigate("BlockedUsers")}
          style={$listItemStyle}
          leftIcon="blockUser"
          text="Blocked Users"
          rightIcon="caretRight"
        />
        {!isSocialLogin && (
          <ListItem
            onPress={() => navigation.navigate("ResetPassword")}
            style={$listItemStyle}
            leftIcon="reset"
            text="Reset Password"
            rightIcon="caretRight"
          />
        )}
        <ListItem
          onPress={() =>
            showAlertYesNo({
              message: "Close Account ?\n",
              description:
                "Are you sure you want to close your account?  \n\n This action is irreversible and all your data will be permanently deleted. \n\n You will be redirected to a web-page to verify your identity.",
              onYesPress: () => Linking.openURL("http://admin.washzoneapp.com/delete-account"),
            })
          }
          style={$listItemStyle}
          leftIcon="deleteUser"
          text="Close Account"
          rightIcon="caretRight"
        />
      </View>
    </Screen>
  )
})

const $listItemStyle: ViewStyle = {
  alignItems: "center",
  borderBottomWidth: 0.5,
  borderColor: colors.palette.overlay20,
  paddingVertical: spacing.micro,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  marginHorizontal: spacing.extraLarge,
  marginVertical: spacing.medium,
}
