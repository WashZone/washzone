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
  const [data, setData] = useState<any>([
    {
      __v: 0,
      _id: "63c9404e5c7f5266eee17a9c",
      createdAt: "2023-01-19T13:06:22.051Z",
      description: "",
      email: "Jirzo@gmail.com",
      first_name: "Jirazo",
      isSocialLogin: false,
      last_name: "Kat",
      name: "Jirazo Kat",
      password: "43dc4952544e840d6ec4e2e3d282c09db38c8596c68fe4608ba2e9480520c60b",
      picture: "https://ca.slack-edge.com/T01JZCZCSJY-U04C0Q08N4T-3e1650a7323c-512",
      role: "user",
      socialId: "",
      status: "",
      token: "",
      type: "email",
      updatedAt: "2023-02-16T04:59:21.972Z",
    },
  ])
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
          data={data}
          renderItem={({ item, index }) => <P2PUserComponent key={index} data={item}/>}
          ListFooterComponent={<View style={{ padding: spacing.medium }} />}
        />
      </Screen>
      <AddMessageModal isVisible={addModalVisible} setVisible={setAddModalVisible} />
    </>
  )
})
