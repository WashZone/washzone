import React, { useEffect, useRef, useState } from "react"
import { Dimensions, Platform, Pressable, TextStyle, View, ViewStyle, Keyboard } from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { Icon, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { TabNavigator } from "../TabNavigator"
import { colors } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { DrawerIconButton } from "./DrawerIconButton"
import { DrawerOptions } from "./DrawerOptions"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "../AppNavigator"

export function DrawerNavigator() {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const drawerRef = useRef<DrawerLayout>()
  const appNavigaion = useNavigation<NavigationProp<AppStackParamList>>()
  const progress = useSharedValue(0)

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      Keyboard.dismiss()
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  const handleSearchPress = () => {
    appNavigaion.navigate("Search")
  }

  return (
    <DrawerLayout
      drawerLockMode="locked-closed"
      ref={drawerRef}
      drawerWidth={Platform.select({ default: 326, web: Dimensions.get("screen").width * 0.3 })}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      drawerBackgroundColor={colors.palette.neutral100}
      overlayColor={colors.palette.overlay20}
      // keyboardDismissMode="on-drag"
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          progress.value = withTiming(drawerWillShow ? 1 : 0, {
            duration: 250,
          })
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => (
        <View style={[$drawer, $drawerInsets]}>
          <DrawerOptions toggleDrawer={toggleDrawer} />
          <View style={$versionContainer}>
            <Text tx="DrawerNavigator.version" style={$versionText} />
          </View>
        </View>
      )}
    >
      <Screen
        preset="fixed"
        backgroundColor={colors.palette.primary100}
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContainer}
      >
        <View style={$headerContainer}>
          <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
          <Icon icon="appLogo" size={45} />
          <Pressable style={$searchContainer} onPress={handleSearchPress}>
            <Icon icon="search" size={24} />
          </Pressable>
        </View>
        <TabNavigator />
      </Screen>
    </DrawerLayout>
  )
}

const $searchContainer: ViewStyle = {
  height: 56,
  width: 56,
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 2,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  paddingHorizontal: 4,
  height: 56,
}

const $versionContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  paddingLeft: 40,
  paddingBottom: 40,
}

const $versionText: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral400,
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  flex: 1,
}
