import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { Home, Topics, Classifieds, Videos } from "../tabs"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type TabParamList = {
  Home: undefined
  Topics: undefined
  Classifieds: undefined
  Videos: undefined
}

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarInactiveTintColor: colors.palette.neutral100,
        tabBarActiveTintColor: colors.tint,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: translate("TabNavigator.homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="home"
              size={26}
              color={focused ? colors.tint : colors.palette.neutral100}
              style={$iconStyle}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Topics"
        component={Topics}
        options={{
          tabBarLabel: translate("TabNavigator.topicsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="topics"
              size={24}
              color={focused ? colors.tint : colors.palette.neutral100}
              style={$iconStyle}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Classifieds"
        component={Classifieds}
        options={{
          tabBarLabel: translate("TabNavigator.ClassifiedsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="classifieds"
              size={26}
              color={focused ? colors.tint : colors.palette.neutral100}
              style={$iconStyle}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Videos"
        component={Videos}
        options={{
          tabBarLabel: translate("TabNavigator.videosTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="videos"
              size={28}
              color={focused ? colors.tint : colors.palette.neutral100}
              style={$iconStyle}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $iconStyle: ImageStyle = {
  marginBottom: 8,
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
