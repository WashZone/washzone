import React, { useEffect, useState, useCallback, useRef, FC } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native"
import { Text, Button } from "../../components"

import InCallManager from "react-native-incall-manager"
import Modal from "react-native-modal"

import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from "react-native-webrtc"
import { AppStackScreenProps, goBack, navigationRef } from "../../navigators"
import { observer } from "mobx-react-lite"
import { CallTypes, useHooks } from "../hooks"
import { colors, spacing } from "../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { $contentCenter, $flexRow, $scaleFull } from "../styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Actions } from "./partials"
import { Ring } from "./partials/RInger"
import { IncomingCallHook } from "../../utils/incomingCall"

const STUN_SERVER = "stun:stun.l.google.com:19302"
const TURN_SERVER = "turn:18.219.176.209:3478?transport=tcp"

export const AudioCall: FC<AppStackScreenProps<"AudioCall">> = observer(function CallScreen(props) {
  const { receiver, offer, answer, role, roomId, cancelled } = props.route.params
  const { endAllCall } = IncomingCallHook()
  const { sendSilentAlert } = useHooks()
  const [testOffer, setTestOffer] = useState("")
  const [mute, setMute] = useState(false)
  const [speaker, setSpeaker] = useState(false)
  const [status, setStatus] = useState<CallStatus>(CallStatus.processing)
  const [localStream, setLocalStream] = useState<any>({ toURL: () => null })
  const [remoteStream, setRemoteStream] = useState<any>({ toURL: () => null })
  const safeArea = useSafeAreaInsets()
  console.log("OFFER FROM ", receiver, offer)

  useEffect(() => {
    if (offer) {
      setTestOffer(offer)
      // setTimeout(() => handleOffer(), 300)
    }
  }, [offer])

  useEffect(() => {
    console.log("GOT AN ANSWER FROM PARAMS", "UPDATED PARAMS", props.route.params)
    console.log("GOT AN TEST ANSWER", "UPDATED PARAMS", props.route.params)
    answer && handleAnswer()
  }, [answer])

  // Fetching Receiver From Incoming Call Author's ID
  useEffect(() => {
    // InCallManager.start({ media: mode })

    if (role === Role.receiver) {
      setStatus(CallStatus.ringing)
    }
    const handleInit = async () => {
      setTimeout(
        () =>
          role === Role.initiator &&
          Alert.alert(
            "Call " + receiver?.name + " ?",
            "Are you sure you want to initiate a call?",
            [
              { text: "Yes", onPress: onCall, style: "default" },
              { text: "No", onPress: handleLeave, style: "destructive" },
            ],
            { cancelable: false },
          ),
        1000,
      )
    }
    registerPeerEvents()
    initLocalVideo()

    handleInit()
    return () => {
      setStatus(CallStatus.processing)
    }
  }, [])

  useEffect(() => {
    console.log(":MUTING", status)
    console.log(":localStream", localStream)
    if (localStream && status !== CallStatus.processing) {
      if (localStream?.getTracks) localStream.getTracks()[0].enabled = !mute
    }
  }, [mute, status])

  useEffect(() => {
    InCallManager.start()
    // InCallManager.setKeepScreenOn(true)
    InCallManager.setSpeakerphoneOn(speaker)
    return () => {
      InCallManager.stop()
    }
  }, [])

  useEffect(() => {
    status !== CallStatus.processing && InCallManager.setForceSpeakerphoneOn(speaker)
  }, [speaker, status])

  const hangUp = async () => {
    await sendSilentAlert(receiver?.notificationToken, CallTypes.hangup, roomId, {
      offer: "",
      answer: "",
    })
    setStatus(CallStatus.cancelled)
  }

  // Defioning RTCConnection
  const yourConn = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: STUN_SERVER,
        },
      ],
    }),
  )

  const [callActive, setCallActive] = useState(false)
  const [incomingCall, setIncomingCall] = useState(false)
  const [otherId, setOtherId] = useState("")
  const connectedUser = useRef(null)
  const offerRef = useRef(null)

  useEffect(() => {
    cancelled && handleLeave()
  }, [cancelled])

  const registerPeerEvents = () => {
    yourConn.current.onaddstream = (event) => {
      console.log("On Add Remote Stream")
      setRemoteStream(event.stream)
    }
    yourConn.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("event.candidate", event.candidate)
      }
    }
  }

  const initLocalVideo = () => {
    mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream) => {
        setLocalStream(stream)
        yourConn.current.addStream(stream)
      })
      .catch((error) => {
        Alert.alert(JSON.stringify(error))
        handleLeave()
        navigationRef.goBack()
      })
  }

  const onCall = () => {
    sendCall(true)
    setTimeout(() => {
      sendCall(false)
      setStatus(CallStatus.ringing)
    }, 500)
  }

  const sendCall = (setter: boolean) => {
    const otherUser = receiver?.name
    connectedUser.current = otherUser
    console.log("Calling to", otherUser)
    // create an offer
    yourConn.current.createOffer().then((offer) => {
      yourConn.current.setLocalDescription(offer).then(() => {
        console.log("Sending Ofer")
        console.log("OFFER", JSON.stringify(offer))
        setTestOffer(JSON.stringify(offer))
        sendSilentAlert(
          receiver?.notificationToken,
          CallTypes.audioOffer,
          roomId,
          {
            offer: JSON.stringify(offer),
          },
          setter,
        )
      })
    })
  }

  // when somebody sends us an offer
  const handleOffer = async () => {
    console.log("TEST OFFER", testOffer)
    console.log(receiver?.name + " is calling you.")
    connectedUser.current = receiver?.name
    offerRef.current = { name: receiver?.name, offer: testOffer }
    setIncomingCall(true)
    setOtherId(receiver?.name)
  }

  const acceptCall = async () => {
    const name = offerRef.current.name
    const offer = JSON.parse(testOffer)
    setIncomingCall(false)
    setCallActive(true)
    console.log("Accepting CALL", name, offer)
    yourConn.current
      .setRemoteDescription(offer)
      .then(function () {
        connectedUser.current = name
        return yourConn.current.createAnswer()
      })
      .then(function (answer) {
        console.log("ANSWER", JSON.stringify(answer))
        yourConn.current.setLocalDescription(answer)
        setStatus(CallStatus.connected)
        sendSilentAlert(
          receiver?.notificationToken,
          CallTypes.answer,
          roomId,
          {
            answer: JSON.stringify(answer),
          },
          false,
        )
      })
  }

  // when we got an answer from a remote user
  const handleAnswer = () => {
    console.log("handleAnswer:handleAnswer", answer)
    setCallActive(true)
    yourConn.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))
    setStatus(CallStatus.connected)
  }

  const handleLeave = () => {
    // InCallManager.stop({ media: mode })
    // navigationRef.setParams({ answer: null, offer: null })
    setIncomingCall(false)
    setCallActive(false)
    offerRef.current = null
    connectedUser.current = null
    connectedUser.current = null
    yourConn.current.onicecandidate = null
    yourConn.current.ontrack = null
    yourConn.current.close()
    resetPeer()
    // initLocalVideo()
    endAllCall()
    if (localStream) {
      if (localStream?.getTracks) {
        localStream.getTracks().forEach((t) => t.stop())
        localStream.release()
      }
    }
    setTimeout(() => goBack(), 500)
  }

  const resetPeer = () => {
    yourConn.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: STUN_SERVER,
        },
      ],
    })

    registerPeerEvents()
    // Setup ice handling
  }

  /**
   * Calling Stuff Ends
   */

  return (
    <ScrollView style={styles.root}>
      <View style={$localVideoContainer}>
        <ImageBackground
          source={{ uri: receiver?.picture }}
          style={[$scaleFull, $contentCenter]}
          resizeMode="cover"
          blurRadius={20}
        >
          {status !== CallStatus.connected && (
            <>
              <Ring delay={0} />
              <Ring delay={1000} />
              <Ring delay={2000} />
              <Ring delay={3000} />
            </>
          )}
          <FastImage source={{ uri: receiver?.picture }} style={$receiverProfilePicture} />
        </ImageBackground>
        <Text text={status} />
      </View>
      <Actions
        onHangUp={() => {
          hangUp()
          handleLeave()
        }}
        role={role}
        status={status}
        acceptCall={handleOffer}
        setMute={setMute}
        setSpeaker={setSpeaker}
        mute={mute}
        speaker={speaker}
      />

      <Modal isVisible={incomingCall && !callActive}>
        <View
          style={{
            backgroundColor: "white",
            padding: 22,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text
            text={"Incoming " + "audio" + " call !"}
            weight="medium"
            style={{ marginBottom: spacing.small, textAlign: "center" }}
          />
          <Text text={otherId} weight="semiBold" style={{ textAlign: "center" }} size="lg" />
          <View style={[$flexRow, { marginTop: spacing.medium }]}>
            <Button
              onPress={() => {
                handleLeave()
                hangUp()
              }}
              text={"Reject"}
              style={{
                marginHorizontal: spacing.small,
                paddingVertical: spacing.small,
                paddingHorizontal: spacing.medium,
                backgroundColor: colors.palette.angry500,
              }}
              preset="reversed"
            />
            <Button
              onPress={() => setTimeout(() => acceptCall(), 500)}
              text={"Accept"}
              style={{
                marginHorizontal: spacing.small,
                paddingVertical: spacing.small,
                paddingHorizontal: spacing.medium,
                backgroundColor: colors.palette.success100,
              }}
              preset="reversed"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
})

export default AudioCall

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: "column",
  },
  videoContainer: {
    flex: 1,
    minHeight: 450,
  },
  videos: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 6,
  },
  localVideos: {
    height: 100,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 400,
  },
  localVideo: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "100%",
  },
  remoteVideo: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "100%",
  },
})

export enum CallStatus {
  connecting = "Connecting",
  ringing = "Ringing",
  connected = "Connected",
  cancelled = "Cancelled",
  processing = "processing",
}

export enum Role {
  receiver = "receiver",
  initiator = "initiator",
  connected = "connected",
}

const $statusText: TextStyle = {
  position: "absolute",
  bottom: 150,
  textAlign: "center",
  color: "#fff",
  alignSelf: "center",
}

const $receiverProfilePicture: ImageStyle = {
  height: 100,
  width: 100,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: colors.separator,
}

const $localVideo: ViewStyle = {
  height: 200,
  width: 140,
  backgroundColor: colors.palette.glow100,
  position: "absolute",
  left: 10,
  borderRadius: 10,
}

const $localVideoContainer: ViewStyle = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
  backgroundColor: "green",
}
