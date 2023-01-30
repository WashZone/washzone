import React, { useState } from "react"
import { ViewStyle, View, ActivityIndicator, TextStyle } from "react-native"
import { Text, Screen, Button } from "../../components"
import Modal from "react-native-modal"
import { colors, spacing } from "../../theme"
import { TextInput } from "react-native-paper"
import { useHooks } from "../hooks"

export const InputPlaylistInfoModal = ({
  isVisible,
  setModalVisible,
  syncAllPlaylists,
}: {
  isVisible: boolean
  setModalVisible: (b: boolean) => void
  syncAllPlaylists: () => void
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string>("")
  const { createEmptyPlaylist } = useHooks()

  const createPlaylist = async () => {
    if (title.length < 4) {
      setError("Invalid Title!")
      return
    }
    setError("")
    setButtonLoading(true)
    await createEmptyPlaylist(title)

    syncAllPlaylists()
    setModalVisible(false)
    setButtonLoading(false)
  }

  const closeModal = () => !buttonLoading && setModalVisible(false)

  return (
    <Modal
      backdropColor="#000"
      isVisible={isVisible}
      swipeDirection={!buttonLoading && ["down"]}
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      coverScreen
    >
      <Screen backgroundColor={colors.transparent} contentContainerStyle={$parentContainer}>
        <View style={$contentContainer}>
          <Text text={"Create Playlist"} style={$headerTitle} weight="semiBold" />
          <TextInput mode="outlined" label={"Title"} value={title} onChangeText={setTitle} />
          <Text text={error} style={$errorText} weight="medium" />
          <Button
            onPress={createPlaylist}
            disabled={buttonLoading}
            style={[$submitButton, { backgroundColor: colors.palette.primary100 }]}
          >
            {buttonLoading ? (
              <ActivityIndicator
                animating={buttonLoading}
                size={20}
                color={colors.palette.neutral100}
              />
            ) : (
              <Text tx="common.add" style={$submitText} weight="semiBold" />
            )}
          </Button>
        </View>
      </Screen>
    </Modal>
  )
}

const $headerTitle: TextStyle = {
  color: colors.palette.primary100,
}

const $errorText: TextStyle = {
  color: colors.palette.angry500,
}

const $parentContainer: ViewStyle = { justifyContent: "center", flex: 1 }

const $submitText: TextStyle = {
  fontSize: 18,
  color: colors.palette.neutral100,
}

const $submitButton: ViewStyle = {
  height: 45,
  width: "100%",
  alignSelf: "center",
  marginTop: spacing.small,
  alignContent: "center",
  padding: 0,
  margin: 0,
}

const $contentContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: spacing.medium,
  borderRadius: 10,
}
