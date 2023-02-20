// import React, { forwardRef, MutableRefObject } from "react"
// import { StyleSheet, View, ViewStyle } from "react-native"
// import AppLovinMAX from "react-native-applovin-max/src/index"
// import { colors } from "../theme"

// // eslint-disable-next-line react/display-name
// export const NativeAdView = forwardRef<MutableRefObject<undefined>, { adUnitId: string }>(
//   (props, ref) => {
//     const { adUnitId } = props

//     return (
//       <AppLovinMAX.NativeAdView
//         adUnitId={adUnitId}
//         //   placement='myplacement'
//         //   customData='mycustomdata'
//         ref={ref}
//         style={styles.nativead}
//       >
//         {/* <View style={$flex1}> */}
//         {/* <View style={$flexHoriBw}>
//                     <AppLovinMAX.NativeAdView.IconView style={styles.icon}/>
//                     <View style={[$flex1, {backgroundColor:'red'}]}>
//                         <AppLovinMAX.NativeAdView.TitleView style={styles.title}/>
//                         <AppLovinMAX.NativeAdView.AdvertiserView style={styles.advertiser}/>
//                     </View>
//                     <AppLovinMAX.NativeAdView.OptionsView style={styles.optionsView}/>
//                 </View> */}
//         <AppLovinMAX.NativeAdView.BodyView style={styles.body} />
//         <AppLovinMAX.NativeAdView.MediaView style={styles.mediaView} />
//         <AppLovinMAX.NativeAdView.CallToActionView style={styles.callToAction} />
//         {/* </View> */}
//       </AppLovinMAX.NativeAdView>
//     )
//   },
// )

// // const $flex1: ViewStyle = {
// //   flex: 1,
// // }
// // const $flexHoriBw: ViewStyle = {
// //   flexDirection: "row",
// //   justifyContent: "space-between",
// //   backgroundColor: "blue",
// // }

// const styles = StyleSheet.create({
//   advertiser: {
//     color: colors.palette.neutral400,
//     fontSize: 16,
//     fontWeight: "400",
//     marginHorizontal: 5,
//     marginTop: 2,
//     textAlign: "left",
//   },
//   body: {
//     fontSize: 14,
//     height: "auto",
//   },
//   callToAction: {
//     backgroundColor: colors.palette.primary100,
//     color: colors.palette.neutral100,
//     fontSize: 20,
//     fontWeight: "bold",
//     padding: 5,
//     textAlign: "center",
//     textTransform: "uppercase",
//     width: "100%",
//   },
//   icon: {
//     aspectRatio: 1,
//     borderRadius: 5,
//     height: 40,
//     margin: 5,
//   },
//   mediaView: {
//     backgroundColor: colors.palette.neutral900,
//     flexGrow: 1,
//     height: "auto",
//     width: "100%",
//   },
//   nativead: {
//     height: 350,
//     marginBottom: 10,
//     marginTop: -10,
//     paddingHorizontal: 10,
//   },
//   optionsView: {
//     height: 20,
//     width: 20,
//   },
//   title: {
//     alignItems: "center",
//     color: colors.palette.neutral900,
//     fontSize: 20,
//     fontWeight: "bold",
//     marginHorizontal: 5,
//     marginTop: 4,
//     textAlign: "left",
//   },
// })

// export default NativeAdView
