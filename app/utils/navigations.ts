import { NavigationProp } from "@react-navigation/native"
import { Alert } from "react-native"
import { TabParamList } from "../navigators/TabNavigator"
import { ClassifiedsTabParamList, VideosTabParamList, TopicsTabParamList } from "../tabs"

export function openCustomUrl(
  url: string,
  navigationTab: NavigationProp<TabParamList>,
  navigationTopic: NavigationProp<TopicsTabParamList>,
  navigationClassified: NavigationProp<ClassifiedsTabParamList>,
  navigationVideo: NavigationProp<VideosTabParamList>,
) {
  const handleStoryURL = (linkUrl: string) => {
    let validStory = false
    if (/open-classified/.test(linkUrl)) {
      validStory = true
      navigationTab.navigate("Classifieds")
      setTimeout(
        () =>
          navigationClassified.navigate("ClassifiedsDetails", {
            classified: linkUrl?.split("/")[linkUrl?.split("/").length - 1],
          }),
        200,
      )
    }
    if (/open-topic/.test(linkUrl)) {
      validStory = true
      setTimeout(() => {
        navigationTopic.navigate("TopicInfo", {
          topic: linkUrl?.split("/")[linkUrl?.split("/").length - 1],
        })
      }, 200)
    }
    if (/open-video/.test(linkUrl)) {
      validStory = true
      console.log("CURRENT ROUTE: ", navigationVideo.getState())
      navigationTab.navigate("Videos")
      setTimeout(
        () =>
          navigationVideo.navigate("VideoDetails", {
            data: linkUrl?.split("/")[linkUrl?.split("/").length - 1],
          }),
        200,
      )
    }
    if (!validStory) {
      Alert.alert(`Something Went Wrong!`)
    }
  }

  // Calling the Handle Function
  handleStoryURL(url)
}
