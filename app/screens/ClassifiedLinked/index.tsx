import React, { FC, useEffect, useState } from "react"
import {
  View,
  Pressable,
  TextStyle,
  ViewStyle,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Text, Screen, IconTypes, Icon } from "../../components"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import FastImage, { ImageStyle } from "react-native-fast-image"
import Share from "react-native-share"
import { useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { AppStackScreenProps } from "../../navigators"

interface ActionProps {
  icon: IconTypes
  title: string
  onPress: () => void
}

const PublisherDetails = ({ publisher }: { publisher: any }) => {
  return (
    <>
      <View style={$publisherContainer}>
        <View style={$flexHori}>
          <FastImage style={$publisherPicture} source={{ uri: publisher?.picture }} />
          <View>
            <Text text={publisher?.name} />
          </View>
        </View>
        <Pressable style={$followButton}>
          <Text text="Follow" weight="semiBold" />
        </Pressable>
      </View>
      <Pressable style={$reviewsButtonContainer}>
        <Text text="See All Reviews" weight="semiBold" />
      </Pressable>
    </>
  )
}

const MoreDetails = ({ classified }: { classified: any }) => {
  return (
    <View style={$moreDetialsContainer}>
      <Text text="Details" weight="semiBold" preset="h2" />
      <View style={$containerCondition}>
        <View style={$conditionContainer}>
          <Text text="Condition" weight="medium" />
          <Text text="New" weight="light" />
        </View>
        <Icon icon="caretRight" size={22} />
      </View>
      <Text text={classified?.classifiedDetail} style={$descriptionText} />
    </View>
  )
}

const BottomActions = ({ classified }: { classified: any }) => {
  const { saveClassified } = useHooks()
  console.log(classified)

  const bottomOptions: Array<ActionProps> = [
    {
      icon: "alert",
      title: "Alert",
      onPress: () => console.log("ALERT"),
    },
    {
      icon: "save",
      title: "Save",
      onPress: () => saveClassified(classified?._id),
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

  return (
    <View style={$bottomActionsContainer}>
      {bottomOptions.map((option) => (
        <View style={$singleActionContainer} key={option.title}>
          <Pressable style={$actionIconContainer} onPress={option.onPress}>
            <Icon icon={option.icon} />
          </Pressable>
          <Text text={option.title} />
        </View>
      ))}
    </View>
  )
}

export const ClassifiedLinked: FC<AppStackScreenProps<"ClassifiedLinked">> = observer(
  function ClassifiedLinked(props) {
    const navigation = props.navigation
    const classifiedId = props.route.params.classifiedId
    const { getClassified } = useHooks()
    const [classified, setClassified] = useState<any>(undefined)
    const setup = async () => {
      const res = await getClassified(classifiedId)
      setClassified(res)
    }

    useEffect(() => {
      setup()
    }, [])

    if (!classified) {
      return (
        <View style={$loadingContainer}>
          <ActivityIndicator animating color={colors.palette.primary100}/>
        </View>
      )
    }

    return (
      <Screen contentContainerStyle={$flex1} safeAreaEdges={["top", "bottom"]}>
        <ScrollView style={$flex1}>
          <FastImage
            source={{ uri: classified?.attachmentUrl }}
            style={$posterImage}
            resizeMode="contain"
          />
          <PublisherDetails publisher={classified?.UserId} />
          <MoreDetails classified={classified} />
        </ScrollView>
        <Pressable style={$backContainer} onPress={() => navigation.goBack()}>
          <Icon icon="back" />
        </Pressable>
        <BottomActions classified={classified} />
      </Screen>
    )
  },
)

const $loadingContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $flex1 = { flex: 1 }

const $backContainer: ViewStyle = {
  backgroundColor: colors.palette.overlayNeutral50,
  height: 30,
  width: 30,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: spacing.medium,
  left: spacing.medium,
}

const $descriptionText: TextStyle = {
  marginVertical: spacing.medium,
  textAlign: "justify",
}

const $containerCondition: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
  paddingBottom: spacing.medium,
  borderBottomWidth: 0.5,
  borderColor: colors.palette.overlay20,
  alignItems: "center",
}

const $conditionContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
}

const $posterImage: ImageStyle = {
  width: Dimensions.get("screen").width,
  height: (Dimensions.get("screen").width * 9) / 16,
}

const $actionIconContainer: TextStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
}

const $singleActionContainer: ViewStyle = {
  alignItems: "center",
  height: 80,
  justifyContent: "space-between",
  paddingBottom: 10,
}

const $publisherPicture: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  marginRight: spacing.medium,
}

const $reviewsButtonContainer: ViewStyle = {
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: spacing.medium,
  backgroundColor: colors.palette.grey,
  borderRadius: 10,
}

const $followButton: ViewStyle = {
  height: 50,
  width: 100,
  backgroundColor: colors.palette.grey,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const $flexHori: ViewStyle = { flexDirection: "row" }

const $publisherContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  marginVertical: spacing.medium,
  justifyContent: "space-between",
}

const $moreDetialsContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  marginTop: spacing.massive,
}

const $bottomActionsContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  flexDirection: "row",
  justifyContent: "space-around",
  borderTopWidth: 0.5,
  borderColor: colors.palette.overlay20,
  paddingTop: 10,
}
