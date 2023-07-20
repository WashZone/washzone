import React, { FC, useEffect, useState } from "react"
import { Alert, Dimensions, RefreshControl, TextStyle, View, ViewStyle } from "react-native"
import { EmptyState, Header, ListItem, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"

import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { FlatList } from "react-native-gesture-handler"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import { HomeTabParamList } from "../../tabs"
import { formatName } from "../../utils/formatName"
import Loading from "../../components/Loading"

const UserItem = ({ item, index, handleOnPress }) => {
  const blockedUser = item?.blockUserById
  return (
    <ListItem
      onPress={() => handleOnPress(blockedUser)}
      key={index}
      style={$listItemStyle}
      LeftComponent={
        <FastImage
          style={$image}
          source={{
            uri: blockedUser?.picture,
          }}
        />
      }
      rightIcon="caretRight"
    >
      <View style={$textContainer}>
        <Text
          text={formatName(blockedUser?.name)}
          weight="semiBold"
          numberOfLines={1}
          style={{ width: Dimensions.get("window").width - 200 }}
        />
        {item?.description && (
          <Text
            numberOfLines={1}
            text={blockedUser?.description}
            style={{ width: Dimensions.get("window").width - 100 }}
          />
        )}
        {/* <Text text={classifiedDetails?.users?.name} style={$byText} /> */}
      </View>
    </ListItem>
  )
}

export const BlockedUsers: FC<AppStackScreenProps<"BlockedUsers">> = observer(
  function BlockedUsers() {
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()
    const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
    const {
      userStore: { _id },
      api: { queryGetBlockedByUserId },
    } = useStores()
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const syncData = async () => {
      setLoading(true)
      try {
        const res = await queryGetBlockedByUserId({ userId: _id }, { fetchPolicy: "no-cache" })
        setData(res.getBlockedByUserId?.data)
      } catch (err) {
        Alert.alert(err)
      }
      setLoading(false)
    }

    useEffect(() => {
      syncData()
    }, [])

    const handleOnPress = (item) => {
      navigation.goBack()
      navigationHome.navigate("Profile", { user: item })
    }

    const onRefresh = async () => {
      setRefreshing(true)
      await syncData()
      setRefreshing(false)
    }

    return (
      <Screen preset="fixed" contentContainerStyle={$container}>
        <Header
          leftIcon="caretLeft"
          title="Blocked Users"
          titleStyle={$titleStyle}
          onLeftPress={() => navigation.goBack()}
          leftIconColor={colors.palette.neutral600}
          backgroundColor={colors.palette.neutral100}
        />
        {loading ? (
          <Loading />
        ) : data?.length === 0 ? (
          <EmptyState preset="blocked" buttonOnPress={() => navigation.goBack()} />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.palette.primary100}
              />
            }
            data={data}
            renderItem={({ item, index }) => (
              <UserItem item={item} index={index} handleOnPress={handleOnPress} />
            )}
          />
        )}
      </Screen>
    )
  },
)

const $image: ImageStyle = {
  height: 45,
  width: 45,
  borderRadius: 22.5,
}

const $listItemStyle: ViewStyle = {
  alignItems: "center",
  height: 45 + spacing.medium * 2,
  paddingVertical: spacing.medium,
  marginHorizontal: spacing.medium,
  borderBottomColor: colors.separator,
  borderBottomWidth: 0.5,
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "left",
  marginLeft: 20,
}

const $container: ViewStyle = {
  flex: 1,
}

const $textContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  height: 45,
  alignSelf: "center",
  justifyContent: "center",
  flex: 1,
}
