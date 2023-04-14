/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AppLovinMAX from 'react-native-applovin-max/src/index';
import { colors } from '../theme';
import { NATIVE_AD_UNIT_ID } from './AppLovin';

export const NativeAdView = forwardRef((props, ref) => {
    const [aspectRatio, setAspectRatio] = useState(1.0);
    const [mediaViewSize, setMediaViewSize] = useState({});

    // adjust the size of MediaView when `aspectRatio` changes
    useEffect(() => {
        if (aspectRatio > 1) {
            // landscape 
            // eslint-disable-next-line object-shorthand
            setMediaViewSize({ aspectRatio: aspectRatio, width: '80%', height: undefined });
        } else {
            // portrait or square
            setMediaViewSize({ aspectRatio, width: undefined, height: 180 });
        }
    }, [aspectRatio]);

    return (
        <AppLovinMAX.NativeAdView
            adUnitId={NATIVE_AD_UNIT_ID}
            placement='myplacement'
            customData='mycustomdata'
            ref={ref}
            style={styles.nativead}
            onAdLoaded={(adInfo) => {
                setAspectRatio(adInfo.nativeAd.mediaContentAspectRatio);
                console.log('AppLovinMAX.NativeAdView: Native ad loaded from ' + adInfo.networkName);
            }}
            onAdLoadFailed={(errorInfo) => {
                console.log('AppLovinMAX.NativeAdView: Native ad failed to load with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
            }}
            onAdClicked={() => {
                console.log('AppLovinMAX.NativeAdView: Native ad clicked');
            }}
            onAdRevenuePaid={(adInfo) => {
                console.log('AppLovinMAX.NativeAdView: Native ad revenue paid: ' + adInfo.revenue);
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppLovinMAX.NativeAdView.IconView style={styles.icon} />
                    <View style={{ flexDirection: 'column', flexGrow: 1 }}>
                        <AppLovinMAX.NativeAdView.TitleView style={styles.title} />
                        <AppLovinMAX.NativeAdView.AdvertiserView style={styles.advertiser} />
                    </View>
                    <AppLovinMAX.NativeAdView.OptionsView style={styles.optionsView} />
                </View>
                <AppLovinMAX.NativeAdView.BodyView style={styles.body} />
                <AppLovinMAX.NativeAdView.MediaView style={{ ...styles.mediaView, ...mediaViewSize }} />
                <AppLovinMAX.NativeAdView.CallToActionView style={styles.callToAction} />
            </View>
        </AppLovinMAX.NativeAdView>
    );
});

const styles = StyleSheet.create({
    advertiser: {
        color: colors.palette.grey,
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 5,
        marginTop: 2,
        textAlign: 'left',
    },
    body: {
        fontSize: 14,
        marginVertical: 8,
    },
    callToAction: {
        backgroundColor: colors.palette.primary200,
        color: colors.palette.neutral100,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        width: '100%',
    },
    icon: {
        aspectRatio: 1,
        borderRadius: 5,
        height: 40,
        margin: 5,
    },
    mediaView: {
        alignSelf: 'center',
        aspectRatio: 1,
    },
    nativead: {
        backgroundColor: colors.palette.neutral200,
        margin: 10,
        padding: 10,
    },
    optionsView: {
        backgroundColor: colors.palette.neutral200,
        height: 20,
        width: 20,
    },
    title: {
        color: colors.palette.neutral900,
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginTop: 4,
        textAlign: 'left',
    },
});

export default NativeAdView;