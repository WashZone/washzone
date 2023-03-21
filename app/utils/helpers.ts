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