import React from "react"
import {  View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { spacing } from "../../theme"
import { $contentCenter } from "../styles"

const EmptyTabPresets = {
    emptyPosts: {
        heading: "emptyStateComponent.emptyPosts.heading",
        content: "emptyStateComponent.emptyPosts.content",
        button: "emptyStateComponent.emptyPosts.button",
    },
    emptyDiscussions: {

        heading: "emptyStateComponent.emptyDiscussions.heading",
        content: "emptyStateComponent.emptyDiscussions.content",
        button: "emptyStateComponent.emptyDiscussions.button",
    },
    emptyClassifieds: {
        heading: "emptyStateComponent.emptyClassifieds.heading",
        content: "emptyStateComponent.emptyClassifieds.content",
        button: "emptyStateComponent.emptyClassifieds.button",
    },
    emptyGallery: {
        heading: "emptyStateComponent.emptyGallery.heading",
        content: "emptyStateComponent.emptyGallery.content",
        button: "emptyStateComponent.emptyGallery.button",
    },
} as const

export const EmptyTabState = ({
    preset,
}: {

    preset?: keyof typeof EmptyTabPresets
}) => {
    return (
        <View style={$container}>
            <Text tx={EmptyTabPresets[preset].heading} weight='medium' />
            <Text tx={EmptyTabPresets[preset].content} />
        </View>
    )
}

const $container: ViewStyle = {
    width: "100%",
    marginTop:spacing.huge,
    ...$contentCenter
}
