import React, { useMemo } from "react"
import {
  Alert,
  Dimensions,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
  Image,
} from "react-native"
import { TxKeyPath } from "../../i18n"
import { colors } from "../../theme"
import { Icon, IconTypes, Text } from "../../components"
import { useStores } from "../../models"

interface DrawerOptionType {
  icon: IconTypes
  label: TxKeyPath
  onPress: () => void
}

interface Action {
  action: DrawerOptionType
}

export function DrawerOptions() {
  const {
    authenticationStore: { logout },
    userStore,
  } = useStores()
  const drawerOptions: DrawerOptionType[] = [
    {
      icon: "notifications",
      label: "DrawerNavigator.notification",
      onPress() {
        Alert.alert("DrawerNavigator.notifications")
      },
    },
    {
      icon: "profile",
      label: "DrawerNavigator.profile",
      onPress() {
        Alert.alert("DrawerNavigator.profile")
      },
    },
    {
      icon: "settings",
      label: "DrawerNavigator.settings",
      onPress() {
        Alert.alert("DrawerNavigator.settings")
      },
    },
    {
      icon: "support",
      label: "DrawerNavigator.support",
      onPress() {
        Alert.alert("DrawerNavigator.support")
      },
    },
    {
      icon: "legal",
      label: "DrawerNavigator.legal",
      onPress() {
        Alert.alert("DrawerNavigator.legal")
      },
    },
    {
      icon: "logout",
      label: "DrawerNavigator.logout",
      onPress() {
        logout()
      },
    },
  ]

  const ActionComponent = (action: Action) => {
    const { icon, label, onPress } = action.action
    return (
      <Pressable
        onPress={onPress}
        style={getActionContainerStyle(!["notifications", "logout"].includes(icon))}
      >
        <Icon icon={icon} size={22} style={$actionIcon} />
        <Text tx={label} style={$actionLabel} />
      </Pressable>
    )
  }

  return (
    <View style={$container}>
      <View style={$userProfileContainer}>
        <Image
          source={{
            uri: userStore.picture,
          }}
          style={$profileImage}
        />
        <Text text={userStore.name} style={$userName} weight="bold" numberOfLines={1} />
      </View>
      <View style={$notificationContainer}>
        <ActionComponent key={drawerOptions[0].icon} action={drawerOptions[0]} />
      </View>
      {drawerOptions
        .slice(1, 6)
        .map((m) => useMemo(() => <ActionComponent key={m.icon} action={m} />, []))}
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  width: "100%",
}

const $userName: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral900,
  marginLeft: 10,
  width: 180,
}

const $userProfileContainer: ViewStyle = {
  marginTop: 10,
  marginLeft: -12.5,
  flexDirection: "row",
  height: 50,
  alignItems: "center",
  paddingLeft: 40,
}

const $profileImage: ImageStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  resizeMode: "contain",
}

const getActionContainerStyle = (withBorder: boolean) => {
  const $actionContainer: ViewStyle = {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    justifyContent: "flex-start",
    borderBottomColor: colors.border,
    borderBottomWidth: withBorder ? 1 : 0,
    paddingLeft: 40,
  }
  return $actionContainer
}

const $notificationContainer: ViewStyle = {
  height: Dimensions.get("screen").height * 0.2,
  justifyContent: "center",
}

const $actionIcon: ImageStyle = {
  marginRight: 14,
}

const $actionLabel: TextStyle = {
  fontSize: 13,
  fontWeight: "500",
  color: colors.palette.neutral800,
}
