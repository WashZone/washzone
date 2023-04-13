import React, { FC, useEffect, useState } from "react"
import {
  View,
  Pressable,
  FlatList,
  TextStyle,
  ViewStyle,
  RefreshControl,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import { Text, Screen, Icon, CustomFlatlist } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ClassifiedsTabParamList, ClassifiedsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { $flex1 } from "../styles"
import { AppStackParamList } from "../../navigators"
import { BROKEN_IMAGE, defaultImages } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import Lottie from "lottie-react-native"
import Animated from "react-native-reanimated"

const refreshingHeight = 80
export const ClassifiedComponent = ({
  classified,
  disabled,
}: {
  classified: any
  disabled?: boolean
}) => {
  const navigation = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const [loaded, setLoaded] = useState(false)

  return (
    <Pressable
      style={$postContainer}
      onPress={() => !disabled && navigation.navigate("ClassifiedsDetails", { classified })}
    >
      <ShimmerPlaceholder
        visible={loaded}
        shimmerStyle={$attachment}
        LinearGradient={LinearGradient}
      >
        <FastImage
          defaultSource={BROKEN_IMAGE}
          source={{
            uri: classified?.attachmentUrl,
          }}
          style={$attachment}
          onLoadEnd={() => setLoaded(true)}
        />
      </ShimmerPlaceholder>
      <Text
        style={$postContent}
        text={"$" + classified.prize + "  •  " + classified.title}
        numberOfLines={1}
        weight="semiBold"
      />
    </Pressable>
  )
}

export const ClassifiedsFeed: FC<ClassifiedsTabProps<"ClassifiedsFeed">> = observer(
  function TopicsFeed(_props) {
    const { refreshClassifieds, loadMoreClassified } = useHooks()
    const {
      classfieds: { classifieds },
    } = useStores()
    const navigationApp = useNavigation<NavigationProp<AppStackParamList>>()
    const onRefresh = async () => {
      await refreshClassifieds()
    }

    useEffect(() => {
      loadMoreClassified()
    }, [])

    return (
      <Screen contentContainerStyle={$flex1} backgroundColor={colors.palette.neutral100}>
        <CustomFlatlist
          customRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={$flatlistContentContainer}
          ListHeaderComponent={<View style={$headerSpace} />}
          data={classifieds}
          renderItem={({ item }) => <ClassifiedComponent key={item?._id} classified={item} />}
          numColumns={2}
          ListFooterComponent={<View style={$footerSpace} />}
        />
        <Pressable
          style={$createContainer}
          onPress={() => navigationApp.navigate("AddAClassified")}
        >
          <Icon icon="upload" size={20} />
          <Text text="Create" style={$createText} weight="bold" />
        </Pressable>
      </Screen>
    )
  },
)

const $headerSpace: ViewStyle = {
  height: spacing.large,
}

const $createText: TextStyle = {
  fontSize: 13,
  color: colors.palette.neutral100,
  lineHeight: 20,
}

const $createContainer: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.primary300,
  height: 36,
  width: 100,
  right: spacing.medium,
  top: spacing.medium,
  borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.medium / 2,
  justifyContent: "space-around",
}

const $footerSpace: ViewStyle = { marginVertical: 5 }

const componentWidth = Dimensions.get("screen").width / 2 - 3

const $flatlistContentContainer: ViewStyle = {
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
}

const $attachment: ImageStyle = {
  height: componentWidth,
  width: componentWidth,
}

const $postContent: TextStyle = {
  fontSize: 13,
  lineHeight: 20,
  marginHorizontal: spacing.small,
  marginVertical: spacing.extraSmall,
}

const $postContainer: ViewStyle = {
  width: Dimensions.get("screen").width / 2 - 5,
  alignItems: "center",
}
