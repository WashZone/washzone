import React, { FC, useEffect, useState } from "react"
import { Dimensions, Pressable, RefreshControl, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { FlatList } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"

import { useHooks } from "../hooks"
import { colors, spacing } from "../../theme"
import { EmptyState, Header, Icon, IconTypes, ListItem, Screen, Text } from "../../components"
import { useStores } from "../../models"
import { ClassifiedsTabParamList, VideosTabParamList } from "../../tabs"
import { messageMetadataType } from "../../utils"

interface ActionProps {
  icon: IconTypes
  title: string
  onPress: () => void
}

const BottomActions = ({
  data,
  type,
  refreshSavedClassifieds,
}: {
  data: any
  type: "video" | "classified"
  refreshSavedClassifieds: () => void
}) => {
  console.log("DATADATA SAVED", JSON.stringify(data))
  const { interactWithSaveOnClassified, interactWithSaveOnVideo } = useHooks()
  const {
    share: { share },
  } = useStores()
  const bottomOptions: Array<ActionProps> = [
    {
      icon: "save",
      title: "Save",
      onPress: async () => {
        if (type === "classified") {
          await interactWithSaveOnClassified(data?._id)
        } else {
          await interactWithSaveOnVideo(data?.videoId)
        }
        refreshSavedClassifieds()
      },
    },
    {
      icon: "share",
      title: "Share",
      onPress: () =>
        share({
          message: "",
          title: data?.title||'',
          url: `washzone://shared-${type}/${data?._id}`,
          type:
            type === "classified"
              ? messageMetadataType.sharedClassified
              : messageMetadataType.sharedVideo,
        }),
    },
  ]

  const options = type === "video" ? bottomOptions.slice(0, 2) : bottomOptions

  return (
    <View style={$bottomActionsContainer}>
      {options.map((option) => (
        <Pressable style={$singleActionContainer} onPress={option.onPress} key={option.title}>
          <Icon icon={option.icon} size={40} />
        </Pressable>
      ))}
    </View>
  )
}

const SavedItem = ({ item, index, handleOnPress, refreshSavedClassifieds }) => {
  const videoDetails = item?.VideoDetail[0]
  const classifiedDetails = item?.ClassifiedFeedId[0]

  if (item?.savedType === "video") {
    return (
      <ListItem
        onPress={() => handleOnPress(videoDetails._id, item?.savedType)}
        key={index}
        style={$listItemStyle}
        LeftComponent={
          <FastImage
            style={$image}
            source={{
              uri: videoDetails?.thumbnailUrl,
            }}
          />
        }
        rightIcon="caretRight"
      >
        <View style={$textContainer}>
          <Text
            text={videoDetails?.videoHeading}
            weight="semiBold"
            numberOfLines={1}
            style={{ width: Dimensions.get("window").width - 200 }}
          />
          <Text
            text={videoDetails?.description}
            weight="medium"
            size="xs"
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <Text text={videoDetails?.users?.name} style={$byText} />
          <BottomActions
            data={item}
            type="video"
            refreshSavedClassifieds={refreshSavedClassifieds}
          />
        </View>
      </ListItem>
    )
  }

  return (
    <ListItem
      onPress={() => handleOnPress(classifiedDetails._id, item?.savedType)}
      key={index}
      style={$listItemStyle}
      LeftComponent={
        <FastImage
          style={$image}
          source={{
            uri: classifiedDetails?.attachmentUrl,
          }}
        />
      }
      rightIcon="caretRight"
    >
      <View style={$textContainer}>
        <Text
          text={classifiedDetails?.title}
          weight="semiBold"
          numberOfLines={1}
          style={{ width: Dimensions.get("window").width - 200 }}
        />
        <Text
          text={"$ " + classifiedDetails?.prize}
          weight="medium"
          style={{ width: Dimensions.get("window").width - 200 }}
        />
        <Text text={classifiedDetails?.users?.name} style={$byText} />
        <BottomActions
          data={classifiedDetails}
          type="classified"
          refreshSavedClassifieds={refreshSavedClassifieds}
        />
      </View>
    </ListItem>
  )
}

export const Saved: FC<AppStackScreenProps<"Saved">> = observer(function Saved() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const navigationVideos = useNavigation<NavigationProp<VideosTabParamList>>()
  const navigationClassified = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const { refreshSavedClassifieds } = useHooks()
  const {
    saved: { savedClassifieds },
  } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refreshSavedClassifieds()
  }, [])

  const handleOnPress = (id, type) => {
    navigation.goBack()
    if (type === "video") {
      navigationVideos.navigate("VideoDetails", { data: id })
    } else {
      navigationClassified.navigate("ClassifiedsDetails", { classified: id })
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refreshSavedClassifieds()
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Saved"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      {savedClassifieds?.length === 0 ? (
        <EmptyState preset="saved" buttonOnPress={() => navigation.goBack()} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.palette.primary100}
            />
          }
          data={savedClassifieds}
          renderItem={({ item, index }) => (
            <SavedItem
              item={item}
              index={index}
              handleOnPress={handleOnPress}
              refreshSavedClassifieds={refreshSavedClassifieds}
            />
          )}
        />
      )}
    </Screen>
  )
})

const $singleActionContainer: ViewStyle = {
  marginRight: spacing.small,
}

const $bottomActionsContainer: ViewStyle = {
  flexDirection: "row",
  paddingTop: 12,
}

const $image: ImageStyle = {
  height: 120,
  width: 120,
  borderRadius: 5,
}

const $listItemStyle: ViewStyle = {
  alignItems: "center",
  height: 120 + spacing.medium * 2,
  paddingVertical: spacing.medium,
  marginHorizontal: spacing.medium,
  borderBottomColor: colors.separator,
  borderBottomWidth: 0.5,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $byText: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 14,
}

const $container: ViewStyle = {
  flex: 1,
}

const $textContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  height: 120,
  alignSelf: "center",
  flex: 1,
}
