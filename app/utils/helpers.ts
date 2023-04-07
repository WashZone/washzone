import { Alert } from "react-native"
import { Interaction } from "./enums"

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
