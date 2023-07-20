import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/clap.png"),
  community: require("../../assets/icons/community.png"),
  components: require("../../assets/icons/components.png"),
  debug: require("../../assets/icons/debug.png"),
  github: require("../../assets/icons/github.png"),
  heart: require("../../assets/icons/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  deleteUser: require("../../assets/icons/delete-user.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/pin.png"),
  podcast: require("../../assets/icons/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  fb: require("../../assets/icons/fb.png"),
  google: require("../../assets/icons/google.png"),
  email: require("../../assets/icons/email.png"),
  apple: require("../../assets/icons/apple.png"),
  home: require("../../assets/icons/home.png"),
  topics: require("../../assets/icons/topics.png"),
  classifieds: require("../../assets/icons/classifieds.png"),
  videos: require("../../assets/icons/videos.png"),
  legal: require("../../assets/icons/legal.png"),
  logout: require("../../assets/icons/logout.png"),
  notifications: require("../../assets/icons/notifications.png"),
  profile: require("../../assets/icons/profile.png"),
  support: require("../../assets/icons/support.png"),
  search: require("../../assets/icons/search.png"),
  appLogo: require("../../assets/icons/app-logo.png"),
  add: require("../../assets/icons/add.png"),
  gallery: require("../../assets/icons/gallery.png"),
  delete: require("../../assets/icons/delete.png"),
  emoji: require("../../assets/icons/emoji.png"),
  gif: require("../../assets/icons/gif.png"),
  camera: require("../../assets/icons/camera.png"),
  send: require("../../assets/icons/send.png"),
  share: require("../../assets/icons/share.png"),
  alert: require("../../assets/icons/alert.png"),
  save: require("../../assets/icons/save.png"),
  offer: require("../../assets/icons/offer.png"),
  upload: require("../../assets/icons/upload.png"),
  dislikefill: require("../../assets/icons/dislike-fill.png"),
  dislike: require("../../assets/icons/dislike.png"),
  forwardfill: require("../../assets/icons/forward-fill.png"),
  forward: require("../../assets/icons/forward.png"),
  likefill: require("../../assets/icons/like-fill.png"),
  like: require("../../assets/icons/like.png"),
  share3Dot: require("../../assets/icons/share-3dot.png"),
  userProfile: require("../../assets/icons/user-profile.png"),
  save_box: require("../../assets/icons/save_box.png"),
  add_vector: require("../../assets/icons/add-vector.png"),
  reset: require("../../assets/icons/reset.png"),
  key: require("../../assets/icons/key.png"),
  arrowDown: require("../../assets/icons/arrowDown.png"),
  plus: require("../../assets/icons/plus.png"),
  download: require("../../assets/icons/download.png"),
  uploadCloud: require("../../assets/icons/upload_cloud.png"),
  audioCall: require("../../assets/icons/audio-call.png"),
  videoCall: require("../../assets/icons/video-call.png"),
  chatMessage: require("../../assets/icons/chat-message.png"),
  addMessage: require("../../assets/icons/add-message.png"),
  hangUpCall: require("../../assets/icons/hang-up.png"),
  microphone: require("../../assets/icons/microphone.png"),
  microphone_block: require("../../assets/icons/microphone-block.png"),
  no_audio: require("../../assets/icons/no-audio.png"),
  speaker: require("../../assets/icons/speaker.png"),
  addImage: require("../../assets/icons/add-image.png"),
  shareCursive: require("../../assets/icons/share-cursive.png"),
  reportUser: require("../../assets/icons/report-user.png"),
  flag: require("../../assets/icons/flag.png"),
  follow: require("../../assets/icons/follow.png"),
  followed: require("../../assets/icons/followed.png"),
  block: require("../../assets/icons/block.png"),
  blockUser: require("../../assets/icons/block-user.png"),
  attachment: require("../../assets/icons/attachment.png"),
  verifiedTick: require("../../assets/icons/verified-tick.png"),
  editPhoto: require("../../assets/icons/photo.png"),
  addBold: require("../../assets/icons/plus-bold.png"),
  people: require("../../assets/icons/people.png"),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
