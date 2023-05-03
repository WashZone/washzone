import React from "react"
import { Platform, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk-next"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useStores } from "../../models"
import Toast from "react-native-toast-message"
import { toastMessages } from "../../utils/toastMessages"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import { defaultImages } from "../../utils"

interface OptionType {
  icon: "fb" | "google" | "email" | "apple"
  key: string
  onPress: () => void
}

export function SocialLogin() {
  const {
    authenticationStore: { setAuthToken },
    userStore: { setUser },
    api: { queryGetUserBysocialId, mutateCreateUser },
  } = useStores()
  const siginGoogle = () => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS === "ios"
          ? "801053055110-7i8u483irj11gaovpcu7srko4hv73ga8.apps.googleusercontent.com"
          : "801053055110-qjigsd0o5uk4bntecq68p5b5216h923c.apps.googleusercontent.com",
      iosClientId: "801053055110-7i8u483irj11gaovpcu7srko4hv73ga8.apps.googleusercontent.com",
    })
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(async (userInfo) => {
              console.log('GOOGLE userInfo : ', JSON.stringify(userInfo))
              const resGetUserBySocialId = await queryGetUserBysocialId(
                {
                  socialId: userInfo.user.id,
                },
                { fetchPolicy: "network-only" },
              )
              const userFound = resGetUserBySocialId.getUserBysocialId.length > 0
              console.log('USER FOUND : ', JSON.stringify(userFound))
              try {
                let resCreateUser: { createUser: any }
                console.log("GOOGLE USER INFO! ", userInfo)
                if (!userFound) {
                  resCreateUser = await mutateCreateUser({
                    type: "google",
                    isSocialLogin: true,
                    lastName: userInfo.user.name.split(" ")[1] || "",
                    firstName: userInfo.user.name.split(" ")[0],
                    password: "",
                    email: userInfo?.user?.email,
                    name: userInfo?.user?.name,
                    picture: userInfo?.user?.photo,
                    socialId: userInfo.user.id,
                  })
                }
                console.log("TEST USER GOT", resGetUserBySocialId.getUserBysocialId[0])
                const user = userFound
                  ? resGetUserBySocialId.getUserBysocialId[0]
                  : resCreateUser.createUser
                setUser({
                  _id: user?._id,
                  name: user?.name,
                  email: user?.email,
                  first_name: user?.first_name,
                  socialId: user?.socialId,
                  description: user?.description,
                  last_name: user?.last_name || "",
                  picture: user?.picture,
                  isSocialLogin: true,
                  type: "google",
                  blockedUser: user?.blockedUser || [],
                })
                setAuthToken(user?._id)
              } catch (err) {
                console.log('API ERR : ', JSON.stringify(err))
                Toast.show(toastMessages.somethingWentWrong)
              }
            })
            .catch((e) => {
              console.log("Module ERR : ", JSON.stringify(e))
              console.log(e)
            })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getInfoFromTokenForFacebook = (token: string) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email,picture",
      },
    }
    const profileRequest = new GraphRequest(
      "/me",
      { accessToken: token, parameters: PROFILE_REQUEST_PARAMS },
      async (error, user) => {
        if (!error) {
          const userInfo: any = user
          const resGetUserBySocialId = await queryGetUserBysocialId(
            { socialId: userInfo?.id },
            { fetchPolicy: "network-only" },
          )
          const userFound = resGetUserBySocialId.getUserBysocialId.length > 0
          try {
            let resCreateUser: { createUser: any }
            if (!userFound) {
              resCreateUser = await mutateCreateUser({
                name: userInfo?.name,
                email: userInfo?.email,
                firstName: userInfo?.first_name,
                socialId: userInfo?.id,
                lastName: userInfo?.last_name,
                picture: userInfo?.picture.data?.url,
                isSocialLogin: true,
                type: "facebook",
                password: "",
              })
            }
            setUser({
              _id: userFound
                ? resGetUserBySocialId.getUserBysocialId[0]?._id
                : resCreateUser.createUser._id,
              name: userInfo?.name,
              email: userInfo?.email,
              first_name: userInfo?.first_name,
              socialId: userInfo?.id,
              last_name: userInfo?.last_name,
              picture: userInfo?.picture.data?.url,
              isSocialLogin: true,
              type: "facebook",
              blockedUser: user?.blockedUser || [],
            })
            setAuthToken(token)
          } catch (err) {
            Toast.show(toastMessages.emailAlreadyExists)
          }
        }
      },
    )
    new GraphRequestManager().addRequest(profileRequest).start()
  }

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (login) => {
        if (login.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString()
            getInfoFromTokenForFacebook(accessToken)
          })
        }
      },
      (error) => { },
    )
  }
  const signInWithApple = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log("appleAuthRequestResponse", appleAuthRequestResponse)

      const resGetUserBySocialId = await queryGetUserBysocialId(
        {
          socialId: appleAuthRequestResponse.user,
        },
        { fetchPolicy: "network-only" },
      )
      const userFound = resGetUserBySocialId.getUserBysocialId.length > 0
      // eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndhc2h6b25lLndhc2h0ZXN0MDEiLCJleHAiOjE2ODI2NzQzMTgsImlhdCI6MTY4MjU4NzkxOCwic3ViIjoiMDAxNTU1LjUwMWY3YjI4NmZkNzQ0MzY5MTdjMjg1YWY4YmU3MmUxLjA5MTkiLCJub25jZSI6IjEwNDkyOTc0ZDA4N2U4ODYwMGY4NmJjMmJmNDQyYzVhYTU1YTdkOWJjYWFlNWUyMTU3YTU3OTIzYjkxN2QwOGMiLCJjX2hhc2giOiJOWHc1Rl9Sb3VZY0IybmVRUkU4dllRIiwiZW1haWwiOiJkaXhpdDk3MjNheXVzaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2ODI1ODc5MTgsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.d4pbxnAY3qUxL6gtXVULJ1jACZaDL0g3kNEEAQoIqLmaS81C6VGY8UsmA4UIYpZIssb8Sj9pSanhEkgYpYyN_ey5F0xhmA-YnBEG5-tnnKnrspy-dAnhLqCaWjGNBfJQ77pYP07EV5whm1RJJyuHPaBnlYZ1DUq9WIDMH_x7Qu7eBOq8s7zdBqZptpi0V5XWgV5CpRHR097sZvGW1MLiuL3zYEMIyTUSqo1-P4tgxwWBV7RHuYkSQT1wAz5bN2tKwsMNJmJnc77-D_ttpj8r279Y28lFc0tbiTb8svxDV0L7UXesP_C38MdaBs7zGSLrn7igrn1e1ySBKtzLnAb8tQ
      try {
        let resCreateUser: { createUser: any }
        if (!userFound) {
          resCreateUser = await mutateCreateUser({
            type: "apple",
            isSocialLogin: true,
            lastName: appleAuthRequestResponse.fullName.familyName,
            firstName: appleAuthRequestResponse.fullName.givenName,
            password: "",
            email: appleAuthRequestResponse?.email,
            name: appleAuthRequestResponse.fullName.givenName + ' ' + appleAuthRequestResponse.fullName.familyName,
            picture: defaultImages.profile,
            socialId: appleAuthRequestResponse.user,
          })
        }
        console.log("TEST USER GOT", resGetUserBySocialId.getUserBysocialId[0])
        const user = userFound
          ? resGetUserBySocialId.getUserBysocialId[0]
          : resCreateUser.createUser
        setUser({
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          first_name: user?.first_name,
          socialId: user?.socialId,
          description: user?.description,
          last_name: user?.last_name || "",
          picture: user?.picture,
          isSocialLogin: true,
          type: "google",
          blockedUser: user?.blockedUser || [],
        })
        setAuthToken(user?._id)
      } catch (err) {
        Toast.show(toastMessages.emailAlreadyExists)
      }
    }
  }

  const options: OptionType[] = Platform.select({
    ios: [
      { icon: "fb", key: "facebook", onPress: loginWithFacebook },
      { icon: "apple", key: "apple", onPress: signInWithApple },
      { icon: "google", key: "google", onPress: siginGoogle },
    ],
    android: [
      { icon: "fb", key: "facebook", onPress: loginWithFacebook },
      { icon: "google", key: "google", onPress: siginGoogle },
    ],
  })

  return (
    <View>
      <View style={$titleContainer}>
        <View style={$decorativeView} />
        <Text tx="loginScreen.socialLoginTitle" style={$socialTitle} />
        <View style={$decorativeView} />
      </View>
      <View style={$container}>
        {options.map((social) => (
          <Pressable key={social.key} style={$iconContainer} onPress={social.onPress}>
            <Icon icon={social.icon} size={50} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const $decorativeView: ViewStyle = {
  height: 0.5,
  backgroundColor: colors.palette.neutral300,
  width: 70,
  opacity: 0.4,
}

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const $socialTitle: TextStyle = {
  color: colors.palette.neutral400,
  textAlign: "center",
  marginHorizontal: spacing.medium,
  fontSize: 14,
}

const $iconContainer: ViewStyle = {
  marginHorizontal: spacing.medium,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { height: 2, width: 2 },
  shadowOpacity: 0.3,
  height: 50,
  width: 50,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
  elevation: 10,
}

const $container: ViewStyle = {
  marginVertical: 8,
  width: "80%",
  justifyContent: "space-around",
  alignSelf: "center",
  alignItems: "center",
  height: 80,
  flexDirection: "row",
}
