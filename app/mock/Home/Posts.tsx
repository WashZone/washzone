export interface Post {
  publisher: {
    first_name: string
    last_name: string
    picture: string
  }
  attachment: {
    type: "image" | "video" | "audio"
    url: string
  }
  postContent: string
  createdAt: number
}

export const posts: Post[] = [
  {
    attachment: {
      type: "image",
      url: "https://pbs.twimg.com/media/Fa8g7FaXoAAgZiU?format=jpg&name=4096x4096",
    },
    publisher: {
      first_name: "John",
      last_name: "Petterson",
      picture:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
    },
    postContent:
      "EXCITING NEWS!  Our brand new, state-of-the art indoor CarWash College lab in Florida provides better education with even more hands-on learning. ",
    createdAt: 1669106599,
  },
  {
    attachment: {
      type: "image",
      url: "https://pbs.twimg.com/media/FiRZheoUYAAZV9t?format=jpg&name=medium",
    },
    publisher: {
      first_name: "Jimmy",
      last_name: "Kimmel",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
    },
    postContent:
      "For a holiday gift for children, you may want to consider my children's book, Jimmy's Carwash Adventure. \nIt is a story about labor solidarity inspired by the great work of @carwasherxs and CLEAN Carwash Campaign",
    createdAt: 1669365799,
  },
]
