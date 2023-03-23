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

import { useFocusEffect, useNavigation } from "@react-navigation/native"

import InCallManager from "react-native-incall-manager"
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
import { AppStackScreenProps, goBack, navigationRef } from "../../navigators"
import { observer } from "mobx-react-lite"
import { useHooks } from "../hooks"
import { colors, spacing } from "../../theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { $contentCenter, $flexRow, $scaleFull } from "../styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Actions, CallInititateModal } from "./partials"
import { Ring } from "./partials/RInger"
// import {acc} from 'react-native-reanimated';

const STUN_SERVER = "stun:stun.l.google.com:19302"

// let testOffer = {}
// let testAnswer = {}

export const CallScreen: FC<AppStackScreenProps<"CallScreen">> = observer(function CallScreen(
  props,
) {
  const { receiverId, offer, answer, role, roomId, mode, cancelled } = props.route.params
  const [receiver, setReceiver] = useState<any>({})
  const { getUserById, sendCallOffer, acceptCallOffer, hangUpCall } = useHooks()
  const [userId, setUserId] = useState("")
  const [testOffer, setTestOffer] = useState("")
  const [mute, setMute] = useState(false)
  const [speaker, setSpeaker] = useState(true)
  const [testAnswer, setTestAnswer] = useState("")
  const [socketActive, setSocketActive] = useState(false)
  const [calling, setCalling] = useState(false)
  const [isInitiateVisible, setInitiateVisible] = useState(false)
  const [status, setStatus] = useState<CallStatus>(CallStatus.processing)
  const [localStream, setLocalStream] = useState({ toURL: () => null })
  const [remoteStream, setRemoteStream] = useState({ toURL: () => null })

  const safeArea = useSafeAreaInsets()
  console.log("OFFER FROM ", receiver?.name, offer)
  

  useEffect(() => {
    offer && setTestOffer(offer)
  }, [offer])

  useEffect(() => {
    console.log("GOT AN ANSWER FROM PARAMS", "UPDATED PARAMS", props.route.params)
    console.log("GOT AN TEST ANSWER", "UPDATED PARAMS", props.route.params)
    answer && setTestAnswer(answer)
    answer && handleAnswer()
  }, [answer])

  // Fetching Receiver From Incoming Call Author's ID
  useEffect(() => {
    InCallManager.start({ media: mode })

    if (role === Role.receiver) {
      // InCallManager.startRingtone("_BUNDLE_")
      setStatus(CallStatus.ringing)
    }
    const fetchReceiver = async () => {
      const res = await getUserById(receiverId)
      setReceiver(res)
      // role === Role.initiator &&
      setTimeout(
        () =>
          role === Role.initiator &&
          Alert.alert(
            // This is title
            "Call " + res?.name + " ?",
            // This is body text
            "Are you sure you want to initiate a call?",
            [
              { text: "Yes", onPress: onCall },
              { text: "No", onPress: handleLeave },
            ],
            { cancelable: false },
            // on clicking out side, Alert will not dismiss
          ),
        1000,
      )
    }
    fetchReceiver()
    initLocalVideo()
    registerPeerEvents()
    return () => {
      // InCallManager.stopRingtone()
      // InCallManager.stop()
      setStatus(CallStatus.processing)
    }
  }, [])

  useEffect(() => {
    console.log(":MUTING", status)
    status !== CallStatus.processing && InCallManager.setMicrophoneMute(mute)
  }, [mute])
  useEffect(() => {
    status !== CallStatus.processing && InCallManager.setForceSpeakerphoneOn(speaker)
  }, [speaker])

  

  const hangUp = async () => {
    await hangUpCall(roomId, receiverId)
    setStatus(CallStatus.cancelled)
  }

  // const conn = useRef(new WebSocket(SOCKET_URL));
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
  const [callToUsername, setCallToUsername] = useState("")
  const connectedUser = useRef(null)
  const offerRef = useRef(null)

  /**
   * Calling Stuff
   */

  // useEffect(() => {
  //   if (socketActive && userId.length > 0) {
  //     try {
  //       // InCallManager.start({media: 'audio'});
  //       // InCallManager.setForceSpeakerphoneOn(true);
  //       // InCallManager.setSpeakerphoneOn(true);
  //     } catch (err) {
  //       console.log("InApp Caller ---------------------->", err)
  //     }

  //     send({
  //       type: "login",
  //       name: userId,
  //     })
  //   }
  // }, [socketActive, userId])

  // const onLogin = () => {}

  useEffect(() => {
    cancelled && handleLeave()
  }, [cancelled])

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
        // send({
        //   type: "candidate",
        //   candidate: event.candidate,
        // })
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
        video:
          mode === "video"
            ? {
                mandatory: {
                  minWidth: 500, // Provide your own width, height and frame rate here
                  minHeight: 300,
                  minFrameRate: 30,
                },
                facingMode: "user",
                // optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
              }
            : false,
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
    // attach the other peer username to our messages
    if (connectedUser.current) {
      message.name = connectedUser.current
      // console.log('Connected iser in end----------', message);
    }
    console.log("Message", message)
    // conn.current.send(JSON.stringify(message));
  }

  const onCall = () => {
    sendCall()
    setTimeout(() => {
      sendCall()
      setStatus(CallStatus.ringing)
    }, 500)
  }

  const sendCall = () => {
    // setCalling(true);
    const otherUser = receiverId
    connectedUser.current = otherUser
    console.log("Calling to", otherUser)
    // create an offer
    yourConn.current.createOffer().then((offer) => {
      yourConn.current.setLocalDescription(offer).then(() => {
        console.log("Sending Ofer")
        console.log("OFFER", JSON.stringify(offer))
        setTestOffer(JSON.stringify(offer))
        sendCallOffer(roomId, receiverId, offer, mode)
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
    let name = receiver?.name
    console.log(name + " is calling you.")
    connectedUser.current = name
    offerRef.current = { name, offer: testOffer }
    setIncomingCall(true)
    setOtherId(name)

    // acceptCall()
    // if (callActive) acceptCall()
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
        setTestAnswer(JSON.stringify(answer))
        setStatus(CallStatus.connected)
        // InCallManager.stopRingtone()
        acceptCallOffer(roomId, receiverId, answer)
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

  // when we got an answer from a remote user
  const handleAnswer = () => {
    console.log("handleAnswer:handleAnswer", answer)
    setCalling(false)
    setCallActive(true)
    //     yourConn.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))

    yourConn.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))
    setStatus(CallStatus.connected)
  }

  // when we got an ice candidate from a remote user
  const handleCandidate = (candidate) => {
    setCalling(false)
    // console.log('Candidate ----------------->', candidate);
    yourConn.current.addIceCandidate(new RTCIceCandidate(candidate))
  }


  // hang up
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

  const onLogout = () => {
    // hangUp();

    handleLeave()
  }

  const rejectCall = async () => {
    send({
      type: "leave",
    })
    // ``;
    // setOffer(null);

    // handleLeave();
  }

  const handleLeave = () => {
    // send({
    //   name: userId,
    //   otherName: otherId,
    //   type: "leave",
    // })

    setCalling(false)
    setIncomingCall(false)
    setCallActive(false)
    offerRef.current = null
    connectedUser.current = null

    yourConn.current.onicecandidate = null
    yourConn.current.ontrack = null
    yourConn.current.setRemoteDescription(null)
    yourConn.current.setLocalDescription(null)

    setRemoteStream({ toURL: () => null })
    setLocalStream({ toURL: () => null })
    resetPeer()
    goBack()

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

  /**
   * Calling Stuff Ends
   */

  return (
    <ScrollView style={styles.root}>
      {/* <View style={styles.inputField}>
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
        <Text>
          SOCKET ACTIVE:{socketActive ? "TRUE" : "FASLE"}, FRIEND ID:
          {callToUsername || otherId}
        </Text>
        <Button
          mode="contained"
          onPress={onCall}
          loading={calling}
          //   style={styles.btn}
          contentStyle={styles.btnContent}
          disabled={callToUsername === "" || callActive}
        >
          Call
        </Button>
        <Button
          mode="contained"
          onPress={handleLeave}
          contentStyle={styles.btnContent}
          disabled={!callActive}
        >
          End Call
        </Button>
        <Button
          mode="contained"
          onPress={handleOffer}
          contentStyle={styles.btnContent}
          // disabled={!callActive}
        >
          Handle Test Offer
        </Button>
        <Button
          mode="contained"
          onPress={handleAnswer}
          contentStyle={styles.btnContent}
          // disabled={!callActive}
        >
          Handle Test Answer
        </Button>
        <Button
          mode="contained"
          onPress={() => goBack()}
          contentStyle={styles.btnContent}
          // disabled={!callActive}
        >
          BACK
        </Button>
      </View> */}
      <View style={$localVideoContainer}>
        {remoteStream?.toURL() && mode === "video" ? (
          <RTCView
            streamURL={remoteStream ? remoteStream.toURL() : ""}
            style={$scaleFull}
            objectFit="cover"
          />
        ) : (
          <>
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
            {status === CallStatus.connected && <Text text="Connected" />}
          </>
        )}
        {mode === "video" && (
          <RTCView
            streamURL={localStream ? localStream.toURL() : ""}
            style={[$localVideo, { marginTop: safeArea.top }]}
            objectFit="cover"
          />
        )}
      </View>
      {/* 
        <RTCView
          streamURL={remoteStream ? remoteStream.toURL() : ""}
          style={[$scaleFull, { backgroundColor: "red" }]}
          objectFit="cover"
        />
        {mode === "video" && (
          <RTCView
            streamURL={localStream ? localStream.toURL() : ""}
            style={[$localVideo, { marginTop: safeArea.top }]}
            objectFit="cover"
          />
        )}
   
      {/* <View style={styles.videoContainer}>
        <View style={[styles.videos, styles.localVideos]}>
          <Text>Your Video</Text>
          <RTCView streamURL={localStream ? localStream.toURL() : ""} style={styles.localVideo} />
        </View>
        <View style={[styles.videos, styles.remoteVideos]}>
          <Text>Friends Video</Text>
          <RTCView
            streamURL={remoteStream ? remoteStream.toURL() : ""}
            style={styles.remoteVideo}
          />
        </View>
      </View> */}
      <Actions
        onHangUp={() => {
          handleLeave()
          hangUp()
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
            text={"Incoming " + mode + " call !"}
            weight="medium"
            style={{ marginBottom: spacing.small, textAlign: "center" }}
          />
          <Text text={otherId} weight="semiBold" style={{ textAlign: "center" }} size="lg" />
          <View style={[$flexRow, { marginTop: spacing.medium }]}>
            <Button
              onPress={handleLeave}
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
              onPress={acceptCall}
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
      <CallInititateModal
        receiver={receiver}
        sendCall={sendCall}
        isVisible={isInitiateVisible}
        setVisible={setInitiateVisible}
        handleLeave={handleLeave}
      />
    </ScrollView>
  )
})

export default CallScreen

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

// import { observer } from "mobx-react-lite"
// import React, { FC, useEffect, useState, useCallback, useRef, useMemo } from "react"
// import { AppStackScreenProps } from "../../navigators"
// import { Screen, Button, Text } from "../../components"
// import { Actions } from "./partials"
// import { $contentCenter, $flex1, $scaleFull } from "../styles"
// import {
//   TouchableOpacity,
//   ViewStyle,
//   View,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   ImageBackground,
//   TextStyle,
// } from "react-native"
// import { useIsFocused, useNavigation } from "@react-navigation/native"
// import { TextInput } from "react-native-paper"
// import InCallManager from "react-native-incall-manager"
// import Sound from "react-native-sound"
// import Modal from "react-native-modal"
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals,
// } from "react-native-webrtc"
// import { colors } from "../../theme"
// import { useSafeAreaInsets } from "react-native-safe-area-context"
// import FastImage, { ImageStyle } from "react-native-fast-image"
// import { Ring } from "./partials/RInger"
// import { useStores } from "../../models"
// import { useHooks } from "../hooks"

// const STUN_SERVER = "stun:stun.l.google.com:19302"

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

// export const CallScreen: FC<AppStackScreenProps<"CallScreen">> = observer(function CallScreen(
//   props,
// ) {
//   const navigation = useNavigation()
//   const { receiver, mode, role, roomId } = props.route.params
//   console.log("RECEIVER IN CALL", receiver)
//   const [status, setStatus] = useState(CallStatus.connecting)
//   const [localStream, setLocalStream] = useState({ toURL: () => null })
//   const [remoteStream, setRemoteStream] = useState({ toURL: () => null })
//   console.log("LOCAL STReAM ", localStream)
//   console.log("LOCAL STReAM  URL", localStream.toURL())
//   console.log("REMOTE STReAM ", remoteStream)
//   console.log("REMOTE STReAM URL", remoteStream.toURL())
//   const focus = useIsFocused()
//   const [callActive, setCallActive] = useState(false)
//   const connectedUser = useRef(null)
//   const offerRef = useRef(null)
//   const {
//     callStore: {
//       setOngoingCall,
//       offer,
//       answer,
//       clear,
//       ongoingCall,
//       clearJustData,
//     },
//     userStore:{
//       name
//     }
//   } = useStores()
//   const { sendCallOffer, acceptCallOffer, hangUpCall } = useHooks()
//   const yourConn = useRef(
//     new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: STUN_SERVER,
//         },
//       ],
//     }),
//   )

//   useEffect(() => {
//     clearJustData()
//     initLocalVideo()
//     registerPeerEvents()
//     if (role === Role.initiator) {
//       setTimeout(() => initiateCall(), 2000)
//     }
//     return () => {
//       setOngoingCall(false)
//       soundConnecting.release()
//     }
//   }, [])

//   useEffect(() => {
//     if (!ongoingCall) {
//       setStatus(CallStatus.cancelled)
//       navigation.goBack()
//     }
//   }, [ongoingCall])

//   var soundConnecting = useMemo(
//     () =>
//       new Sound("connecting.mp3", Sound.MAIN_BUNDLE, (error) => {
//         if (error) {
//           console.log("failed to load the sound", error)
//           return
//         }
//         soundConnecting.setNumberOfLoops(10).play()
//         setTimeout(() => setStatus(CallStatus.ringing), 1000)
//       }),
//     [],
//   )

//   useEffect(() => {
//     if (status === CallStatus.connecting) {
//       soundConnecting
//         .play((success) => {
//           if (success) {
//             console.log("successfully finished playing")
//           } else {
//             console.log("playback failed due to audio decoding errors")
//           }
//         })
//         .setNumberOfLoops(100)
//     }
//     console.log("STATUS ")
//     if (status === CallStatus.ringing) {
//       soundConnecting.stop()
//       console.log("PLAYING")
//     }
//     if (status === CallStatus.connected) {
//       // soundRinging.stop()
//     }
//   }, [status, focus])

//   const registerPeerEvents = () => {
//     yourConn.current.onaddstream = (event) => {
//       console.log("On Add Remote Stream", JSON.stringify(event))
//       setRemoteStream(event.stream)
//     }
//   }

//   const initLocalVideo = async () => {
//     await mediaDevices
//       .getUserMedia({
//         audio: true,
//         video: {
//           mandatory: {
//             minWidth: Dimensions.get("window").width, // Provide your own width, height and frame rate here
//             minHeight: Dimensions.get("window").height,
//             minFrameRate: 30,
//           },
//           facingMode: "user",
//           // optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
//         },
//       })
//       .then((stream) => {
//         // Got stream!
//         setLocalStream(stream)

//         // setup stream listening
//         yourConn.current.addStream(stream)
//       })
//       .catch((error) => {
//         // Log error
//       })
//     // });
//   }

//   // const send = (message) => {
//   //   //attach the other peer username to our messages
//   //   if (connectedUser.current) {
//   //     message.name = connectedUser.current
//   //     // console.log('Connected iser in end----------', message);
//   //   }
//   //   console.log("Message", message)
//   //   // conn.current.send(JSON.stringify(message));
//   // }

//   const initiateCall = () => {
//     // setCalling(true);
//     // create an offer
//     yourConn.current.createOffer().then((offer) => {
//       yourConn.current.setLocalDescription(offer).then(async () => {
//         setStatus(CallStatus.connecting)
//         console.log("Sending Ofer")
//         console.log("Sending Offer",name, JSON.stringify(offer))
//         await sendCallOffer(roomId, receiver?._id, offer)
//         setStatus(CallStatus.ringing)
//       })
//     })
//   }

//   useEffect(() => {
//     console.log()
//     answer !== "" && ongoingCall && status === CallStatus.ringing && handleAnswer()
//   }, [answer])

//   const handleAnswer = () => {
//     console.log("GOT AN ANSWER" ,name ,JSON.parse(answer))
//     yourConn.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))
//   }

//   // // when somebody sends us an offer
//   // // const handleOffer = async (offer: any) => {
//   // //   // let name = "J"
//   // //   // console.log(name + " is calling you.")
//   // //   connectedUser.current = receiver?.name
//   // //   offerRef.current = { name, offer: offer }
//   // //   setIncomingCall(true)
//   // //   setOtherId(receiver?.name)
//   // //   // acceptCall();
//   // //   if (callActive) acceptCall()
//   // // }

//   const acceptCall = async () => {
//     // const name = offerRef.current.name
//     console.log("Accepting Offer ",name, offer)
//     yourConn.current
//       .setRemoteDescription(JSON.parse(offer))
//       .then(function () {
//         // connectedUser.current = name
//         return yourConn.current.createAnswer()
//       })
//       .then(async function (answer: any) {
//         console.log("Generated ANSWER",name, JSON.stringify(answer))
//         yourConn.current.setLocalDescription(answer)
//         await acceptCallOffer(roomId, receiver?._id, answer)
//       })
//       .then(function () {
//         // Send the answer to the remote peer using the signaling server
//       })
//       .catch((err) => {
//         console.log("Error acessing camera", err)
//       })

//     // try {
//     //   await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

//     //   const answer = await yourConn.createAnswer();

//     //   await yourConn.setLocalDescription(answer);
//     //   send({
//     //     type: 'answer',
//     //     answer: answer,
//     //   });
//     // } catch (err) {
//     //   console.log('Offerr Error', err);
//     // }
//   }

//   // //when we got an answer from a remote user

//   // //when we got an ice candidate from a remote user
//   // const handleCandidate = (candidate) => {
//   //   setCalling(false)
//   //   // console.log('Candidate ----------------->', candidate);
//   //   yourConn.current.addIceCandidate(new RTCIceCandidate(candidate))
//   // }

//   // //hang up
//   // // const hangUp = () => {
//   // //   send({
//   // //     type: 'leave',
//   // //   });

//   // //   handleLeave();
//   // // };

//   // const rejectCall = async () => {
//   //   // send({
//   //   //   type: "leave",
//   //   // })``
//   //   handleLeave()
//   //   clear()
//   // }
//   // // const handleLeave = () => {
//   // //   setRemoteStream({toURL: () => null});

//   // //   // yourConn.close();
//   // //   // yourConn.onicecandidate = null;
//   // //   // yourConn.onaddstream = null;
//   // // };

//   const onHangUp = async () => {
//     await hangUpCall(roomId, receiver?._id)
//     clear()
//     navigation.goBack()
//   }
//   // const handleLeave = async () => {
//   //   offerRef.current = null
//   //   setRemoteStream(null)
//   //   setLocalStream(null)
//   //   yourConn.current.onicecandidate = null
//   //   yourConn.current.ontrack = null
//   //   resetPeer()
//   //   initLocalVideo()
//   //   // console.log("Onleave");
//   // }

//   // const resetPeer = () => {
//   //   yourConn.current = new RTCPeerConnection({
//   //     iceServers: [
//   //       {
//   //         urls: STUN_SERVER,
//   //       },
//   //     ],
//   //   })

//   //   registerPeerEvents()
//   // }

//   const safeArea = useSafeAreaInsets()

//   return (
//     <Screen contentContainerStyle={$flex1}>
//       {/* <ScrollView style={styles.root}>
//         <View style={styles.inputField}>
//           <TextInput
//             label="Enter Friends Id"
//             mode="outlined"
//             style={{ marginBottom: 7 }}
//             onChangeText={(text) => setCallToUsername(text)}
//           />
//           <TextInput
//             label="Test OFFER"
//             mode="outlined"
//             style={{ marginBottom: 7 }}
//             onChangeText={(text) => setTestOffer(text)}
//             value={testOffer}
//           />
//           <TextInput
//             label="Test ANSWER"
//             mode="outlined"
//             style={{ marginBottom: 7 }}
//             onChangeText={(text) => setTestAnswer(text)}
//             value={testAnswer}
//           />
//           <Button text="Call" onPress={onCall} disabled={callToUsername === "" || callActive} />
//           <Button onPress={handleLeave} disabled={!callActive} text="End Call" />
//           <Button onPress={handleOffer} text="Handle Test Offer" />
//           <Button onPress={handleAnswer} text="Handle Test Answer" />
//         </View>
//         <View style={styles.videoContainer}></View>
//         <Modal isVisible={incomingCall && !callActive}>
//           <View
//             style={{
//               backgroundColor: "white",
//               padding: 22,
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: 4,
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Text>{otherId + " is calling you"}</Text>
//             <Button text="Accept Call" onPress={acceptCall} />
//             <Button text="Reject Call" onPress={handleLeave} />
//           </View>
//         </Modal>
//       </ScrollView> */}
//       <View style={$localVideoContainer}>
//         <RTCView streamURL={remoteStream? remoteStream.toURL():''} style={[$scaleFull, {backgroundColor:'red'}]} />
//         {mode === "video" && (
//           <RTCView
//             streamURL={localStream ? localStream.toURL() : ""}
//             style={[$localVideo, { marginTop: safeArea.top }]}
//             objectFit="cover"
//           />
//         )}
//       </View>
//       {status !== CallStatus.connected && (
//         <Text text={status} style={$statusText} weight="semiBold" />
//       )}
//       <Actions onHangUp={onHangUp} role={role} status={status} acceptCall={acceptCall} />
//     </Screen>
//   )
// })

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
  // position: "absolute",
  backgroundColor: "green",
}

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: "#fff",
//     flex: 1,
//     padding: 20,
//   },
//   inputField: {
//     marginBottom: 10,
//     flexDirection: "column",
//   },
//   videoContainer: {
//     flex: 1,
//     minHeight: 450,
//   },
//   videos: {
//     width: "100%",
//     flex: 1,
//     position: "relative",
//     overflow: "hidden",

//     borderRadius: 6,
//   },
//   localVideos: {
//     height: 100,
//     marginBottom: 10,
//   },
//   remoteVideos: {
//     height: 400,
//   },
//   localVideo: {
//     backgroundColor: "#f2f2f2",
//     height: "100%",
//     width: "100%",
//   },
//   remoteVideo: {
//     backgroundColor: "#f2f2f2",
//     height: "100%",
//     width: "100%",
//   },
// })

// // {callActive ? (
// //   <RTCView streamURL={remoteStream ? remoteStream.toURL() : ""} style={$scaleFull} />
// // ) : (
// //   <ImageBackground
// //     source={{ uri: receiver.picture }}
// //     style={[$scaleFull, $contentCenter]}
// //     resizeMode="cover"
// //     blurRadius={20}
// //   >
// //     <Ring delay={0} />
// //     <Ring delay={1000} />
// //     <Ring delay={2000} />
// //     <Ring delay={3000} />
// //     <FastImage source={{ uri: receiver.picture }} style={$receiverProfilePicture} />
// //   </ImageBackground>
// // )}

// /**
//  *
//  * Sockets Signalling
//  */
// // conn.current.onopen = () => {
// //   console.log('Connected to the signaling server');
// //   setSocketActive(true);
// // };
// // //when we got a message from a signaling server
// // conn.current.onmessage = msg => {
// //   const data = JSON.parse(msg.data);
// //   // console.log('Data --------------------->', data);
// //   switch (data.type) {
// //     case 'login':
// //       console.log('Login');
// //       break;
// //     //when somebody wants to call us
// //     case 'offer':
// //       handleOffer(data.offer, data.name);
// //       console.log('Offer');
// //       break;
// //     case 'answer':
// //       handleAnswer(data.answer);
// //       console.log('Answer');
// //       break;
// //     //when a remote peer sends an ice candidate to us
// //     case 'candidate':
// //       handleCandidate(data.candidate);
// //       console.log('Candidate');
// //       break;
// //     case 'leave':
// //       handleLeave();
// //       console.log('Leave');
// //       break;
// //     default:
// //       break;
// //   }
// // };
// // conn.current.onerror = function(err) {
// //   console.log('Got error', err);
// // };
