const en = {
  headerTitle: {
    addClassfied: "Add a Classfied",
    uploadVideo: "Add a Video",
  },
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    forgotPassword: "Forgot Password?",
    loginDescription: "Please login with your account!",
    getStarted: "Sign Up",
    welcomeText: "Welcome to WashZone",
    description: "The mobile app to create, manage and navigate car wash talk and ideas.",
    socialLoginTitle: "Quick Login",
    tncIntro: "By continuing, you accept the ",
    tncLink1: "EULA",
    and: " and ",
    tncLink2: "Privacy Policy",
    signUp: "Sign Up",
    signupDescription: "Create your Account!",
    emailLabel: "Enter your email",
    passwordLabel: "Password",
    nameLabel: "Enter your name",
    confirmPasswordLabel: "Confirm Password",
    create: "Sign Up",
    navigateToLogin: "Already have an account? ",
    Login: "Log In",
    noAccont: "Doesn't have an Account? ",
  },
  HomeSreen: {
    createPostPlaceholder: "What's on your mind?",
  },
  DrawerNavigator: {
    profile: "Edit Profile",
    settings: "Settings",
    support: "Contact Support",
    legal: "Legal",
    logout: "Logout",
    saved: "Saved",
    notification: "Notifications",
    version: "Version 1.0",
  },
  TabNavigator: {
    videosTab: "Videos",
    homeTab: "Home",
    topicsTab: "Topics",
    ClassifiedsTab: "Classifieds",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  settings: {
    notificationToggle: "Notification",
    reset: "Reset Password",
  },
  resetPassword: {
    title: "Forgot your password?",
    description: "Enter your email to reset your password",
    placeholder: "Enter your E-Mail",
  },
  profile: {
    gallery: "GALLERY",
  },
  addAVideo: {
    acceptTNC: "I agree to the terms of service",
  },
  toastMessages: {
    videoSavedSuccessfully: {
      text1: "Video Successfully Saved!",
      text2: "Head over to Saved to view your saved items.",
    },
    classifiedSavedSuccessfully: {
      text1: "Classified Successfully Saved!",
      text2: "Head over to Saved to view your saved items.",
    },
    classifiedUnsavedSuccessfully: {
      text1: "Classified Successfully Removed from Saved!",
      // text2: "Head over to Saved to view your saved items.",
    },
    videoUnsavedSuccessfully: {
      text1: "Video Successfully Removed from Saved!",
    },
    somethingWentWrong: {
      text1: "Something went Wrong!",
    },
    passwordResetSuccess: {
      text1: "Password Changed!",
    },
    incorrectCredentials: {
      text1: "Incorrect Credentials!",
    },
    emailAlreadyExists: {
      text1: "Email already Registered!",
      text2: "Please choose another email as this one seems to be already registered.",
    },
    ytUrlNotValid: {
      text1: "Enter a valid Youtube URL!",
    },
    emptyDescription: {
      text1: "Description cannot be empty!",
    },
    invalidTitle: {
      text1: "Title cannot be empty!",
    },
    acceptTNC: {
      text1: "Please Accept the terms and Conditions!",
    },
    videoUploadedSuccessfully: {
      text1: "Video Successfully Uploaded!",
    },
    selectCondition: {
      text1: "Please select an appropriate condition for the item!",
    },
    minimumOnePhotoRequired: {
      text1: "Please Upload atleast one image!",
    },
  },
}

export default en
export type Translations = typeof en
