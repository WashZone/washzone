import React, { useEffect, useState } from "react"
import { BottomModal, Text } from "."
import MiniUserComponent from "./UserComponents"
import { FlatList } from "react-native"
import { useHooks } from "../screens/hooks"
import { colors, spacing } from "../theme"

interface LikesModalProps {
  module: "video" | "discussion" | "post"
  moduleId: string
  isVisible: boolean
  setVisible: (b: boolean) => void
}

export const LikesModal = ({ setVisible, isVisible, moduleId, module }: LikesModalProps) => {
  const [data, setData] = useState([])
  const { getLikesOnDiscussion, getLikesOnPost, getLikesOnVideo } = useHooks()

  useEffect(() => {
    console.log("LikesModal", module, isVisible, moduleId)
    isVisible && syncData()
  }, [isVisible])

  const syncData = async () => {
    switch (module) {
      case "discussion": {
        const res = await getLikesOnDiscussion(moduleId)
        console.log("getLikesOnDiscussion:syncData", res?.data)
        setData(res?.data)

        break
      }
      case "video": {
        const res = await getLikesOnVideo(moduleId)
        console.log("getLikesOnVideo", res?.data)
        setData(res?.data)

        break
      }
      case "post": {
        const res = await getLikesOnPost(moduleId)
        console.log("getLikesOnPost", res?.data)
        setData(res?.data)
        break
      }
    }
  }

  return (
    <BottomModal
      backgroundColor={colors.palette.neutral100}
      isVisible={isVisible}
      setVisible={setVisible}
    >
      <Text
        text="Likes"
        weight="semiBold"
        size="md"
        style={{ textAlign: "center", marginBottom: spacing.extraSmall }}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <MiniUserComponent key={index} item={item?.userId} />}
      />
    </BottomModal>
  )
}
