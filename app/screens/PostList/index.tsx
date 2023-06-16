import React, { FC, useEffect, useState } from "react"
import { CustomFlatlist, Header, Screen } from "../../components"
import { HomeTabParamList, HomeTabProps } from "../../tabs"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "../../theme"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { formatName } from "../../utils/formatName"
import { useHooks } from "../hooks"
import { PostComponent } from "../Feed/partials"
import { ImageViewConfigType } from "../Feed"
import ImageView from "react-native-image-viewing"
import Loading from "../../components/Loading"
import { $flex1 } from "../styles"

export const PostList: FC<HomeTabProps<"PostList">> = observer(function PostList({ route }) {
  const { user } = route.params
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>()
  const { getUsersHomePosts, updateLastReadPost } = useHooks()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [imageViewConfig, setImageViewConfig] = useState<ImageViewConfigType>({
    images: [],
    currentIndex: 0,
    show: false,
  })

  const syncPosts = async () => {
    const res = await getUsersHomePosts(user?._id)
    res.length > 0 && updateLastReadPost({ lastReadPostId: res[0]?._id, followId: user?._id })
    setPosts(res)
    setLoading(false)
  }

  useEffect(() => {
    syncPosts()
  }, [])

  return (
    <Screen contentContainerStyle={$flex1}>
      <Header
        safeAreaEdges={[]}
        title={formatName(user?.name)}
        titleStyle={{ color: colors.palette.neutral100 }}
        leftIcon="caretLeft"
        backgroundColor={colors.palette.primary100}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral100}
      />
      {loading ? (
        <Loading />
      ) : (
        <View>
          <CustomFlatlist
            customRefresh={syncPosts}
            data={posts}
            removeClippedSubviews
            renderItem={({ item, index }) => (
              <PostComponent
                setImageViewConfig={setImageViewConfig}
                numberOfLines={7}
                key={item?._id}
                post={item}
                navigateOnPress={true}
                index={index}
              />
            )}
          />
        </View>
        // <FlatList
        //   data={posts}
        //   renderItem={({ item, index }) => (
        //     <PostComponent post={item} index={index} setImageViewConfig={setImageViewConfig} />
        //   )}
        // />
      )}
      <ImageView
        images={imageViewConfig.images}
        imageIndex={imageViewConfig.currentIndex}
        visible={imageViewConfig.show}
        onRequestClose={() => setImageViewConfig({ ...imageViewConfig, show: false })}
      />
    </Screen>
  )
})
