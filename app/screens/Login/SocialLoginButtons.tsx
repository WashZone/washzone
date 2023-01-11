import React from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from "react-native-fbsdk"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useStores } from "../../models"

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
      iosClientId: "1023545677586-8n9vl69j28eoul9q628f71rjap11obk2.apps.googleusercontent.com",
    })
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(async (userInfo) => {
              const resGetUserBySocialId = await queryGetUserBysocialId(
                {
                  socialId: userInfo.user.id,
                },
                { fetchPolicy: "network-only" },
              )
              const userFound = resGetUserBySocialId.getUserBysocialId.length > 0
              let resCreateUser: { createUser: any }
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
              setUser({
                _id: userFound
                  ? resGetUserBySocialId.getUserBysocialId[0]?._id
                  : resCreateUser.createUser._id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                first_name: userInfo.user.givenName,
                socialId: userInfo.user.id,
                last_name: userInfo.user.familyName || "",
                picture: userInfo.user.photo,
                isSocialLogin: true,
                type: "google",
              })
              setAuthToken(userInfo.idToken)
            })
            .catch((e) => {
              console.log("ERROR IS: " + JSON.stringify(e))
            })
        }
      })
      .catch((e) => {
        console.log("ERROR IS: " + JSON.stringify(e))
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
        if (error) {
          console.log("login info has error: " + error)
        } else {
          const userInfo: any = user
          const resGetUserBySocialId = await queryGetUserBysocialId(
            { socialId: userInfo?.id },
            { fetchPolicy: "network-only" },
          )
          const userFound = resGetUserBySocialId.getUserBysocialId.length > 0
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
          })
          setAuthToken(token)
        }
      },
    )
    new GraphRequestManager().addRequest(profileRequest).start()
  }

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled")
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString()
            getInfoFromTokenForFacebook(accessToken)
          })
        }
      },
      (error) => {
        console.log("Login fail with error: " + error)
      },
    )
  }

  const options: OptionType[] = [
    { icon: "fb", key: "facebook", onPress: loginWithFacebook },
    { icon: "google", key: "google", onPress: siginGoogle },
  ]

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
