import { useStores } from "../../models"


export function useHooks() {
  
  const {
    feedStore: { setPosts },
    api: { queryGetAllpost },
  } = useStores()

  const getAndUpdatePosts = async (cache?:boolean) => {
    const res = await queryGetAllpost(undefined, {
      fetchPolicy: cache===undefined ? "cache-and-network" : cache ? 'cache-first':'no-cache'  ,
    })
    console.log(res)
    setPosts(res.getAllpost)
  }


  return { getAndUpdatePosts }
}
