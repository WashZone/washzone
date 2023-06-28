import React, { useEffect, useState } from "react"
import { BottomModal, Text } from "."
import MiniUserComponent from "./UserComponents"
import { Dimensions, FlatList, View } from "react-native"
import { useHooks } from "../screens/hooks"
import { colors, spacing } from "../theme"
import { ActivityIndicator } from "react-native-paper"
import { $contentCenter } from "../screens/styles"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../tabs"

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

  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()

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
      <View style={[$contentCenter, { height: (likesCount * (58) < Dimensions.get('screen').height * 0.7) ? likesCount * (58) : Dimensions.get('screen').height * 0.7 }]}>
        {loading ? <ActivityIndicator style={{}} color={colors.palette.primary100} /> : <FlatList
          data={data}
          renderItem={({ item, index }) => <MiniUserComponent onPress={() => { setVisible(false); setTimeout(() => navigationHome.navigate('Profile', { user: item?.userId }), 400) }} key={index} item={item?.userId} />}
        />}
      </View>
    </BottomModal>
  )
}
