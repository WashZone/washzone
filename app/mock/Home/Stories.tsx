export interface Story {
  thumbnailUrl: string
  storyUrl: string
  publisher: {
    first_name: string
    last_name: string
    picture: string
  }
}

export const stories: Story[] = [
  {
    thumbnailUrl:
      "https://media.gettyimages.com/id/1310978724/photo/the-washing-process-on-a-self-service-car-wash.jpg?s=612x612&w=gi&k=20&c=_Q83MfrY8zgqs6DidTWL7XEcM7TIlT0SfaKNmi5zOZY=",
    storyUrl: "washzone://story-topic/63b6da4ae2cc3483193048c5",
    publisher: {
      first_name: "John",
      last_name: "Petterson",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
    },
  },
  {
    thumbnailUrl: "https://blog.way.com/wp-content/uploads/2020/10/CAR_WASH_1_25.jpg",
    storyUrl: "washzone://story-video/63b6cc7cfb35503f2e8f5aaf",
    publisher: {
      first_name: "Paul",
      last_name: "Petterson",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuzBdCj-6DYYKRuXR6wroURM_D0C-fb6u-w&usqp=CAU",
    },
  },
  {
    thumbnailUrl:
      "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1563183740/autoexpress/2017/05/car_photo_438622.jpg",
    storyUrl: "washzone://story-classified/63b6d98de2cc348319304889",
    publisher: {
      first_name: "John",
      last_name: "Petterson",
      picture: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
    },
  },
  {
    thumbnailUrl:
      "https://img.grouponcdn.com/deal/7SGsh9VQvi1gdyLEPmLd3GasWqZ/7S-2048x1228/v1/c870x524.jpg",
    storyUrl: "washzone://story-topic/63b6cbbffb35503f2e8f5a4c",
    publisher: {
      first_name: "John",
      last_name: "Petterson",
      picture:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
    },
  },
  {
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfkVAhDUhIkeHqfk1Ccy_AzGEAYLKmRFV-SoWSnDQHJbm9A6PTYsQg4BVAAbXgsaW2BU&usqp=CAU",
    storyUrl: "washzone://story-topic/63b6cbc0fb35503f2e8f5a4e",
    publisher: {
      first_name: "John",
      last_name: "Petterson",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JXTGHFY17JKveGhEsuP2rz0qxFMoKb6eHg&usqp=CAU",
    },
  },
]
