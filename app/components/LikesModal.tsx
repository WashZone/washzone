import React, { useEffect, useState } from "react"
import { BottomModal, Text } from "."
import MiniUserComponent from "./UserComponents"
import { Dimensions, FlatList } from "react-native"
import { useHooks } from "../screens/hooks"
import { colors, spacing } from "../theme"
import { ActivityIndicator } from "react-native-paper"

interface LikesModalProps {
  module: "video" | "discussion" | "post"
  moduleId: string
  isVisible: boolean
  setVisible: (b: boolean) => void
  likesCount: number
}

export const LikesModal = ({ setVisible, isVisible, moduleId, module, likesCount }: LikesModalProps) => {
  const [data, setData] = useState([])
  const { getLikesOnDiscussion, getLikesOnPost, getLikesOnVideo } = useHooks()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("LikesModal", module, isVisible, moduleId)
    isVisible && syncData()
  }, [isVisible])

  const syncData = async () => {
    switch (module) {
      case "discussion": {
        setLoading(true)
        const res = await getLikesOnDiscussion(moduleId)
        console.log("getLikesOnDiscussion:syncData", res?.data)
        setData(res?.data)
        setLoading(false)
        break
      }
      case "video": {
        setLoading(true)
        const res = await getLikesOnVideo(moduleId)
        console.log("getLikesOnVideo", res?.data)
        setData(res?.data)
        setLoading(false)
        break
      }
      case "post": {
        setLoading(true)
        const res = await getLikesOnPost(moduleId)
        console.log("getLikesOnPost", res?.data)
        setData(res?.data)
        setLoading(false)
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
      {<FlatList
        ListHeaderComponent={loading && <ActivityIndicator style={{}} color={colors.palette.primary100}/>}
        style={{ height: (likesCount * (49) < Dimensions.get('screen').height * 0.7) ? likesCount * (49) : Dimensions.get('screen').height * 0.7 }}
        data={data}
        renderItem={({ item, index }) => <MiniUserComponent key={index} item={item?.userId} />}
      />}
    </BottomModal>
  )
}
