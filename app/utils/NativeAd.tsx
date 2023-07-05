import React, { forwardRef, useState, useEffect, useRef } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import AppLovinMAX from "react-native-applovin-max"
import { NATIVE_AD_UNIT_ID } from "./AppLovin"
import { colors } from "../theme"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Lottie from "lottie-react-native"

export const NativeAdView = () => {
  const [aspectRatio, setAspectRatio] = useState(1.0)
  const [visible, setVisible] = useState(false)
  const [mediaViewSize, setMediaViewSize] = useState({})
  const [isNull, setIsNull] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef()
  const success = useSharedValue(0)
  // adjust the size of MediaView when `aspectRatio` changes
  //   useEffect(() => {
  //     ref.current && ref?.current?.loadAd()
  //   }, [ref.current])
  useEffect(() => {
    success.value = withTiming(340, { duration: 200 })
    if (aspectRatio > 1) {
      // landscape
      setMediaViewSize({ aspectRatio, width: "100%", height: undefined })
    } else {
      // portrait or square
      setMediaViewSize({ aspectRatio, width: undefined, height: 180 })
    }
  }, [aspectRatio])

  if (isNull) return null

  return (
    <>
      <AppLovinMAX.NativeAdView
        adUnitId={NATIVE_AD_UNIT_ID}
        //   placement="myplacement"
        //   customData="mycustomdata"
        ref={ref}
        style={styles.nativead}
        onAdLoaded={(adInfo) => {
          setAspectRatio(adInfo.nativeAd.mediaContentAspectRatio)
          setLoaded(true)
        }}
        onAdLoadFailed={(errorInfo) => {
          setIsNull(true)
       
        }}
        onAdClicked={(adInfo) => {

        }}
        onAdRevenuePaid={(adInfo) => {
     
        }}
      >
        <View 
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <View 
          style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <AppLovinMAX.NativeAdView.IconView style={styles.icon} />
            <View 
            style={{ flexDirection: "column", flexGrow: 1 }}>
              <AppLovinMAX.NativeAdView.TitleView style={styles.title} />
              {/* <AppLovinMAX.NativeAdView.StarRatingView style={styles.starRatingView} /> */}
              <AppLovinMAX.NativeAdView.AdvertiserView style={styles.advertiser} />
            </View>
            <AppLovinMAX.NativeAdView.OptionsView style={styles.optionsView} />
          </View>
          {/* <AppLovinMAX.NativeAdView.BodyView style={styles.body} /> */}
          <AppLovinMAX.NativeAdView.MediaView style={{ ...styles.mediaView, ...mediaViewSize }} />
          <AppLovinMAX.NativeAdView.CallToActionView style={styles.callToAction} />
          {!loaded && (
            <Lottie
              style={{
                height: 40,
                backgroundColor: colors.transparent,
                position: "absolute",
                alignSelf: "center",
              }}
              source={require("../../assets/lottie/loader.json")}
              autoPlay
              loop
            />
          )}
        </View>
      </AppLovinMAX.NativeAdView>
    </>
  )
}

const styles = StyleSheet.create({
  nativead: {
    margin: 10,
    padding: 10,
    backgroundColor: "#EFEFEF",
  },
  title: {
    fontSize: 16,
    marginTop: 4,
    marginHorizontal: 5,
    textAlign: "left",
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    margin: 5,
    height: 48,
    aspectRatio: 1,
    borderRadius: 5,
  },
  optionsView: {
    height: 20,
    width: 20,
    backgroundColor: "#EFEFEF",
    color: colors.palette.neutral700,
  },
  starRatingView: {
    marginHorizontal: 5,
    fontSize: 10, // size of each star as unicode symbol
    color: colors.palette.primary100,
    // backgroundColor: colors.palette.primary100,
  },
  advertiser: {
    marginHorizontal: 5,
    textAlign: "left",
    fontSize: 12,
    fontWeight: "400",
    color: colors.palette.neutral700,
  },
  body: {
    fontSize: 14,
    marginVertical: 4,
    color: colors.palette.neutral700,
  },
  mediaView: {
    alignSelf: "center",
    aspectRatio: 1,
  },
  callToAction: {
    padding: 5,
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
    backgroundColor: colors.palette.primary400,
  },
})

export default NativeAdView
