import { gapi } from 'gapi-script'
import { type MouseEvent } from 'react'
import {
  type VideoInfos,
  type Input,
  type UseRef,
  type SetState,
  type SearchInfo,
} from '@/utils/Types'

async function getSearchInfo(
  event: MouseEvent,
  searchValueRef: UseRef<Input>,
): Promise<SearchInfo> {
  const searchKeyword = searchValueRef.current?.value.trim() ?? ''

  if (searchKeyword !== '') {
    event.preventDefault()

    const searchResult = await gapi.client.youtube.search.list({
      part: 'snippet',
      channelId: 'UCDqaUIUSJP5EVMEI178Zfag',
      maxResults: 20,
      type: 'video',
      videoEmbeddable: 'true',
      q: `${searchKeyword} KY Karaoke -노래방챌린지`,
    })
    const listLength = searchResult.result.pageInfo.resultsPerPage

    const videoInfos: VideoInfos = [...Array(listLength)].map((v, i) => {
      const video = searchResult.result.items[i]
      const videoID: string = video.id.videoId
      const videoDate: string = video.snippet.publishedAt
      const videoTitle: string = video.snippet.title
      // 사건의 지평선 - 윤하(Event horizon - YOUNHA) (KY.28707) / KY Karaoke

      let divided
      if (videoTitle.includes('(KY.')) {
        divided = videoTitle.split('(KY.')
      } else if (videoTitle.includes('[KY')) {
        divided = videoTitle.split('[KY')
      } else {
        divided = videoTitle.split(')')
      }
      const titleArtist = divided[0].trim().split('-')
      const title = titleArtist[0].trim()
      const artist = titleArtist.slice(1).join('')
      let number = divided[1].trim().split(')')[0]
      if (typeof parseInt(number, 10) !== 'number') {
        number = 'x'
      }

      const videoInfo = {
        id: videoID,
        title,
        artist,
        number,
        date: videoDate,
      }

      return videoInfo
    })
    const searchInfo: SearchInfo = [...videoInfos]

    const listLengthAll: number = searchResult.result.pageInfo.totalResults
    searchInfo.push(listLengthAll)
    return searchInfo
  }
  return [-1]
}

function isVideoInfos(value: SearchInfo): value is VideoInfos {
  return value.every((info) => typeof info === 'object')
}

export default async function searchVideos(
  event: MouseEvent,
  {
    setVideoInfos,
    searchValueRef,
    setAllVideoLength,
  }: {
    setVideoInfos: SetState<VideoInfos>
    searchValueRef: UseRef<Input>
    setAllVideoLength: SetState<number>
  },
): Promise<void> {
  const searchInfo = await getSearchInfo(event, searchValueRef)
  const getListLength = searchInfo.pop()
  if (isVideoInfos(searchInfo)) {
    setVideoInfos(searchInfo)
  }
  if (typeof getListLength === 'number') {
    setAllVideoLength(getListLength)
  } else {
    setAllVideoLength(-2)
  }
}