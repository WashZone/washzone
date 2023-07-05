import React, { useEffect, useState } from "react"
import { MiniUserComponent, Text } from "../../../components"
import { FlatList } from "react-native"
import { NavigationProp, useNavigation, StackActions } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import { useHooks } from "../../hooks"
import Loading from "../../../components/Loading"
import { spacing } from "../../../theme"

export const FollowingList = ({ user }) => {
  const [data, setData] = useState([])
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const { getFollowings } = useHooks()
  const onCardPress = (i: any) => {
    navigationHome.dispatch(StackActions.push("Profile", { user: i }))
  }
  const [loading, setLoading] = useState(true)

  const syncFollowing = async () => {
    try {
      const res = await getFollowings(user?._id)
      setData(res)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    syncFollowing()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (data?.length === 0) {
    return (
      <Text
        weight="medium"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ textAlign: "center", marginTop: spacing.massive }}
        text={user?.first_name + ` doesn't follow anyone.`}
      />
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <MiniUserComponent key={index} item={item?.followId} onPress={onCardPress} />
      )}
    />
  )
}
