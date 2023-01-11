import React, { FC, useEffect, useState } from "react"
import { Pressable, RefreshControl, TextStyle, View, ViewStyle } from "react-native"
import { Header, Icon, IconTypes, ListItem, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { useHooks } from "../hooks"
import Share from "react-native-share"
import { FlatList } from "react-native-gesture-handler"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"

interface ActionProps {
  icon: IconTypes
  title: string
  onPress: () => void
}

const BottomActions = ({ classified, type }: { classified: any; type: "video" | "classified" }) => {
  const { unSaveClassified } = useHooks()
  console.log(classified)

  const bottomOptions: Array<ActionProps> = [
    {
      icon: "save",
      title: "Save",
      onPress: () => unSaveClassified(classified?._id),
    },
    {
      icon: "share",
      title: "Share",
      onPress: () =>
        Share.open({ message: "", title: "", url: "" })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            err && console.log(err)
          }),
    },
    {
      icon: "offer",
      title: "Send Offer",
      onPress: () => console.log("ALERT"),
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

const SavedItem = ({ item, index }) => {
  const videoDetails = item?.VideoDetail[0]
  if (item?.savedType === "video") {
    return (
      <ListItem
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
          <Text text={videoDetails?.videoHeading} weight="semiBold" numberOfLines={1} />
          <Text text={videoDetails?.description} weight='medium' size='xs'  numberOfLines={1}/>
          <Text text={videoDetails?.users?.name} style={$byText} />
          <BottomActions classified={item} type="video" />
        </View>
      </ListItem>
    )
  }

  return (
    <ListItem
      key={index}
      style={$listItemStyle}
      LeftComponent={
        <FastImage
          style={$image}
          source={{
            uri: item?.ClassifiedFeedId?.attachmentUrl,
          }}
        />
      }
      rightIcon="caretRight"
    >
      <View style={$textContainer}>
        <Text text={item?.ClassifiedFeedId?.title} weight="semiBold" numberOfLines={1} />
        <Text text={"$ " + item?.ClassifiedFeedId?.prize} weight="medium" />
        <Text text={item?.ClassifiedFeedId?.users?.name} style={$byText} />
        <BottomActions classified={item} type="classified" />
      </View>
    </ListItem>
  )
}

export const Saved: FC<AppStackScreenProps<"Saved">> = observer(function Saved() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { refreshSavedClassifieds } = useHooks()
  const {
    saved: { savedClassifieds },
  } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refreshSavedClassifieds()
  }, [])

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
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={savedClassifieds}
        renderItem={SavedItem}
      />
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
}
