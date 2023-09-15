import React, { useState } from "react"
import FastImage, { FastImageProps } from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import ShimmerPlaceholder, { ShimmerPlaceholderProps } from "react-native-shimmer-placeholder"
import { BROKEN_IMAGE } from "../utils"

export interface IShimmingImage extends FastImageProps {
  shimmerProps?: ShimmerPlaceholderProps
}

export const ShimmingImage = (props: IShimmingImage) => {
  const [loaded, setLoaded] = useState(false)
  const { shimmerProps, ...imageProps } = props
  return (
    <ShimmerPlaceholder
      visible={loaded}
      LinearGradient={LinearGradient}
      shimmerStyle={imageProps?.style || {}}
      {...shimmerProps}
    >
      <FastImage defaultSource={BROKEN_IMAGE} onLoadEnd={() => setLoaded(true)} {...imageProps} />
    </ShimmerPlaceholder>
  )
}
