import { Alert } from "react-native"
import { userTagRegEx } from "../components"
import { Interaction } from "./enums"
import { InputattachmentUrls } from "../models/api/RootStore.base"
import { Change } from "../tabs"
import { navigationRef } from "../navigators"

export const getIconForInteraction = (i: Interaction, buttonType: "liked" | "disliked") => {
  if (buttonType === "liked") {
    if (i === Interaction.like) {
      return "likefill"
    } else {
      return "like"
    }
  } else {
    if (i === Interaction.dislike) {
      return "dislikefill"
    } else {
      return "dislike"
    }
  }
}

export const getInputInteraction = (
  button: "like" | "dislike",
  previousInteraction: Interaction,
) => {
  if (button === "like") {
    if (previousInteraction === Interaction.like) return Interaction.null
    else return Interaction.like
  } else {
    if (previousInteraction === Interaction.dislike) return Interaction.null
    else return Interaction.dislike
  }
}

export const likeDislikeCountUpdater = (
  previousInteraction: Interaction,
  likeviews: number,
  dislikeviews: number,
  newInteraction: Interaction,
) => {
  let newCount = { likeviews, dislikeviews }
  if (
    (previousInteraction === Interaction.null || previousInteraction === null) &&
    newInteraction === Interaction.like
  ) {
    newCount = { likeviews: likeviews + 1, dislikeviews }
  }
  if (
    (previousInteraction === Interaction.null || previousInteraction === null) &&
    newInteraction === Interaction.dislike
  ) {
    newCount = { likeviews, dislikeviews: dislikeviews + 1 }
  }
  if (previousInteraction === Interaction.like && newInteraction === Interaction.null) {
    newCount = { likeviews: likeviews - 1, dislikeviews }
  }
  if (previousInteraction === Interaction.like && newInteraction === Interaction.dislike) {
    newCount = { likeviews: likeviews - 1, dislikeviews: dislikeviews + 1 }
  }
  if (previousInteraction === Interaction.dislike && newInteraction === Interaction.null) {
    newCount = { likeviews, dislikeviews: dislikeviews - 1 }
  }
  if (previousInteraction === Interaction.dislike && newInteraction === Interaction.like) {
    newCount = { likeviews: likeviews + 1, dislikeviews: dislikeviews - 1 }
  }
  return newCount
}

export const showAlertYesNo = ({
  message,
  description,
  onCancel,
  onYesPress,
}: {
  message: string
  description?: string
  onCancel?: () => void
  onYesPress?: () => void
}) =>
  Alert.alert(
    message,
    description,
    [
      {
        text: "No",
        onPress: onCancel,
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: onYesPress,
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    },
  )

export const getTaggedIds = (content: string) => {
  const regex = /@\[([^[\]]+)\]\(([^)]+)\)/g
  const matchedSubstrings = []
  let match

  while ((match = regex.exec(content)) !== null) {
    matchedSubstrings.push(match[0])
  }

  const ids = matchedSubstrings.map((i) => {
    const match = i.match(userTagRegEx)
    return match[2]
  })
  return ids
}

export const isRemoteUrl = (url: string) => {
  return url.startsWith("http") || url.startsWith("data")
}

export const getImageUrlsFromPost = (attachments: InputattachmentUrls[]) => {
  return attachments.map((i) => {
    if (i.type.startsWith("video")) {
      return i.thumbnailUrl
    } else {
      return i.url
    }
  })
}

export const updateModules = (prev: any[], change: Change, callback?: (a: any[]) => void) => {
  /* update the previous modules as per the change passed */
  if (change && prev.length > 0) {
    const { data, action, moduleId } = change
    let updated = []

    if (action === "delete") {
      updated = prev.filter((item) => item._id !== moduleId)
    } else {
      updated = prev.map((item) => {
        if (item._id === change.data._id) {
          return {
            ...item,
            ...data,
          }
        }
        return item
      })
    }
    callback && callback(updated)
    
    callback?.(updated)
    return updated
  }
  return prev
}

export const handlingDeleteOnProfile = (moduleType: "post" | "topic", moduleId: string) => {
  const targetRoute = "Profile"
  const currentRoute = navigationRef.current?.getCurrentRoute()?.name
  if (currentRoute === targetRoute) {
    const change: Change = {
      moduleType,
      moduleId,
      action: "delete",
    }
    navigationRef.current.setParams({ change })
  }
}
