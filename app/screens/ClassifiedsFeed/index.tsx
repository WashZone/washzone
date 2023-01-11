import React, { FC, useEffect, useState } from "react"
import {
  View,
  Pressable,
  FlatList,
  TextStyle,
  ViewStyle,
  RefreshControl,
  Dimensions,
} from "react-native"
import { Text, Screen } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ClassifiedsTabParamList, ClassifiedsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { $flex1 } from "../styles"

export const ClassifiedComponent = ({ classified }) => {
  const navigation = useNavigation<NavigationProp<ClassifiedsTabParamList>>()

  return (
    <Pressable
      style={$postContainer}
      onPress={() => navigation.navigate("ClassifiedsDetails", { classified })}
    >
      <FastImage
        source={{
          uri: classified?.attachmentUrl || "https://edigitalcare.in/public/uploads/user-dummy.png",
        }}
        style={$attachment}
      />

      <Text
        style={$postContent}
        text={"$" + classified.prize + "  •  " + classified.title}
        numberOfLines={1}
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
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
      refreshClassifieds()
      setRefreshing(false)
    }

    useEffect(() => {
      loadMoreClassified()
    }, [])

    return (
      <Screen contentContainerStyle={$flex1}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={classifieds}
        renderItem={({ item }) => <ClassifiedComponent classified={item} />}
        numColumns={2}
        style={$listStyle}
        ListFooterComponent={<View style={$footerSpace} />}
      />
      </Screen>
    )
  },
)

const $footerSpace: ViewStyle = { marginVertical: 5 }

const postContainerRadius = 10

const $listStyle: ViewStyle = {
  marginHorizontal: 5,
}

const $attachment: ImageStyle = {
  height: 120,
  width: 120,
}

const $postContent: TextStyle = {
  fontSize: 13,
  lineHeight: 20,
  marginHorizontal: spacing.small,
}

const $postContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  marginTop: 10,
  width: Dimensions.get("screen").width / 2 - 15,
  borderRadius: postContainerRadius,
  paddingVertical: spacing.medium,
  alignItems: "center",
  marginHorizontal: 5,
  shadowRadius: 10,
  shadowOffset: { height: 4, width: 0 },
  shadowColor: colors.palette.neutral700,
  shadowOpacity: 0.3,
}
