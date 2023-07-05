import React from "react"
import {
    StyleProp,
    TextStyle,
} from "react-native"
import { $fontWeightStyles, TextProps } from "."
import { isRTL, translate } from "../i18n"
import { colors } from "../theme"
import ParsedText from 'react-native-parsed-text';
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeTabParamList } from "../tabs"

type Presets = keyof typeof $presets

export const userTagRegEx = /@\[([^[\]]+)\]\(([^)]+)\)/;
/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */

const renderText = (matchingString) => {
    const match = matchingString.match(userTagRegEx);
    return `@${match[1]}`;
}


export function ParsedTextComp(props: TextProps) {
    const navigation  = useNavigation<NavigationProp<HomeTabParamList>>()
    const {
        weight,
        size,
        tx,
        txOptions,
        text,
        children,
        style: $styleOverride,
        color,
        ...rest
    } = props

    const i18nText = tx && translate(tx, txOptions)
    const content = i18nText || text || children

    const preset: Presets = $presets[props.preset] ? props.preset : "default"
    const $styles = [
        $rtlStyle,
        $presets[preset],
        $fontWeightStyles[weight],
        $sizeStyles[size],
        $styleOverride,
        color && { color },
    ]

const handleUserTagPress = (text:string) => {
    const match = text.match(userTagRegEx);
    navigation.navigate('Profile', {user:{_id :match[2].trim()}})
}

    return (
        <ParsedText
            style={$styles}
            parse={
                [
                    // { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                    // { type: 'phone', style: styles.phone, onPress: this.handlePhonePress },
                    // { type: 'email', style: styles.email, onPress: this.handleEmailPress },
                    // { pattern: /Bob|David/, style: styles.name, onPress: this.handleNamePress },
                    { pattern:userTagRegEx, style: $userTag, onPress: handleUserTagPress, renderText },
                    // { pattern: /42/, style: styles.magicNumber },
                    // { pattern: /#(\w+)/, style: styles.hashTag },
                ]
            }
            childrenProps={{ allowFontScaling: false, ...rest }}

        >
            {content}
        </ParsedText>
        // <RNText allowFontScaling={false} {...rest} style={$styles}>

        // </RNText>
    )
}

const $userTag: TextStyle = {
    color: colors.palette.primary100,
    fontWeight: '900'
}

const $sizeStyles = {
    xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
    xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
    lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
    md: { fontSize: 18, lineHeight: 26 } as TextStyle,
    sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
    xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
    xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
}



const $baseStyle: StyleProp<TextStyle> = [
    $sizeStyles.sm,
    $fontWeightStyles.normal,
    { color: colors.text },
]

const $presets = {
    default: $baseStyle,

    bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

    heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

    h2: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

    formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

    formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,

    subheading: [$baseStyle, $sizeStyles.xs, $fontWeightStyles.bold] as StyleProp<TextStyle>,
    subheading2: [$baseStyle, $sizeStyles.xs, $fontWeightStyles.medium] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}


