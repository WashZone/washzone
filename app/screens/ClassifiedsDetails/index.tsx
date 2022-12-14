import React, { FC } from "react"
import { View, Pressable, TextStyle, ViewStyle, Dimensions, ScrollView } from "react-native"
import { Text, Screen, IconTypes, Icon } from "../../components"
import { ClassifiedsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import FastImage, { ImageStyle } from "react-native-fast-image"
import Share from "react-native-share"
import { useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"

// const mock = {
//   poster:
//     "https://img.freepik.com/free-psd/white-sport-car_176382-1598.jpg?w=1800&t=st=1670396984~exp=1670397584~hmac=58b3c062df733a373f5e3a78f4d6bcf6538765de4595e3e17cea5c2ec51ab8e3",
//   publisher: {
//     picture:
//       "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
//     name: "Jay Cue",
//   },
//   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// }

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
        Share.open({ message: '', title: classified?.classifiedDetail, url: `washzone://classified/${classified._id}` })
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

export const ClassifiedsDetails: FC<ClassifiedsTabProps<"ClassifiedsDetails">> = observer(
  function ClassifiedsDetails(props) {
    const classified = props.route.params.classified
    const navigation = useNavigation()

    return (
      <Screen contentContainerStyle={$flex1}>
        <ScrollView style={$flex1}>
          <FastImage source={{ uri: classified?.attachmentUrl }} style={$posterImage} resizeMode='contain'  />
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
