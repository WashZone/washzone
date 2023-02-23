import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, ViewStyle } from "react-native"
import { debounce } from "lodash"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { BottomModal, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
import { useHooks } from "../../hooks"
import { ActivityIndicator } from "react-native-paper"
import { ResultComponent } from "./ResultComponent"

export const AddMessageModal = ({ isVisible, setVisible }) => {
  const { searchUser } = useHooks()
  const [searchResults, setSearchResults] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [loading, setLoading] = useState(false)
  console.log(searchResults)
  const handleSearch = useCallback(
    debounce(async (text: string) => {
      if (text.length > 0) {
        setLoading(true)
        const res = await searchUser(text)
        setSearchResults(res)
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

  return (
    <BottomModal propagateSwipe isVisible={isVisible} setVisible={setVisible}>
      <View style={$contentContainer}>
        <TextField
          value={searchKey}
          onChangeText={onChangeText}
          style={{ color: colors.palette.neutral100 }}
          placeholder="Search User"
          RightAccessory={() =>
            loading && (
              <ActivityIndicator animating color={colors.palette.neutral100} size="small" />
            )
          }
        />
        <KeyboardAwareScrollView
          scrollEnabled
          style={$scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {searchResults.map((result, index) => (
            <ResultComponent key={index} data={result} setVisible={setVisible}/>
          ))}
        </KeyboardAwareScrollView>
      </View>
    </BottomModal>
  )
}

const $scrollContainer: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  height: 600,
  width: "100%",
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.large,
}
