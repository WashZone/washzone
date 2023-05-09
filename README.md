
```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
├── app.tsx
```

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.


**Washzone Navigation**

UNRESTRICTED FLOW:
1. The very first screen after a cold boot is the Main Landing Screen where you could login via any of the below:Email and PasswordApple SigningGoogle SigningYou have access to Forgot Password Screen and the SignUP screen from here.If you choose to login, you will be inside the app and will be on the main Tab Navigator.
2. Forgot password :You can enter your e-mail and hit the reset button which will navigate you to another page where it will ask you for a new password and the OTP that has been sent to the e-mail you provided earlier. Once you hit reset, if everything is correct, you will redirected to the home screen again with a success alert.
3. Signup:The required data that we need containsthe full name of the user,email,password. On top of that you need to accept the EULA and the Privacy policy before signing up, which are both linked on the signup page itself if one wish to read the thoroughly.

RESTRICTED FLOW (Once you are Logged in):
1. Home Screen:Once you are logged in, this is the screen you are going to spend the most time on, You have access to 4 tabs : Home, Discuss,Classifieds, Videos and a drawer with the following functions :  Viewing Notifications, Editing Profile, Managing In-App Settings, Contacting support, Viewing saved Videos and Classifieds and Logging Out.
2. Home Tab : View PostsCreate PostsView Activities (Whenever anyone creates a posts, classified, video or discussio with an image associated, it is considered to be an activity)
3. Post Details : (Click on any Post on Home tab to get to this screen)Once you click on a post, you will be navigated to the Details screen which will contain the post content (text) and the image if its there. You can also view and create comments on the particular post. You can like, dislike, share or flag the content as per you wish. 
4. Discussion Tab:View discussions made by the communityPost a discussion 
5. Discussion Details : (Click on any Discussion on Discussion Tab to get to this screen)View the whole discussion View and Create Comments
6. Classifieds Tab :View all the classifieds posted by the community with title and prices.Create Classifieds
7. Classified Details : (Click on any Classified on Discussion Tab to get to this screen)View the whole classified in detail Flag, Save , Share or make an offer on the Classified.
8. Videos Tab :Here, you can view videos categorically on Car-Washing, Detailing and other related topics. This is just meant to be used as a resource/discover feed now, hence a user is not able to post any videos.
9. Video Details : (Click on any Video on the Videos Tab to get to this Screen )Watch VideoLike, Dislike, Share or Save

Drawer Options
10. Notifications :All the following interactions with result to a notification being shown on this screen : Like or Comment on you post or discussionOffer on your Classified.
11. Edit Profile :Edit you name, bio and/or your profile image .
12. Settings :Toggle Push notificationsView Blocked UsersReset Password Close Account :  Link to a web-page to delete your account if you wish to.
13. Contact Support :Contact our support team via email.
14. Legal :View the Privacy Policy and the terms & conditions that you have to follow while you use the app.
15. Saved :Once you save either a classified or a video, it gets shown here.
16. Logout :Logout the user of the application.

UserProfile (Click on any user’s profile image anywhere to view his/her profile):
17. This consists of 4 Tabs :  Posts, Discussion, Classifieds and Gallery.Post : All the posts made the user.Discussions : All the discussions made by the user.Classifieds :  All the classifieds created by the user.Gallery : This consists of all the images that have been every uploaded by the user over the app.
Chat (Tap the Message Icon on the top right of the main screen)
18.  Chats :Here you can view all the people you have every had a chat with
19. Chat Screen :View and send message to a user
20. Audio Call :Tap the audio Icon on the chat screen to initiate an AUDIO call with the user. 
21. Video Call :Tap the audio Icon on the chat screen to initiate an VIDEO call with the user. Both audio and video call has the basic controls such as: switch speaker, mute, hangup . 

Others :
17. Search Screen (Tap the search Icon on the top right of the main screen):You can search all the following : Users, Discussions, Videos and Posts via keywords.


