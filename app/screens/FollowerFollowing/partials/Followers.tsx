import React, { useEffect, useState } from "react"
import { MiniUserComponent, Text } from "../../../components"
import { FlatList } from "react-native"
import { NavigationProp, useNavigation, StackActions } from "@react-navigation/native"
import { HomeTabParamList } from "../../../tabs"
import { useHooks } from "../../hooks"
import Loading from "../../../components/Loading"
import { spacing } from "../../../theme"

export const FollowersList = ({ user }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const { getFollowers } = useHooks()
  const onCardPress = (i: any) => {
    navigationHome.dispatch(StackActions.push("Profile", { user: i }))
  }

  const syncFollowers = async () => {
    try {
      const res = await getFollowers(user?._id)
      setData(res)
      console.log('syncFollowers',res)

    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    syncFollowers()
  }, [])

  if (loading) {
    return <Loading />
  }
  
  if (data?.length === 0) {
    return <Text weight='medium' 
            // eslint-disable-next-line react-native/no-inline-styles
            style={{textAlign:'center' , marginTop:spacing.massive} } text={user?.first_name +` isn't followed by anyone.`}/>
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <MiniUserComponent key={index} item={item?.userId} onPress={onCardPress} />
      )}
    />
  )
}
