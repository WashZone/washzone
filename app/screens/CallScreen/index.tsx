import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState, useCallback, useRef, useMemo } from "react"
import { AppStackScreenProps } from "../../navigators"
import { Screen, Button, Text } from "../../components"
import { Actions } from "./partials"
import { $contentCenter, $flex1, $scaleFull } from "../styles"
import {
  TouchableOpacity,
  ViewStyle,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TextStyle,
} from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native-paper"
import InCallManager from "react-native-incall-manager"
import Sound from "react-native-sound"
import Modal from "react-native-modal"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc"
import { colors } from "../../theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { Ring } from "./partials/RInger"

const STUN_SERVER = "stun:stun.l.google.com:19302"

export enum CallStatus {
  connecting = "Connecting",
  ringing = "Ringing",
  connected = "Connected",
}

export enum Role {
  receiver = "receiver",
  initiator = "initiator",
  connected = "connected",
}

export const CallScreen: FC<AppStackScreenProps<"CallScreen">> = observer(function CallScreen(
  props,
) {
  const navigation = useNavigation()
  const { receiver, mode, role } = props.route.params
  console.log("RECEIVER IN CALL", receiver)
  const onHangUp = () => navigation.goBack()
  const [userId, setUserId] = useState("")
  const [testOffer, setTestOffer] = useState("")
  const [testAnswer, setTestAnswer] = useState("")
  const [socketActive, setSocketActive] = useState(false)
  const [calling, setCalling] = useState(false)
  const [status, setStatus] = useState(CallStatus.connecting)
  const [localStream, setLocalStream] = useState({ toURL: () => null })
  const [remoteStream, setRemoteStream] = useState({ toURL: () => null })
  const focus = useIsFocused()
  // const conn = useRef(new WebSocket(SOCKET_URL));
 

  var soundConnecting = useMemo(() => new Sound("connecting.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("failed to load the sound", error)
      return
    }
    soundConnecting.setNumberOfLoops(10).play()
    setTimeout(() => setStatus(CallStatus.ringing), 1000)
  }), [])
  useEffect(() => {
    if (!focus) {
      soundConnecting.release()
    }
  }, [focus])

  useEffect(() => {
    // if (status === CallStatus.connecting) {
    //   soundConnecting
    //     .play((success) => {
    //       if (success) {
    //         console.log("successfully finished playing")
    //       } else {
    //         console.log("playback failed due to audio decoding errors")
    //       }
    //     })
    //     .setNumberOfLoops(100)
    // }
    console.log("STATUS ")
    if (status === CallStatus.ringing) {
      soundConnecting.stop()
      console.log("PLAYING")
    }
    if (status === CallStatus.connected) {
      // soundRinging.stop()
    }
  }, [status, focus])

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
  const [callToUsername, setCallToUsername] = useState("")
  const connectedUser = useRef(null)
  const offerRef = useRef(null)

  /**
   * Calling Stuff
   */

  useEffect(() => {
    if (socketActive && userId.length > 0) {
      try {
        // InCallManager.start({media: 'audio'});
        // InCallManager.setForceSpeakerphoneOn(true);
        // InCallManager.setSpeakerphoneOn(true);
      } catch (err) {
        console.log("InApp Caller ---------------------->", err)
      }

      send({
        type: "login",
        name: userId,
      })
    }
  }, [socketActive, userId])

  const onLogin = () => {}

  useEffect(() => {
    /**
     *
     * Sockets Signalling
     */
    // conn.current.onopen = () => {
    //   console.log('Connected to the signaling server');
    //   setSocketActive(true);
    // };
    // //when we got a message from a signaling server
    // conn.current.onmessage = msg => {
    //   const data = JSON.parse(msg.data);
    //   // console.log('Data --------------------->', data);
    //   switch (data.type) {
    //     case 'login':
    //       console.log('Login');
    //       break;
    //     //when somebody wants to call us
    //     case 'offer':
    //       handleOffer(data.offer, data.name);
    //       console.log('Offer');
    //       break;
    //     case 'answer':
    //       handleAnswer(data.answer);
    //       console.log('Answer');
    //       break;
    //     //when a remote peer sends an ice candidate to us
    //     case 'candidate':
    //       handleCandidate(data.candidate);
    //       console.log('Candidate');
    //       break;
    //     case 'leave':
    //       handleLeave();
    //       console.log('Leave');
    //       break;
    //     default:
    //       break;
    //   }
    // };
    // conn.current.onerror = function(err) {
    //   console.log('Got error', err);
    // };
    initLocalVideo()
    registerPeerEvents()
  }, [])

  useEffect(() => {
    if (!callActive) {
      // InCallManager.stop();
    } else {
      // InCallManager.setSpeakerphoneOn(true);
    }
  }, [callActive])

  const registerPeerEvents = () => {
    yourConn.current.onaddstream = (event) => {
      console.log("On Add Remote Stream")
      setRemoteStream(event.stream)
    }

    // Setup ice handling
    yourConn.current.onicecandidate = (event) => {
      if (event.candidate) {
        send({
          type: "candidate",
          candidate: event.candidate,
        })
      }
    }
  }

  const initLocalVideo = () => {
    // let isFront = false;
    // mediaDevices.enumerateDevices().then(sourceInfos => {
    //   let videoSourceId;
    //   for (let i = 0; i < sourceInfos.length; i++) {
    //     const sourceInfo = sourceInfos[i];
    //     if (
    //       sourceInfo.kind == 'videoinput' &&
    //       sourceInfo.facing == (isFront ? 'front' : 'environment')
    //     ) {
    //       videoSourceId = sourceInfo.deviceId;
    //     }
    //   }
    mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: Dimensions.get("window").width, // Provide your own width, height and frame rate here
            minHeight: Dimensions.get("window").height,
            minFrameRate: 30,
          },
          facingMode: "user",
          // optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      })
      .then((stream) => {
        // Got stream!
        setLocalStream(stream)

        // setup stream listening
        yourConn.current.addStream(stream)
      })
      .catch((error) => {
        // Log error
      })
    // });
  }

  const send = (message) => {
    //attach the other peer username to our messages
    if (connectedUser.current) {
      message.name = connectedUser.current
      // console.log('Connected iser in end----------', message);
    }
    console.log("Message", message)
    // conn.current.send(JSON.stringify(message));
  }

  const onCall = () => {
    sendCall(callToUsername)
    setTimeout(() => {
      sendCall(callToUsername)
    }, 1000)
  }

  const sendCall = (receiverId) => {
    // setCalling(true);
    const otherUser = receiverId
    connectedUser.current = otherUser
    console.log("Caling to", otherUser)
    // create an offer
    yourConn.current.createOffer().then((offer) => {
      yourConn.current.setLocalDescription(offer).then(() => {
        console.log("Sending Ofer")
        console.log("OFFER", JSON.stringify(offer))
        setTestOffer(JSON.stringify(offer))
        // send({
        //   type: 'offer',
        //   offer: offer,
        // });
        // testOffer={
        //     type: 'offer',
        //     offer: offer,
        //   }
        // Send pc.localDescription to peer
      })
    })
  }

  //when somebody sends us an offer
  const handleOffer = async () => {
    console.log("TEST OFFER", testOffer)
    let name = "J"
    console.log(name + " is calling you.")
    connectedUser.current = name
    offerRef.current = { name, offer: testOffer }
    setIncomingCall(true)
    setOtherId(name)
    // acceptCall();
    if (callActive) acceptCall()
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
        setTestAnswer(answer)
        // send({
        //   type: 'answer',
        //   answer: answer,
        // });
      })
      .then(function () {
        // Send the answer to the remote peer using the signaling server
      })
      .catch((err) => {
        console.log("Error acessing camera", err)
      })

    // try {
    //   await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

    //   const answer = await yourConn.createAnswer();

    //   await yourConn.setLocalDescription(answer);
    //   send({
    //     type: 'answer',
    //     answer: answer,
    //   });
    // } catch (err) {
    //   console.log('Offerr Error', err);
    // }
  }

  //when we got an answer from a remote user
  const handleAnswer = () => {
    console.log("TEST ANSWER", testAnswer)
    setCalling(false)
    setCallActive(true)
    yourConn.current.setRemoteDescription(JSON.parse(testAnswer))
  }

  //when we got an ice candidate from a remote user
  const handleCandidate = (candidate) => {
    setCalling(false)
    // console.log('Candidate ----------------->', candidate);
    yourConn.current.addIceCandidate(new RTCIceCandidate(candidate))
  }

  //hang up
  // const hangUp = () => {
  //   send({
  //     type: 'leave',
  //   });

  //   handleLeave();
  // };

  // const handleLeave = () => {
  //   connectedUser.current = null;
  //   setRemoteStream({toURL: () => null});

  //   // yourConn.close();
  //   // yourConn.onicecandidate = null;
  //   // yourConn.onaddstream = null;
  // };

  const rejectCall = async () => {
    send({
      type: "leave",
    })
    // ``;
    // setOffer(null);

    // handleLeave();
  }

  const handleLeave = () => {
    send({
      name: userId,
      otherName: otherId,
      type: "leave",
    })

    setCalling(false)
    setIncomingCall(false)
    setCallActive(false)
    offerRef.current = null
    connectedUser.current = null
    setRemoteStream(null)
    setLocalStream(null)
    yourConn.current.onicecandidate = null
    yourConn.current.ontrack = null

    resetPeer()
    initLocalVideo()
    // console.log("Onleave");
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
  }

  const safeArea = useSafeAreaInsets()

  return (
    <Screen contentContainerStyle={$flex1}>
      <ScrollView style={styles.root}>
        <View style={styles.inputField}>
          <TextInput
            label="Enter Friends Id"
            mode="outlined"
            style={{ marginBottom: 7 }}
            onChangeText={(text) => setCallToUsername(text)}
          />
          <TextInput
            label="Test OFFER"
            mode="outlined"
            style={{ marginBottom: 7 }}
            onChangeText={(text) => setTestOffer(text)}
            value={testOffer}
          />
          <TextInput
            label="Test ANSWER"
            mode="outlined"
            style={{ marginBottom: 7 }}
            onChangeText={(text) => setTestAnswer(text)}
            value={testAnswer}
          />
          <Button text="Call" onPress={onCall} disabled={callToUsername === "" || callActive} />
          <Button onPress={handleLeave} disabled={!callActive} text="End Call" />
          <Button onPress={handleOffer} text="Handle Test Offer" />
          <Button onPress={handleAnswer} text="Handle Test Answer" />
        </View>
        <View style={styles.videoContainer}></View>
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
            <Text>{otherId + " is calling you"}</Text>
            <Button text="Accept Call" onPress={acceptCall} />
            <Button text="Reject Call" onPress={handleLeave} />
          </View>
        </Modal>
      </ScrollView>
      <View style={$localVideoContainer}>
        {callActive ? (
          <RTCView streamURL={remoteStream ? remoteStream.toURL() : ""} style={$scaleFull} />
        ) : (
          <ImageBackground
            source={{ uri: receiver.picture }}
            style={[$scaleFull, $contentCenter]}
            resizeMode="cover"
            blurRadius={20}
          >
            <Ring delay={0} />
            <Ring delay={1000} />
            <Ring delay={2000} />
            <Ring delay={3000} />
            <FastImage source={{ uri: receiver.picture }} style={$receiverProfilePicture} />
          </ImageBackground>
        )}
        {mode === "video" && (
          <RTCView
            streamURL={localStream ? localStream.toURL() : ""}
            style={[$localVideo, { marginTop: safeArea.top }]}
            objectFit="cover"
          />
        )}
      </View>
      {status !== CallStatus.connected && (
        <Text text={status} style={$statusText} weight="semiBold" />
      )}
      <Actions onHangUp={onHangUp} role={role} status={status} />
    </Screen>
  )
})

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

const $localVideoContainer: ViewStyle = { height: "100%", width: "100%", position: "absolute" }

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
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
