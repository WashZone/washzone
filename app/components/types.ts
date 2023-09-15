export type TOnPost = ({
  postContent,
  files,
  postId,
}: {
  postContent: string
  files: any[]
  postId?: string
}) => void

export type TOnTopic = ({
  title,
  topicContent,
  file,
}: {
  title: string
  topicContent: string
  file: any
  topicId?: string
}) => void
