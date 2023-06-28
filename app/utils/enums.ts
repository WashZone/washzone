export enum Interaction {
  like = "like",
  dislike = "dislike",
  null = "",
  notLiked = "NOT-LIKED",
  notDisliked = "NOT-DISLIKED",
  saved = "SAVED",
  notSaved = "NOT-SAVED",
}

export enum NotificationType {
  classified ='ClassifiedMessage',
  commentOnTopic='CommentOnTopic',
  commentOnPost='CommentOnPost',
  likeOnVideo='LikeOnVideo',
  likeOnPost='LikeOnPost',
  likeOnTopic='LikeOnTopic',
}