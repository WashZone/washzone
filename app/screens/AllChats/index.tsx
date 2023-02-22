import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { $flex1 } from "../styles"
import { Screen, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "../../theme"
import { AddMessageModal, P2PUserComponent } from "./partials"
import { FlatList, View } from "react-native"

export const AllChats: FC<AppStackScreenProps<"AllChats">> = observer(function AllChats(props) {
  const [data, setData] = useState<any>()
  const [addModalVisible, setAddModalVisible] = useState<any>()
  const navigation = useNavigation()
  // const { getPlaylist } = useHooks()

  // const syncPlaylistData = async () => {
  //   const res = await getPlaylist(playlistId)

  //   setPlaylistData(res)
  // }

  // useEffect(() => {
  //   syncPlaylistData()
  // }, [])

  return (
    <>
      <Screen preset="fixed" contentContainerStyle={$flex1}>
        <Header
          titleStyle={{ color: colors.palette.neutral100 }}
          backgroundColor={colors.palette.primary100}
          title="All Chats"
          onRightPress={() => setAddModalVisible(true)}
          rightIcon="addMessage"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />
        <FlatList
          style={$flex1}
          data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          renderItem={({ item, index }) => <P2PUserComponent />}
          ListFooterComponent={<View style={{padding:spacing.medium}}/>}
        />
      </Screen>
      <AddMessageModal isVisible={addModalVisible} setVisible={setAddModalVisible} />
    </>
  )
})
