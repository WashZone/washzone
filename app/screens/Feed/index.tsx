import React, { FC, useState } from "react"
import { HomeTabProps } from "../../tabs/Home"
import { CreatePost } from "./partials/CreatePost"
import { Posts } from "./partials/Posts"
import { Screen } from "../../components"
import { ViewStyle } from "react-native"
import ImageView from "react-native-fast-image-viewing"

import { ImageSource } from "react-native-image-viewing/dist/@types"
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { Host } from "react-native-portalize"

export interface ImageViewConfigType {
  images: ImageSource[]
  currentIndex: number
  show: boolean
}

export const Feed: FC<HomeTabProps<"Feed">> = function Home(props) {
  const [imageViewConfig, setImageViewConfig] = useState<ImageViewConfigType>({
    images: [],
    currentIndex: 0,
    show: false,
  })
  const progress = useSharedValue(0)

  console.log("imageViewConfig : ", imageViewConfig)

 
  return (
    <Screen preset="fixed" keyboardOffset={-180} contentContainerStyle={$container}>
      <Host>
        {/* <Animated.View style={animatedMediaContainer} /> */}
        <Posts setImageViewConfig={setImageViewConfig} />
        <ImageView
          images={imageViewConfig.images}
          imageIndex={imageViewConfig.currentIndex}
          visible={imageViewConfig.show}
          onRequestClose={() => setImageViewConfig({ ...imageViewConfig, show: false })}
        />
        {/* <CreatePost progress={progress} focused={props?.route.params?.focused} /> */}
      </Host>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
