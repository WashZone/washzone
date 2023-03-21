import React, { FC, useCallback, useState } from "react"
import { SectionList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextInput } from "react-native-paper"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { debounce } from "lodash"

import { Button, Header, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackParamList, AppStackScreenProps } from "../../navigators"
import { $flex1, $justifyCenter } from "../styles"
import { useHooks } from "../hooks"
import { useStores } from "../../models"
import {
  ClassifiedsTabParamList,
  HomeTabParamList,
  TopicsTabParamList,
  VideosTabParamList,
} from "../../tabs"
import { formatName } from "../../utils/formatName"

export const Search: FC<AppStackScreenProps<"Search">> = observer(function Search() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const navigationTopics = useNavigation<NavigationProp<TopicsTabParamList>>()
  const navigationClassifieds = useNavigation<NavigationProp<ClassifiedsTabParamList>>()
  const navigationHome = useNavigation<NavigationProp<HomeTabParamList>>()
  const navigationVideos = useNavigation<NavigationProp<VideosTabParamList>>()
  const [searchKey, setSearchKey] = useState("")
  const [loading, setLoading] = useState(false)

  const { searchKeyword } = useHooks()
  const {
    searchStore: { searchResults, setResults },
  } = useStores()

  const onSearch = async () => {
    if (searchKey.length > 2) {
      setLoading(true)
      await searchKeyword(searchKey)
      setLoading(false)
    }
  }

  const handleSearch = useCallback(
    debounce(async (text: string) => {
      if (text.length > 1) {
        setLoading(true)
        await searchKeyword(text)
        setLoading(false)
      }
    }, 600),
    [],
  )

  const onChangeText = (text: string) => {
    if (text.length > 0) {
      handleSearch(text)
    }
    setSearchKey(text)
  }

  const sections = [
    {
      title: "Topics",
      data: searchResults.topics,
      renderItem: ({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
            navigationTopics.navigate("TopicInfo", { topic: item?._id })
          }}
          style={$resultContainer}
        >
          <Text
            text={item?.topicContent}
            style={$resultText}
            numberOfLines={1}
            ellipsizeMode="tail"
            weight="semiBold"
          />
        </TouchableOpacity>
      ),
    },
    {
      title: "Classifieds",
      data: searchResults.classifieds,
      renderItem: ({ item }) => (
        <TouchableOpacity
          style={$resultContainer}
          onPress={() =>
            navigationClassifieds.navigate("ClassifiedsDetails", { classified: item?._id })
          }
        >
          <Text
            text={item?.title}
            weight="semiBold"
            style={$resultText}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </TouchableOpacity>
      ),
    },
    {
      title: "Users",
      data: searchResults.users,
      renderItem: ({ item }) => (
        <TouchableOpacity
          onPress={() => navigationHome.navigate("Profile", { user: item })}
          style={$resultContainer}
        >
          <Text
            text={formatName(item?.name)}
            weight="semiBold"
            style={$resultText}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </TouchableOpacity>
      ),
    },
    {
      title: "Videos",
      data: searchResults.videos,
      renderItem: ({ item }) => (
        <TouchableOpacity
          onPress={() => navigationVideos.navigate("VideoDetails", { data: item })}
          style={$resultContainer}
        >
          <Text
            text={item?.videoHeading}
            weight="semiBold"
            style={$resultText}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </TouchableOpacity>
      ),
    },
  ]

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        leftIcon="caretLeft"
        title="Search"
        titleStyle={$titleStyle}
        onLeftPress={() => navigation.goBack()}
        leftIconColor={colors.palette.neutral600}
      />
      <View style={$content}>
        <View style={$justifyCenter}>
          <TextInput
            mode="outlined"
            theme={$theme}
            label="Search..."
            value={searchKey}
            onChangeText={onChangeText}
            contentStyle={$inputContent}
            onSubmitEditing={onSearch}
          />
          <Icon
            onPress={onSearch}
            icon="search"
            size={24}
            color={colors.palette.primary100}
            containerStyle={$searchIcon}
          />
        </View>
        <View style={$flex1}>
          {loading ? (
            <ActivityIndicator color={colors.palette.primary100} style={$loader} animating />
          ) : (
            <SectionList
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({ section }) =>
                section.data.length > 0 && (
                  <Text weight="bold" size="md" text={section.title} style={$sectionHeader} />
                )
              }
              stickySectionHeadersEnabled
              sections={sections}
              ListEmptyComponent={
                <View style={$resultContainer}>
                  <Text text="None Found" />
                </View>
              }
            />
          )}
          <Button
            text="Clear"
            style={$resetButton}
            textStyle={$resetText}
            onPress={() => {
              setSearchKey('')
              setResults({ classifieds: [], users: [], topics: [], videos: [] })
            }}
          />
        </View>
      </View>
    </Screen>
  )
})

const $resetText: TextStyle = {
  color: colors.palette.neutral100,
}

const $resetButton: ViewStyle = {
  position: "absolute",
  right: 0,
  top: spacing.extraSmall,
  padding: spacing.micro,
  backgroundColor: colors.palette.primary100,
}

const $resultText: TextStyle = {
  color: colors.palette.primary100,
  fontSize: 13,
}

const $sectionHeader: TextStyle = { lineHeight: 40, backgroundColor: colors.backgroundGrey }

const $resultContainer: ViewStyle = {
  marginVertical: 0.5,
  borderRadius: 6,
  backgroundColor: colors.palette.primaryOverlay15,
  padding: spacing.extraSmall,
}

const $loader: ViewStyle = { marginTop: spacing.massive }

const $inputContent: ViewStyle = {
  marginRight: spacing.large,
}

const $searchIcon: ViewStyle = {
  position: "absolute",
  right: 10,
}

const $theme = {
  colors: {
    primary: colors.palette.primary100,
    border: "red",
    secondary: colors.palette.primary100,
  },
}

const $titleStyle: TextStyle = {
  color: colors.palette.primary100,
  textAlign: "center",
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  marginHorizontal: spacing.extraLarge,
  marginVertical: spacing.medium,
  flex: 1,
}
