import { NavigationProp, useNavigation } from "@react-navigation/native"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { ListItem, Text } from "../../../components"
import { AppStackParamList } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { $flex1 } from "../../styles"

export const P2PUserComponent = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const handlePress = () => {
    navigation.navigate("P2PChat", {receiver :{_id :'test', name :'Jirazo'}})
  }
  return (
    <ListItem
      onPress={handlePress}
      height={66}
      containerStyle={$container}
      LeftComponent={
        <View>
          <FastImage
            style={$imageContainer}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QcGo6YjXdssSGfHbOG5CgySjSWfQVWzWnd9Aq59XmA&s",
            }}
          />
        </View>
      }
      RightComponent={
        <View style={$contentContainer}>
          <View style={$topContentContainer}>
            <Text text="Jirazo" weight="semiBold" size="md" />
            <Text size="xxs" text={"12th Feb"} />
          </View>
          <Text
            text="Hi there! "
            numberOfLines={1}
            size="sm"
            style={{ color: colors.palette.neutral500 }}
          />
        </View>
      }
    />
  )
}

const $topContentContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

// const $lastSentMessage :TextStyle ={

// }

const $contentContainer: ViewStyle = {
  height: 66,
  flex: 1,
  marginLeft: spacing.medium,
  justifyContent: "center",
}

const $container: ViewStyle = {
  borderTopWidth: 0.5,
  borderBottomWidth: 0.5,
  borderColor: colors.separator,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
  alignItems: "center",
}

const $imageContainer: ImageStyle = {
  height: 66,
  width: 66,
  borderRadius: 33,
}
