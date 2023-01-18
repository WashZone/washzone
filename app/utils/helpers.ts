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
