import { NavigationProp, useNavigation } from "@react-navigation/native"
import React from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { $flexRow, $contentCenter } from "../../styles"
import { $fontWeightStyles, Icon, Text } from "../../../components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { formatName } from "../../../utils/formatName"
import { Role } from "../../CallScreen/audioCall"

export const P2PHeader = ({ data, roomId , blocked }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const safeArea = useSafeAreaInsets()

  return (
    <View style={{ paddingTop: safeArea.top, backgroundColor: colors.palette.primary100 }}>
      <View style={$container}>
        <View style={[$flexRow, $contentCenter]}>
          <TouchableOpacity
            style={{ marginLeft: spacing.medium, marginRight: spacing.medium }}
            onPress={() => navigation.goBack()}
          >
            <Icon icon="back" size={24} color={colors.palette.neutral100} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[$flexRow, $contentCenter]}
            onPress={() => navigation.navigate("UserProfile", { user: data, header: true })}
          >
            <FastImage source={{ uri: data?.picture }} style={$profileImage} />
            <View>
              <Text text={formatName(data?.name)} style={$usernameText} size="md" />
              {/* <View style={$flexRow}>
                <View style={[$statusIcon, { backgroundColor: colors.palette.status.online }]} />
                <Text
                  text={data?.status || "Online"}
                  style={$usernameText}
                  size="xxs"
                  color={colors.palette.greyOverlay100}
                />
              </View> */}
            </View>
          </TouchableOpacity>
        </View>
       {!blocked && <View style={[$flexRow, $contentCenter]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AudioCall", {
                receiver: data,
                role: Role.initiator,
                roomId,
              })
            }}
          >
            <Icon icon="audioCall" size={28} color={colors.palette.neutral100} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("VideoCallAndroid", {
                receiver: data,
                role: Role.initiator,
                roomId,
              })
            }}
          >
            <Icon
              icon="videoCall"
              size={28}
              color={colors.palette.neutral100}
              containerStyle={{ marginHorizontal: spacing.medium }}
            />
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  )
}


const $usernameText: TextStyle = {
  color: colors.palette.neutral100,
  ...$fontWeightStyles.medium,
}

const $profileImage: ImageStyle = {
  height: 44,
  width: 44,
  borderRadius: 22,
  marginRight: spacing.extraSmall,
}

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 58,
}
