import React, { FC, useCallback, useEffect, useState } from "react"
import {
  View,
  Pressable,
  TextStyle,
  ViewStyle,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"

import { observer } from "mobx-react-lite"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native"
import { ActivityIndicator } from "react-native-paper"
import { Rating } from "react-native-ratings"
import Toast from "react-native-toast-message"
import ImageView from "react-native-image-viewing"

import { useHooks } from "../hooks"
import { useStores } from "../../models"
import { RateUserModal } from "./RateUser"
import { SendOfferModal } from "./SendOfferModal"
import Loading from "../../components/Loading"
import { Text, IconTypes, Icon, $verticalAbsoluteTop, Menu, ShimmingImage } from "../../components"
import { ClassifiedsTabProps, HomeTabParamList } from "../../tabs"
import { colors, spacing } from "../../theme"
import { formatName } from "../../utils/formatName"
import * as Haptics from "expo-haptics"
import { showAlertYesNo } from "../../utils/helpers"
import { messageMetadataType } from "../../utils"
import { AppStackParamList } from "../../navigators"

interface ActionProps {
  icon: IconTypes
  title: string
  onPress: () => void
  tintColor?: string
}

const PublisherDetails = ({ publisher, price }: { publisher: any; price: string }) => {
  const [rateUserModalVisible, setRateUserModalVisible] = useState(false)
  const [avgRating, setAvgRating] = useState(publisher?.averageRating)
  const { rateUser } = useHooks()

  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()

  const onRateUser = async (rating: number) => {
    const res = await rateUser(publisher?._id, rating)
    if (res) {
      setRateUserModalVisible(false)
      Toast.show({ type: "success", text1: `Rated ${rating} starred.` })
      setAvgRating(res.avg)
    }
  }

  return (
    <>
      <View style={$publisherContainer}>
        <View style={[$flexHori, $flex1]}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: publisher })}>
            <FastImage style={$publisherPicture} source={{ uri: publisher?.picture }} />
          </TouchableOpacity>
          <View style={$publisherChildContainer}>
            <Text text={formatName(publisher?.name)} />
            <TouchableOpacity onPress={() => setRateUserModalVisible(true)}>
              <Rating
                type="custom"
                imageSize={20}
                tintColor={colors.palette.neutral100}
                ratingColor={colors.palette.primary100}
                ratingTextColor={colors.palette.primary100}
                ratingBackgroundColor={colors.palette.neutral400}
                style={{ backgroundColor: colors.palette.primary100 }}
                startingValue={avgRating}
                readonly
              />
            </TouchableOpacity>
          </View>

          <Text
            text={"$ " + price}
            weight="medium"
            size="md"
            style={{ marginTop: spacing.extraSmall }}
          />
        </View>
      </View>

      <RateUserModal
        userId={publisher?._id}
        isVisible={rateUserModalVisible}
        setModalVisible={setRateUserModalVisible}
        onRateUser={onRateUser}
      />
    </>
  )
}

const MoreDetails = ({
  classified,
  flagClassfied,
}: {
  classified: any
  flagClassfied: () => void
}) => {
  return (
    <View style={$moreDetialsContainer}>
      <View style={$flexRowBetween}>
        <Text text="Details" weight="semiBold" preset="h2" />
        <Icon icon="flag" onPress={flagClassfied} size={20} />
      </View>
      <View style={$containerCondition}>
        <View style={$conditionContainer}>
          <Text text="Condition" weight="medium" />
          <Text text={classified?.condition} weight="light" />
        </View>
        <Icon icon="caretRight" size={22} />
      </View>
      <Text text={classified?.classifiedDetail} style={$descriptionText} />
    </View>
  )
}

const BottomActions = ({ classified }: { classified: any }) => {
  const { interactWithSaveOnClassified } = useHooks()
  const {
    interaction: { isClassifiedSaved },
    share: { share },
  } = useStores()
  const [isSaving, setSaving] = useState(false)
  const [sendOfferModal, setSendOfferModal] = useState(false)
  const {
    userStore: { _id },
  } = useStores()

  const bottomOptions: Array<ActionProps> = [
    {
      icon: "save",
      title: isClassifiedSaved(classified?._id) ? "Saved" : "Save",
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
        share({
          message: classified?.classifiedDetail,
          type: messageMetadataType.sharedClassified,
          title: classified?.title,
          url: `washzone://shared-classified/${classified._id}`,
          attachment: classified?.attachmentUrl,
        }),
    },
    {
      icon: "offer",
      title: "Send Offer",
      onPress: () => {
        if (_id === classified?.userId?._id) {
          Alert.alert("You cannot make an offer to yourself.")
        } else {
          setSendOfferModal(true)
        }
      },
    },
  ]

  return (
    <>
      <View style={$bottomActionsContainer}>
        {bottomOptions.map((option) => (
          <View style={$singleActionContainer} key={option.title}>
            <TouchableOpacity style={$actionIconContainer} onPress={option.onPress}>
              {isSaving && option.icon === "save" ? (
                <ActivityIndicator animating color={colors.palette.primary100} />
              ) : (
                <Icon icon={option.icon} color={option.tintColor} />
              )}
            </TouchableOpacity>
            <Text text={option.title} />
          </View>
        ))}
      </View>
      <SendOfferModal
        classified={classified}
        isVisible={sendOfferModal}
        setVisible={setSendOfferModal}
        receiver={classified?.UserId || classified?.userId}
      />
    </>
  )
}

export const ClassifiedsDetails: FC<ClassifiedsTabProps<"ClassifiedsDetails">> = observer(
  function ClassifiedsDetails(props) {
    /* Assign create to Mode when not provided */
    const { classified } = props.route.params
    const navigation = useNavigation()
    const [classifiedDetails, setClassifiedDetails] = useState<any>(classified)
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(typeof classified === "string")
    const [isImageViewVisible, setImageViewVisible] = useState<boolean>(false)
    const {
      api: { mutateFlagsOnFeed, mutateGetClassifiedById, mutateDeleteDetailClassifiedId },
      userStore: { _id },
      classfieds: { removeFromClassfieds },
    } = useStores()
    const publisher = classifiedDetails?.UserId || classifiedDetails?.userId
    const isAuthorUser = publisher?._id === _id
    const navigationApp = useNavigation<NavigationProp<AppStackParamList>>()

    const syncClassfied = async (id: string) => {
      setLoading(true)
      const res = await mutateGetClassifiedById({ classifiedId: id })
      console.log("Classified : ", res)
      setClassifiedDetails(res.getClassifiedById?.length === 1 && res.getClassifiedById[0])
      setLoading(false)
    }

    const handleStringTypeClassified = async () => {
      if (typeof classified === "string") {
        await syncClassfied(classified)
      } else {
        setLoading(true)
        setClassifiedDetails(classified)
        setLoading(false)
      }
    }

    useFocusEffect(
      useCallback(() => {
        classifiedDetails?._id && syncClassfied(classifiedDetails?._id)
      }, [classifiedDetails?._id]),
    )

    useEffect(() => {
      handleStringTypeClassified()
    }, [classified])

    const flagClassfied = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      showAlertYesNo({
        message: "Flag " + publisher?.first_name + "'s classified ?",
        description:
          "Our team will review the flagged content promptly and take appropriate action based on our community guidelines and policies.",
        onYesPress: async () => {
          try {
            await mutateFlagsOnFeed({
              flagsById: _id,
              type: "classified",
              classifiedId: classifiedDetails?._id,
            })
            Alert.alert("Success!", "We will review the flagged content within 24 hours.")
          } catch (err) {
            Alert.alert(err?.response?.errors?.[0]?.message)
          }
        },
      })
    }

    const onEdit = () => {
      setOptionsVisible(false)
      navigationApp.navigate("AddAClassified", { classifiedToEdit: classifiedDetails })
    }

    const onDelete = () => {
      setOptionsVisible(false)
      showAlertYesNo({
        message: "Are you sure you want to delete this classified?",
        description: "This action cannot be undone.",
        onYesPress: async () => {
          const classifiedId = classifiedDetails?._id
          const res = await mutateDeleteDetailClassifiedId({ classifiedId }, () => {
            refreshParent && refreshParent()
            removeFromClassfieds(classifiedId)
            navigation.goBack()
          })
          console.log("Classfiied Delete", res)
        },
      })
    }

    if (loading) {
      return <Loading />
    }

    return (
      <View style={[$flex1, { backgroundColor: colors.palette.neutral100 }]}>
        <ScrollView style={$flex1}>
          <TouchableOpacity onPress={() => setImageViewVisible(true)}>
            <ShimmingImage
              shimmerProps={{ shimmerStyle: $posterImage }}
              source={{ uri: classifiedDetails?.attachmentUrl }}
              style={$posterImage}
            />
          </TouchableOpacity>
          <PublisherDetails
            price={classifiedDetails?.prize}
            publisher={classifiedDetails?.UserId || classifiedDetails?.userId}
          />
          <MoreDetails classified={classifiedDetails} flagClassfied={flagClassfied} />
          {isAuthorUser && (
            <Menu
              visible={optionsVisible}
              setVisible={setOptionsVisible}
              data={[
                { title: "Edit", onPress: onEdit, icon: "note-edit" },
                { title: "Delete", onPress: onDelete, icon: "delete" },
              ]}
              containerStyle={$verticalAbsoluteTop}
            />
          )}
        </ScrollView>
        <Pressable style={$backContainer} onPress={() => navigation.goBack()}>
          <Icon icon="back" color={colors.palette.primary100} />
        </Pressable>
        <BottomActions classified={classifiedDetails} />
        <ImageView
          images={[{ uri: classifiedDetails?.attachmentUrl }]}
          imageIndex={0}
          visible={isImageViewVisible}
          swipeToCloseEnabled
          animationType="fade"
          onRequestClose={() => setImageViewVisible(false)}
        />
      </View>
    )
  },
)

const $flexRowBetween: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
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
  textAlign: "justify",
  marginVertical: spacing.medium,
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

const $publisherChildContainer: ViewStyle = {
  justifyContent: "space-around",
  marginVertical: spacing.tiny,
  alignItems: "flex-start",
  flex: 1,
}

const $flexHori: ViewStyle = { flexDirection: "row" }

const $publisherContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  marginVertical: spacing.large,
  justifyContent: "space-between",
}

const $moreDetialsContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $bottomActionsContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  flexDirection: "row",
  justifyContent: "space-around",
  borderTopWidth: 0.5,
  borderColor: colors.palette.overlay20,
  paddingTop: 10,
}
