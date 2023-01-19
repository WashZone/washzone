import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, ListItem, Screen, Toggle } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"

export const Settings: FC<AppStackScreenProps<"Settings">> = observer(function Settings() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const {
    userStore: { isSocialLogin },
  } = useStores()
  console.log()
  const {
    settings: { toggleNotification, notifications },
  } = useStores()
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
          onPress={() => toggleNotification()}
          style={$listItemStyle}
          leftIcon="bell"
          tx="settings.notificationToggle"
          RightComponent={
            <Toggle variant="switch" value={notifications} onPress={() => toggleNotification()} />
          }
        />
        {!isSocialLogin && (
          <ListItem
            onPress={() => navigation.navigate("ResetPassword")}
            style={$listItemStyle}
            leftIcon="reset"
            tx="settings.reset"
            rightIcon="caretRight"
          />
        )}
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
