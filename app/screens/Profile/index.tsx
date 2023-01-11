import React, { FC, useEffect, useState } from "react"
import { Dimensions, TextStyle, ViewStyle, View, Pressable, ScrollView, ImageStyle as ImageStyleRN } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, spacing } from "../../theme"
import { HomeTabProps } from "../../tabs"
import { observer } from "mobx-react-lite"
import { AutoImage, Icon, Screen, Text } from "../../components"
import { formatName } from "../../utils/formatName"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

const mockDescription =
  "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis."

const mockImageData = [
  { uri: "https://dummyimage.com/600x400/000/fff/&text=GM @Arben!" },
  { uri: "https://dummyimage.com/400x400/000/fff/&text=Below this gallery section" },
  { uri: "https://dummyimage.com/400x600/000/fff/&text=We will update this later! " },
  { uri: "https://dummyimage.com/600x200/000/fff/&text=would be more content Right?" },
]

const GalleryItem = ({ uri }) => {
  console.log(uri)
  return (
      <AutoImage source={{ uri }} maxWidth={Dimensions.get("screen").width / 2 - 30} style={$marginAutoImage} />
  )
}

const AnimatedGalleryView = () => {
  const [isOpen, setOpen] = useState(false)
  const open = useSharedValue(0)
  const [imageData, setImageData] = useState<{ left: Array<any>; right: Array<any> }>({
    left: [],
    right: [],
  })

  useEffect(() => {
    const left = []
    const right = []

    mockImageData.map((data, index) => {
      if (index % 2 === 0) {
        left.push(data)
      } else {
        right.push(data)
      }
      return true
    })

    setImageData({
      left,
      right,
    })
    console.log(left)
    console.log(right)
  }, [mockImageData])

  const animatedContainer = useAnimatedStyle(() => {
    const height = interpolate(open.value, [0, 1], [0, 400])
    return {
      height,
      backgroundColor: colors.palette.neutral100,
    }
  })

  const dropStyle = useAnimatedStyle(() => {
    const rotate = interpolate(open.value, [0, 1], [0, -180])
    return {
      transform: [{ rotate: `${rotate}deg` }],
    }
  })

  const handleExpand = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    open.value = withTiming(isOpen ? 0 : 1, { duration: 150 })
  }, [isOpen])

  return (
    <>
      <Pressable onPress={handleExpand} style={$galleryHeaderContainer}>
        <Text tx="profile.gallery" preset="formLabel" />
        <Animated.View style={dropStyle}>
          <Icon icon="arrowDown" color={colors.palette.neutral800} />
        </Animated.View>
      </Pressable>

      <Animated.View style={animatedContainer}>
        <ScrollView>
          <View style={$flexRow}>
            <View style={{ flex: 1 / 2 }}>
              {imageData.left.map((e, index) => (
                <GalleryItem uri={e?.uri} key={index} />
              ))}
            </View>
            <View style={{ flex: 1 / 2 }}>
              {imageData.right.map((e, index) => (
                <GalleryItem uri={e?.uri} key={index} />
              ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  )
}

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user } = route.params

  return (
    <Screen style={$screenConatiner}>
      <View style={$topContainer}>
        <FastImage style={$profileImage} source={{ uri: user?.picture }} />
        <Text text={formatName(user?.name)} style={$publisherName} weight="semiBold" />
        <Text text={user?.description || mockDescription} style={$descriptionText} />
      </View>
      <AnimatedGalleryView />
    </Screen>
  )
})

const $marginAutoImage : ImageStyleRN ={margin:10}

const $flexRow: ViewStyle = {
  flexDirection: "row",
  flex: 1,marginHorizontal:10
}

const $screenConatiner: ViewStyle = { flex: 1 }

const $galleryHeaderContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  height: 50,
  borderBottomColor: colors.separator,
  borderBottomWidth: 0.5,
  marginTop: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
  paddingHorizontal: spacing.medium,
}

const $topContainer: ViewStyle = {
  paddingVertical: spacing.large,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
}
const $descriptionText: TextStyle = {
  marginTop: spacing.extraLarge,
  width: Dimensions.get("screen").width - 100,
  fontSize: 14,
  lineHeight: 17,
  textAlign: "justify",
  alignSelf: "center",
}

const $publisherName: TextStyle = {
  fontSize: 16,
  lineHeight: 16,
  textAlign: "center",
  marginTop: spacing.small,
}

const $profileImage: ImageStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  alignSelf: "center",
  marginTop: spacing.extraLarge,
}
