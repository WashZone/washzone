import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { $flex1 } from "../styles"
import { Screen, Header, EmptyState } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "../../theme"
import { AddMessageModal, P2PUserComponent } from "./partials"
import { FlatList, RefreshControl, View } from "react-native"
import { useStores } from "../../models"
import { OptionsModal } from "./partials/OptionsModal"
import { useHooks } from "../hooks"

export const AllChats: FC<AppStackScreenProps<"AllChats">> = observer(function AllChats(props) {
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [optionsVisible, setOptionsModalVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const {
    allChats: { allChatRooms, getLatestMessageForRoom },
    userStore: { _id },
  } = useStores()
  const { deleteChatRoom, syncAllChats } = useHooks()

  const onLongPress = (id: string) => {
    console.log("ID", id)
    setSelectedRoomId(id)
    setOptionsModalVisible(true)
  }

  const onDelete = () => {
    console.log("selectedRoomId:onDelete", selectedRoomId)
    deleteChatRoom(selectedRoomId)
    setOptionsModalVisible(false)
  }

  const sortByLatestTime = (a, b) => {
    const aTime = new Date(getLatestMessageForRoom(a?._id).time)?.getTime()
    const bTime = new Date(getLatestMessageForRoom(b?._id).time).getTime()
    return bTime - aTime
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await syncAllChats()
    setRefreshing(false)
  }

  useEffect(() => {
    syncAllChats()
  }, [])

  return (
    <>
      <Screen preset="fixed" contentContainerStyle={$flex1}>
        <Header
          titleStyle={{ color: colors.palette.neutral100 }}
          backgroundColor={colors.palette.primary100}
          title="Chats"
          onRightPress={() => setAddModalVisible(true)}
          rightIcon="addMessage"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral100}
        />

        {allChatRooms?.length === 0 ? (
          <EmptyState preset="allChats" buttonOnPress={() => setAddModalVisible(true)}/>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.palette.primary100}
              />
            }
            refreshing={refreshing}
            style={$flex1}
            data={allChatRooms.slice(0).sort(sortByLatestTime)}
            renderItem={({ item, index }) => (
              <P2PUserComponent onLongPress={onLongPress} key={index} data={item} myId={_id} />
            )}
            ListFooterComponent={<View style={{ padding: spacing.medium }} />}
          />
        )}
      </Screen>
      <AddMessageModal isVisible={addModalVisible} setVisible={setAddModalVisible} />
      <OptionsModal
        isVisible={optionsVisible}
        setVisible={setOptionsModalVisible}
        onDelete={onDelete}
      />
    </>
  )
})
