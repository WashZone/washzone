import React, { useMemo, useState } from "react"
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
import { Icon, IconTypes, Text, Toggle } from "../../components"
import { useStores } from "../../models"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../AppNavigator"

interface DrawerOptionType {
  icon: IconTypes
  label: TxKeyPath
  onPress: () => void
}

interface Action {
  action: DrawerOptionType
}

export function DrawerOptions({toggleDrawer} : {toggleDrawer:() => void}) {
  const {
    authenticationStore: { logout },
    userStore,
  } = useStores()

  const [notifications, setNotifications] = useState(false)

const navigaton = useNavigation<NavigationProp<AppStackParamList>>()

  const drawerOptions: DrawerOptionType[] = [
    {
      icon: "notifications",
      label: "DrawerNavigator.notification",
      onPress() {
        toggleDrawer()
        navigaton.navigate('Notifications')
      },
    },
    {
      icon: "profile",
      label: "DrawerNavigator.profile",
      onPress() {
        toggleDrawer()
        navigaton.navigate('EditProfile')
      },
    },
    {
      icon: "settings",
      label: "DrawerNavigator.settings",
      onPress() {
        navigaton.navigate('Settings')
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
      icon: 'save',
      label: "DrawerNavigator.saved",
      onPress() {
        toggleDrawer()
        navigaton.navigate('Saved')
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
        <Toggle variant='radio' editable value={notifications} onValueChange={()=> setNotifications(!notifications)}/> 
      </View>
      {drawerOptions
        .slice(1, 7)
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
  alignItems: "center",
  flexDirection:'row',
  justifyContent:'space-between'
}

const $actionIcon: ImageStyle = {
  marginRight: 14,
}

const $actionLabel: TextStyle = {
  fontSize: 13,
  fontWeight: "500",
  color: colors.palette.neutral800,
}
