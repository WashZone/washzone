import React, { useEffect, useState } from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { MentionInput } from "react-native-controlled-mentions"
import { MentionInputProps, PartType } from "react-native-controlled-mentions/dist/types"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "."
import { useHooks } from "../screens/hooks"
import { colors, spacing } from "../theme"
import { Portal } from "react-native-portalize"

// const suggestions = [
//     { id: "644ba73f664a8178632294cc", name: "David Tabaka", picture: 'https://s3-us-west-2.amazonaws.com/washzone-23/uploads%2F20A5224D-592B-4F17-B961-60552A25AB04.jpg1683182747283' },
//     { id: "644ba73f664a8178632294cc", name: "Mary", picture: 'https://s3-us-west-2.amazonaws.com/washzone-23/uploads%2F20A5224D-592B-4F17-B961-60552A25AB04.jpg1683182747283' },
//     { id: "644ba73f664a8178632294cc", name: "Tony", picture: 'https://s3-us-west-2.amazonaws.com/washzone-23/uploads%2F20A5224D-592B-4F17-B961-60552A25AB04.jpg1683182747283' },
//     { id: "644ba73f664a8178632294cc", name: "Mike", picture: 'https://s3-us-west-2.amazonaws.com/washzone-23/uploads%2F20A5224D-592B-4F17-B961-60552A25AB04.jpg1683182747283' },
//     { id: "644ba73f664a8178632294cc", name: "Grey", picture: 'https://s3-us-west-2.amazonaws.com/washzone-23/uploads%2F20A5224D-592B-4F17-B961-60552A25AB04.jpg1683182747283' },
// ]

export const SuggestionItem = ({ portalized, keyword, onSuggestionPress, containerStyle }) => {
    console.log("keyword : ", keyword)
    if (keyword === undefined) {
        return null
    }

    const { searchUsers } = useHooks()
    const [suggestions, setSuggestions] = useState([])

    const syncSuggesstions = async (s) => {
        const res = await searchUsers(s)
        setSuggestions(
            res.map((i) => {
                return { ...i, id: i?._id }
            }),
        )
    }

    useEffect(() => {
        syncSuggesstions(keyword)
    }, [keyword])


    return (
        portalized ?
            <Portal>
                <ScrollView style={[$defaultSuggestionContainerStyle, containerStyle]}>
                    {suggestions
                        .filter((one) => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
                        .map((one) => (
                            <TouchableOpacity
                                key={one.id}
                                onPress={() => onSuggestionPress(one)}
                                style={{ padding: 12, flexDirection: "row", alignItems: "center", height: 44 }}
                            >
                                <FastImage source={{ uri: one?.picture }} style={$picture} />
                                <Text
                                    text={one.name}
                                    weight="semiBold"
                                    style={{ marginHorizontal: spacing.extraSmall }}
                                />
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </Portal> : <ScrollView style={[$defaultSuggestionContainerStyle, containerStyle]}>
                {suggestions
                    .filter((one) => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
                    .map((one) => (
                        <TouchableOpacity
                            key={one.id}
                            onPress={() => onSuggestionPress(one)}
                            style={{ padding: 12, flexDirection: "row", alignItems: "center", height: 44 }}
                        >
                            <FastImage source={{ uri: one?.picture }} style={$picture} />
                            <Text
                                text={one.name}
                                weight="semiBold"
                                style={{ marginHorizontal: spacing.extraSmall }}
                            />
                        </TouchableOpacity>
                    ))}
            </ScrollView>
    )
}

export const TagInput = (
    props: MentionInputProps & {
        additionalPartTypes?: PartType
        suggestionsContainerStyle?: ViewStyle,
        portalized?: boolean
    },
) => {
    return (
        <MentionInput
            partTypes={[
                {
                    trigger: "@",
                    renderSuggestions: ({ keyword, onSuggestionPress }) => (
                        <SuggestionItem
                            portalized={props.portalized}
                            containerStyle={props.suggestionsContainerStyle}
                            keyword={keyword}
                            onSuggestionPress={onSuggestionPress}
                        />
                    ),
                    textStyle: { fontWeight: "bold", color: colors.palette.primary100 }, // The mention style in the input
                    isBottomMentionSuggestionsRender: false,
                    isInsertSpaceAfterMention: true,
                    ...props.additionalPartTypes,
                },
            ]}
            {...props}
        />
    )
}

const $defaultSuggestionContainerStyle: ViewStyle = {
    position: "absolute",
    backgroundColor: colors.palette.neutral200,
    maxHeight: 44 * 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 99999,
}

const $picture: ImageStyle = {
    height: 30,
    width: 30,
    borderRadius: 15,
}
