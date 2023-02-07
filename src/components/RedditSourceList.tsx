import type { FunctionComponent} from 'react';
import { useState } from 'react'
import { api } from '../utils/api'

export const RedditSourceList:FunctionComponent = () => {
  const [list, setList] = useState([{ subreddit: '' }])
  const [topQuery, setTopQuery] = useState('')
  const [topList, setTopList] = useState()
  const [currentTop, setCurrentTop] = useState('')
  const redditSources = api.redditSource.getAll.useQuery().data
  
  if(topQuery !== '' && currentTop !== topQuery) {
    const top = api.redditSource.getTop.useQuery(topQuery)
    if(top !== null && topList !== top) {
      setTopList(top.data)
      setCurrentTop(topQuery)
    }
  }
  
  

  const clearMutate = api.redditSource.clear.useMutation()
  const delMutate = api.redditSource.delete.useMutation()

  function handleClear() {
    clearMutate.mutate()
    setList([])
  }
  function handleDelete(target: string) {
    delMutate.mutate(target)
    setList(list.filter((obj) => obj.subreddit !== target))
  }
  function handleGetTop(target: string) {
    setTopQuery(target)
  }
  
  if (redditSources && list !== redditSources) {
    setList(redditSources)
  }

  return (
    <>
      <ul>
        {list.map((item, key) => {
          return (
            <li key={key}>
              <span>{item.subreddit}</span>
              <button
                className="text-black"
                onClick={() => handleDelete(item.subreddit)}
              >
                delete
              </button>
              <button onClick={() => handleGetTop(item.subreddit)}>
                Get Top
              </button>
            </li>
          )
        })}
      </ul>

      <button className="text-black" onClick={handleClear}>
        clear
      </button>

      {topList ? 
      <>
      {topList}
      </> : null}
    </>
  )
}
