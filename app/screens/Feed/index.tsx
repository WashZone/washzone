import React, { FC, useState } from "react"
import { HomeTabProps } from "../../tabs/Home"
import { Posts } from "./partials/Posts"
import { Screen } from "../../components"
import { ViewStyle } from "react-native"
import ImageView from "react-native-fast-image-viewing"

import { ImageSource } from "react-native-image-viewing/dist/@types"

export interface ImageViewConfigType {
  images: ImageSource[]
  currentIndex: number
  show: boolean
}

export const Feed: FC<HomeTabProps<"Feed">> = function Home(_props) {
  const [imageViewConfig, setImageViewConfig] = useState<ImageViewConfigType>({
    images: [],
    currentIndex: 0,
    show: false,
  })
 
  return (
    <Screen preset="fixed" keyboardOffset={-180} contentContainerStyle={$container}>
        <Posts setImageViewConfig={setImageViewConfig} />
        <ImageView
          images={imageViewConfig.images}
          imageIndex={imageViewConfig.currentIndex}
          visible={imageViewConfig.show}
          onRequestClose={() => setImageViewConfig({ ...imageViewConfig, show: false })}
        />
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
