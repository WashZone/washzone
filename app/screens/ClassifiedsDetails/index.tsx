import React, { FC, useEffect, useState } from "react"
import {
  View,
  Pressable,
  TextStyle,
  ViewStyle,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { Text, Screen, IconTypes, Icon } from "../../components"
import { ClassifiedsTabProps } from "../../tabs"
import { colors, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import FastImage, { ImageStyle } from "react-native-fast-image"
import Share from "react-native-share"
import { useNavigation } from "@react-navigation/native"
import { useHooks } from "../hooks"
import { Rating } from "react-native-ratings"
import { useStores } from "../../models"
import { Interaction } from "../../utils/enums"
import { RateUserModal } from "./RateUser"

interface ActionProps {
  icon: IconTypes
  title: string
  onPress: () => void
}

const PublisherDetails = ({ publisher }: { publisher: any }) => {
  const [rateUserModalVisible, setRateUserModalVisible] = useState(false)
  return (
    <>
      <View style={$publisherContainer}>
        <View style={$flexHori}>
          <FastImage style={$publisherPicture} source={{ uri: publisher?.picture }} />
          <View>
            <Text text={publisher?.name} />
            <TouchableOpacity onPress={() => setRateUserModalVisible(true)}>
              <Rating
                readonly
                startingValue={3}
                imageSize={22}
                tintColor={colors.backgroundGrey}
                style={{ backgroundColor: colors.backgroundGrey, marginTop: spacing.extraSmall }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Pressable style={$followButton}>
          <Text text="Follow" weight="semiBold" />
        </Pressable> */}
      </View>
      {/* <Pressable style={$reviewsButtonContainer}>
        <Text text="See All Reviews" weight="semiBold" />
      </Pressable> */}
      <RateUserModal isVisible={rateUserModalVisible} setModalVisible={setRateUserModalVisible} />
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
  const { interactWithSaveOnClassified } = useHooks()
  console.log(classified)
  const [isSaving, setSaving] = useState(false)

  const bottomOptions: Array<ActionProps> = [
    {
      icon: "save",
      title: "Save",
      onPress: async () => {
        if (!isSaving) {
          setSaving(true)
          await interactWithSaveOnClassified(classified?._id)
          setSaving(false)
        }
      },
    },
    {
      icon: "share",
      title: "Share",
      onPress: () =>
        Share.open({
          message: "",
          title: classified?.classifiedDetail,
          url: `washzone://shared-classified/${classified._id}`,
        })
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
            {isSaving && option.icon === "save" ? (
              <ActivityIndicator animating color={colors.palette.primary100} />
            ) : (
              <Icon icon={option.icon} />
            )}
          </Pressable>
          <Text text={option.title} />
        </View>
      ))}
    </View>
  )
}

export const ClassifiedsDetails: FC<ClassifiedsTabProps<"ClassifiedsDetails">> = observer(
  function ClassifiedsDetails(props) {
    console.log("classified", props.route.params)
    const classified = props.route.params.classified
    const navigation = useNavigation()
    const [classifiedDetails, setClassifiedDetails] = useState<any>(classified)
    const [loading, setLoading] = useState<boolean>(typeof classified === "string")
    const {
      api: { mutateGetClassifiedById },
      interaction: { getInteractionOnClassified },
    } = useStores()

    const handleStringTypeClassified = async () => {
      console.log("RUNNING")
      if (typeof classified === "string") {
        const res = await mutateGetClassifiedById({ classifiedId: classified })
        console.log("RES CLASSFIED", res)
        setClassifiedDetails(res.getClassifiedById?.length === 1 && res.getClassifiedById[0])
        setLoading(false)
      } else {
        setClassifiedDetails(classified)
      }
    }

    useEffect(() => {
      handleStringTypeClassified()
    }, [classified])

    if (loading) {
      return (
        <Screen contentContainerStyle={$flex1}>
          <ActivityIndicator animating />
        </Screen>
      )
    }

    return (
      <Screen contentContainerStyle={$flex1}>
        <ScrollView style={$flex1}>
          <FastImage
            source={{ uri: classifiedDetails?.attachmentUrl }}
            style={$posterImage}
            resizeMode="contain"
          />
          <PublisherDetails publisher={classifiedDetails?.UserId || classifiedDetails?.userId} />
          <MoreDetails classified={classifiedDetails} />
        </ScrollView>
        <Pressable style={$backContainer} onPress={() => navigation.goBack()}>
          <Icon
            icon="back"
            color={
              getInteractionOnClassified(classifiedDetails?._id) === Interaction.saved
                ? colors.palette.primary100
                : colors.transparent
            }
          />
        </Pressable>
        <BottomActions classified={classifiedDetails} />
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

// const $reviewsButtonContainer: ViewStyle = {
//   height: 40,
//   justifyContent: "center",
//   alignItems: "center",
//   marginHorizontal: spacing.medium,
//   backgroundColor: colors.palette.grey,
//   borderRadius: 10,
// }

// const $followButton: ViewStyle = {
//   height: 50,
//   width: 100,
//   backgroundColor: colors.palette.grey,
//   borderRadius: 10,
//   justifyContent: "center",
//   alignItems: "center",
// }

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
