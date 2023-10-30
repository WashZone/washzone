import React, { FC, useCallback, useEffect, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Animated,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native"
// import { Menu, MenuItem, MenuDivider } from "react-native-material-menu"

import FastImage, { ImageStyle } from "react-native-fast-image"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { NavigationState, SceneRendererProps, TabBar } from "react-native-tab-view"
import { observer } from "mobx-react-lite"
import { ActivityIndicator } from "react-native-paper"
import { NavigationProp, StackActions, useIsFocused, useNavigation } from "@react-navigation/native"
import ImageView from "react-native-image-viewing"

import { colors, spacing } from "../../theme"
import { HomeTabParamList, HomeTabProps } from "../../tabs"
import { Header, Screen, Text, Icon, Menu } from "../../components"
import { formatName } from "../../utils/formatName"
import {
  ClassifiedsTabScreen,
  GalleryTabView,
  HomePostsTabScreen,
  TopicsTabScreen,
} from "./tabViews"
import { $contentCenter, $flex1, $flexRow } from "../styles"
import { useHooks } from "../hooks"
import { AppStackParamList } from "../../navigators"
import { useStores } from "../../models"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { showAlertYesNo } from "../../utils/helpers"
import Loading from "../../components/Loading"
import { BROKEN_BANNER, defaultImages } from "../../utils"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"

const getIndexFromKey = (key: string) => {
  switch (key) {
    case "posts":
      return 0
    case "topic":
      return 1
    case "classified":
      return 2
    case "gallery":
      return 3
    default: {
      return 0
    }
  }
}

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<any>
  },
  setIndex: (n: number) => void,
  index: number,
) => {
  console.log("PROPS.POSITION", props.position)
  const inputRange = props.navigationState.routes.map((x, i) => i)

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: colors.palette.primary100, width: "100%" }}
    >
      <TabBar
        style={$tab}
        labelStyle={$label}
        activeColor={colors.palette.primary300}
        indicatorStyle={$indicator}
        // scrollEnabled
        renderTabBarItem={({ key, defaultTabWidth }) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === getIndexFromKey(key) ? 1 : 0.5,
            ),
          })
          return (
            <TouchableOpacity
              onPress={() => {
                switch (key) {
                  case "posts": {
                    setIndex(0)
                    break
                  }
                  case "topic": {
                    setIndex(1)
                    break
                  }
                  case "classified": {
                    setIndex(2)
                    break
                  }
                  case "gallery": {
                    setIndex(3)
                    break
                  }
                }
              }}
            >
              <Animated.View
                style={[
                  $tabBarItem,
                  {
                    width: defaultTabWidth,
                    backgroundColor:
                      getIndexFromKey(key) === index
                        ? colors.palette.primary300
                        : colors.palette.primary100,
                  },
                ]}
              >
                {/* <Animated.Text style={{ opacity }}>{route.title}</Animated.Text> */}
                <Animated.Text
                  style={{
                    color: colors.palette.neutral250,
                    fontSize: spacing.medium,
                    opacity,
                  }}
                  // weight={getIndexFromKey(key) === index ? "semiBold" : "medium"}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Animated.Text>
                {/* <Animated.View style={{left}}/> */}
              </Animated.View>
            </TouchableOpacity>
          )
        }}
        {...props}
      />
      {/* <Animated.View style={{  position:'absolute',width: left}} /> */}
    </View>
  )
}

const Options = ({ user, reportUser }) => {
  const {
    userStore: { _id, isBlocked },
  } = useStores()
  const { blockUser: blockUserHook, unblockUser: unblockUserHook } = useHooks()

  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const blockUser = () => {
    showAlertYesNo({
      message: `Block ${user?.first_name} ?`,
      description: `Once you block someone, they won't be able to send you message or make offers on your Classifieds.`,
      onYesPress: async () => {
        try {
          await blockUserHook(user?._id)
          Alert.alert(
            "Success",
            `${user?.first_name} is now blocked and won't be able to now interact.`,
          )
        } catch (err) {
          Toast.show({ text1: JSON.stringify(err?.response?.errors?.[0]?.message) })
        }
      },
    })
  }

  const unblockUser = () => {
    showAlertYesNo({
      message: `Unblock ${user?.first_name} ?`,
      description: `${user?.first_name} has been blocked by you. If you unblock them, they will now be able to send you messages or make offers on your Classifieds.`,
      onYesPress: async () => {
        try {
          await unblockUserHook(user?._id)
          Alert.alert("Success", "You can now connect back with " + user?.first_name)
        } catch (err) {
          Toast.show({ text1: JSON.stringify(err?.response?.errors?.[0]?.message) })
        }
      },
    })
  }

  const onReport = () => {
    hideMenu()
    Alert.prompt(
      "Report " + formatName(user?.name) + "?",
      "Please input a reason for us to review the target user. The review will happen within 24 hours of reporting the user.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: reportUser,
        },
      ],
      "plain-text",
    )
  }

  return (
    <Menu
      data={[
        { title: "Report", icon: "report", onPress: onReport },
        {
          title: isBlocked(user?._id) ? "Unblock" : "Block",
          icon: "block-helper",
          onPress: isBlocked(user?._id) ? unblockUser : blockUser,
        },
      ]}
      visible={visible}
      setVisible={setVisible}
    />
  )
}

const ProfileHeader = ({ user, isUser, onMessage, onProfileImagePress, onBannerPress }) => {
  const {
    userStore: { _id },
    api: { mutateReportOnUser },
  } = useStores()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { getProfileDetails, followUser, unfollowUser, getUserById } = useHooks()
  const [profileDetails, setProfileDetails] = useState({
    blocked: false,
    data: { followercount: 0, followingCount: 0 },
    following: false,
  })
  const [descriptionLineCount, setDescriptionLineCount] = useState(undefined)
  const [bannerLoaded, setBannerLoaded] = useState(false)

  const syncProfile = async () => {
    const resProfile = await getProfileDetails(user?._id)
    setProfileDetails({ ...resProfile })
  }

  const [followLoading, setFollowLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const isFocus = useIsFocused()

  useEffect(() => {
    getProfileDetails(user?._id)
  }, [user, isFocus])
  const syncUser = async () => {
    try {
      const res = await getUserById(user?._id)
      navigation.setParams({ user: res })
      // setLoading(false)
      console.log("res", user)
    } catch (err) {}
  }
  const onRefresh = () => {
    // You can add your refresh logic here, e.g., fetch new data from an API
    // After fetching data, make sure to set refreshing to false.
    // For now, let's simulate a delay using setTimeout.
    syncUser()

    console.log("USERRRRRR", user)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const reportUser = async (reason: string) => {
    if (reason?.trim()?.length === 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Reason !",
        text2: "Type in a reason to successfully report.",
      })
      return
    }
    try {
      await mutateReportOnUser({
        reason,
        reportedById: _id,
        userId: user?._id,
      })
      Alert.alert(
        user?.first_name + " has been reported!",
        `Thank you for reporting the user. Please be assured that all reports are taken seriously and appropriate action will be taken if necessary. We will review the user within 24hours.`,
      )
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    }
  }

  const onFollowUnfollow = async () => {
    setFollowLoading(true)
    try {
      if (profileDetails.following) {
        await unfollowUser(user?._id)
      } else {
        await followUser(user?._id)
      }
    } catch (err) {
      Toast.show(toastMessages.somethingWentWrong)
    } finally {
      await syncProfile()
      setFollowLoading(false)
    }
  }

  const onTextLayout = useCallback((e) => {
    if (descriptionLineCount === undefined) {
      setDescriptionLineCount(e.nativeEvent.lines.length)
    }
  }, [])

  const getParentHeightOffset = () => {
    if (descriptionLineCount + 1 < 3) return descriptionLineCount + 1 * 17
    if (descriptionLineCount + 1 >= 3) {
      return 3 * 17
    }
    if (descriptionLineCount + 1 === 3) {
      return 3 * 17
    }
    if (descriptionLineCount + 1 >= 3) {
      return 3 * 17
    }
    if (descriptionLineCount + 1 >= 3) {
      return descriptionLineCount + 1 * 17
    }
    return 0
  }

  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.palette.primary300}
          titleColor={colors.palette.primary300}
        />
      }
    >
      <View
        style={{
          height: 390 + getParentHeightOffset() - (isUser ? 50 : 0),
          backgroundColor: colors.palette.neutral100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (user?.banner) onBannerPress()
          }}
        >
          <ShimmerPlaceholder
            visible={bannerLoaded}
            shimmerStyle={$topContainer}
            LinearGradient={LinearGradient}
            duration={2000}
            width={Dimensions.get("screen").width}
          >
            <FastImage
              source={
                user?.banner
                  ? {
                      uri: user?.banner,
                    }
                  : BROKEN_BANNER
              }
              style={[$topContainer, { backgroundColor: colors.background }]}
              onLoad={() => setBannerLoaded(true)}
            />
          </ShimmerPlaceholder>
        </TouchableOpacity>
        <View style={$userDetailsContainer}>
          <View style={$flexRow}>
            <TouchableOpacity onPress={onProfileImagePress}>
              <FastImage style={$profileImage} source={{ uri: user?.picture }} />
            </TouchableOpacity>
            <View
              style={[
                $flexRow,
                $flex1,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  justifyContent: "space-around",
                  paddingHorizontal: spacing.medium,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigationHome.dispatch(
                    StackActions.push("FollowerFollowing", { user, initialTab: "followers" }),
                  )
                }
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ alignItems: "center" }}
              >
                <Text
                  text="Followers"
                  weight="semiBold"
                  size="xxs"
                  color={colors.palette.neutral400}
                />
                <Text
                  text={profileDetails?.data?.followercount.toString()}
                  size="lg"
                  weight="semiBold"
                  color={colors.palette.primary100}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigationHome.dispatch(
                    StackActions.push("FollowerFollowing", { user, initialTab: "following" }),
                  )
                }
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ alignItems: "center" }}
              >
                <Text
                  text="Following"
                  weight="semiBold"
                  size="xxs"
                  color={colors.palette.neutral400}
                />
                <Text
                  text={profileDetails?.data?.followingCount.toString()}
                  size="lg"
                  weight="semiBold"
                  color={colors.palette.primary100}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              $flexRow,
              // eslint-disable-next-line react-native/no-inline-styles
              { alignItems: "center", marginTop: spacing.tiny },
            ]}
          >
            <Text
              text={formatName(user?.name)}
              numberOfLines={1}
              style={$publisherName}
              weight="semiBold"
            />
            {user?.blueTick && (
              <Icon
                icon="verifiedTick"
                size={20}
                containerStyle={{ marginLeft: spacing.extraSmall }}
              />
            )}
          </View>
          {user?.description + " " && (
            <View>
              <Text
                onTextLayout={onTextLayout}
                color={colors.palette.neutral900}
                numberOfLines={
                  descriptionLineCount && descriptionLineCount > 3 ? 3 : descriptionLineCount
                }
                weight="normal"
                text={user?.description?.trim()}
                style={$descriptionText}
              />
            </View>
          )}
          {!isUser && (
            <View style={$flexRow}>
              <TouchableOpacity
                style={[
                  $followContainer,
                  { marginRight: spacing.extraSmall },
                  profileDetails?.following && { backgroundColor: colors.palette.primary100 },
                ]}
                onPress={onFollowUnfollow}
              >
                {followLoading ? (
                  <ActivityIndicator
                    color={
                      profileDetails?.following
                        ? colors.palette.neutral100
                        : colors.palette.primary100
                    }
                  />
                ) : (
                  <>
                    <Icon
                      containerStyle={{ marginRight: spacing.extraSmall }}
                      size={22}
                      color={
                        profileDetails?.following
                          ? colors.palette.neutral100
                          : colors.palette.primary100
                      }
                      icon={profileDetails?.following ? "followed" : "follow"}
                    />
                    <Text
                      weight="medium"
                      color={
                        profileDetails?.following
                          ? colors.palette.neutral100
                          : colors.palette.primary100
                      }
                      text={profileDetails?.following ? "Unfollow" : "Follow"}
                    />
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={$followContainer} onPress={onMessage}>
                <Icon
                  containerStyle={{ marginRight: spacing.extraSmall }}
                  size={22}
                  color={colors.palette.primary100}
                  icon="chatMessage"
                />
                <Text weight="medium" color={colors.palette.primary100} text="Message" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isUser && (
          <View style={$verticalThreeDots}>
            <Options reportUser={reportUser} user={user} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export const Profile: FC<HomeTabProps<"Profile">> = observer(function Profile({ route }) {
  const { user, header, change } = route.params

  const [galleryItemsTopics, setGalleryItemsTopics] = useState([])
  const [galleryItemsClassifieds, setGalleryItemsClassifieds] = useState([])
  const [galleryItemsHomePosts, setGalleryItemsHomePosts] = useState([])
  const { getOrCreateRoom, getUserById } = useHooks()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const layout = useWindowDimensions()
  const {
    userStore: { _id },
  } = useStores()
  const [loading, setLoading] = useState(Object.keys(user)?.length === 1)
  const isUser = user?._id === _id
console.log("user",user)
  const [index, setIndex] = React.useState(0)

  const [isImageViewVisible, setImageViewVisible] = React.useState<{
    visible: boolean
    type: "picture" | "banner"
  }>({ visible: false, type: "picture" })

  const [routes] = React.useState([
    { key: "posts", title: "Posts" },
    { key: "topic", title: "Discussions" },
    { key: "classified", title: "Classifieds" },
    { key: "gallery", title: "Gallery" },
  ])

  const syncUser = async () => {
    setLoading(true)

    try {
      const res = await getUserById(user?._id)
      navigation.setParams({ user: res })
      setLoading(false)
    } catch (err) {
      Alert.alert(
        "Error fetching User",
        "We apologize, but the requested user's information is currently unavailable.",
        [{ text: "Go Back", onPress: navigation.goBack }],
      )
    }
  }

  useEffect(() => {
    syncUser()
  }, [user?._id])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "posts":
        return (
          <HomePostsTabScreen
            userId={user?._id}
            addToGallery={setGalleryItemsHomePosts}
            change={change}
          />
        )
      case "topic":
        return (
          <TopicsTabScreen
            userId={user?._id}
            addToGallery={setGalleryItemsTopics}
            change={change}
          />
        )
      case "classified":
        return <ClassifiedsTabScreen userId={user?._id} addToGallery={setGalleryItemsClassifieds} />
      case "gallery":
        return (
          <GalleryTabView
            galleryItems={[
              ...galleryItemsTopics,
              ...galleryItemsClassifieds,
              ...galleryItemsHomePosts,
            ]}
          />
        )
      default:
        return null
    }
  }

  const onMessage = async () => {
    const roomId = await getOrCreateRoom(user?._id)
    if (!roomId) Toast.show(toastMessages.mightbeblocked)
    roomId && navigation.navigate("P2PChat", { receiver: user, roomId })
  }

  if (loading) return <Loading />

  return (
    <Screen contentContainerStyle={$flex1}>
      {header && (
        <Header
          title={"Profile"}
          titleStyle={{ color: colors.palette.neutral100 }}
          leftIcon="caretLeft"
          backgroundColor={colors.palette.primary100}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />
      )}
      <CollapsibleHeaderTabView
        renderScrollHeader={() => (
          <ProfileHeader
            onProfileImagePress={() => {
              setImageViewVisible({ visible: true, type: "picture" })
            }}
            onBannerPress={() => {
              setImageViewVisible({ visible: true, type: "banner" })
            }}
            user={user}
            isUser={isUser}
            onMessage={onMessage}
          />
        )}
        enableSnap
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => renderTabBar(props, setIndex, index)}
        onIndexChange={setIndex}
        style={$flex1}
        initialLayout={{ width: layout.width }}
      />
      <ImageView
        images={[
          {
            uri:
              isImageViewVisible.type === "picture"
                ? user?.picture || defaultImages.profile
                : user?.banner,
          },
        ]}
        imageIndex={0}
        visible={isImageViewVisible.visible}
        swipeToCloseEnabled
        animationType="fade"
        onRequestClose={() => setImageViewVisible({ ...isImageViewVisible, visible: false })}
      />
    </Screen>
  )
})

// const $followingContainer: ViewStyle = {
//   borderWidth: 1,
//   borderColor: colors.palette.primary100,
//   height: 40,
//   width: 100,

// }
const $followContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.primary100,
  flexDirection: "row",
  padding: spacing.extraSmall,
  marginVertical: spacing.extraSmall,
  borderRadius: spacing.extraSmall,
  flex: 1,
  justifyContent: "center",
}

const $verticalThreeDots: ViewStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  transform: [{ rotate: "90deg" }],
}

const $userDetailsContainer: ViewStyle = {
  marginHorizontal: spacing.medium,
  backgroundColor: colors.palette.neutral100,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  top: -40,
  height: 180,
  padding: spacing.medium,
}

const $tabBarItem: ViewStyle = {
  height: 50,
  // width: 171.2, // Default Tab Width as per docs
  // width:'100%',
  flex: 1,
  backgroundColor: "pink",
  ...$contentCenter,
}

const $tab: TextStyle = {
  fontSize: 14,
}

const $label: TextStyle = {
  color: colors.palette.greyOverlay100,
  fontSize: 14,
  fontWeight: "700",
}

const $indicator: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  // height: 0,
}

const $topContainer: ImageStyle = {
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
  paddingBottom: spacing.medium,
  height: 250,
  width: Dimensions.get("screen").width,
}

const $descriptionText: TextStyle = {
  fontSize: 14,
  lineHeight: 17,
}

const $publisherName: TextStyle = {
  fontSize: 16,
  textAlign: "center",
}

const $profileImage: ImageStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  alignSelf: "center",
}
