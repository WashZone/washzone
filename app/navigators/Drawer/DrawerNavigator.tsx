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
import { $flexRow } from "../../screens/styles"

export function DrawerNavigator() {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const drawerRef = useRef<DrawerLayout>()
  const appNavigaion = useNavigation<NavigationProp<AppStackParamList>>()
  const progress = useSharedValue(0)

  const toggleDrawer = () => {
    console.log("TOGGLING!")
    if (!open) {
      Keyboard.dismiss()
      drawerRef.current?.openDrawer({ speed: 2 })
      setOpen(true)
    } else {
      drawerRef.current?.closeDrawer({ speed: 10 })
      setOpen(false)
    }
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  const handleSearchPress = () => {
    appNavigaion.navigate("Search")
  }

  const handleChatPress = () => {
    appNavigaion.navigate("AllChats")
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
          <DrawerOptions toggleDrawer={() => toggleDrawer()} />
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
          <View style={{ position: 'absolute', left: 0 }}>
            <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
          </View>
          <Icon icon="appLogo" size={45} />
          <View style={[$flexRow, { position: 'absolute', right: 10 }]}>
            <Pressable style={$searchContainer} onPress={handleChatPress}>
              <Icon icon="chatMessage" size={24} />
            </Pressable>
            <Pressable style={$searchContainer} onPress={handleSearchPress}>
              <Icon icon="search" size={24} />
            </Pressable>
          </View>
        </View>
        <TabNavigator />
      </Screen>
    </DrawerLayout>
  )
}

const $searchContainer: ViewStyle = {
  height: 56,
  width: 40,
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 2,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
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
