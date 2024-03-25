import { useContext, useMemo } from 'react'
import AppContext from '../utils/AppContext'
import SearchContext from '../utils/SearchContext'
import showSelectedVideo from '../function/showSelectedVideo'

export default function SearchList(): JSX.Element {
  const {
    playerRef,
    controllerRef,
    searchRef,
    searchModalRef,
    setVideoID,
    setVideoTitle,
    setVideoArtist,
    setVideoNumber,
    setVideoDate,
  } = useContext(AppContext)
  const { videoInfos, listNote, allVideoLength } = useContext(SearchContext)

  const changeVideoArgs = useMemo(
    () => ({
      playerRef,
      controllerRef,
      searchRef,
      searchModalRef,
      videoInfos,
      setVideoID,
      setVideoTitle,
      setVideoArtist,
      setVideoNumber,
      setVideoDate,
    }),
    [
      controllerRef,
      playerRef,
      searchModalRef,
      searchRef,
      setVideoArtist,
      setVideoDate,
      setVideoID,
      setVideoNumber,
      setVideoTitle,
      videoInfos,
    ],
  )
  return (
    <section
      id='search-list'
      className='scroll relative flex-grow px-4 py-4 sm:px-1/10vw'>
      <h4 className='invisible absolute'>노래 목록</h4>
      <p id='search-list__note' className='p-3 text-center text-sm'>
        {listNote}
      </p>

      {allVideoLength > 0 && (
        <ul id='search-list__ul'>
          <li id='search-list__label' className='search-list__li'>
            <h6 className='search-list__li-title'>제목</h6>
            <h6 className='search-list__li-artist'>가수</h6>
            <h6 className='search-list__li-number'>금영 번호</h6>
          </li>

          {videoInfos?.map((v, i) => {
            if (typeof v === 'object') {
              return (
                <li
                  key={`${v.title}`}
                  id={`search-list__li-${i}`}
                  className='search-list__li'>
                  <button
                    type='button'
                    className='search-list__li-click'
                    onClick={(event) => {
                      showSelectedVideo(event, changeVideoArgs)
                    }}>
                    <p className='search-list__li-title'>{v.title}</p>
                    <p className='search-list__li-artist'>{v.artist}</p>
                    <p className='search-list__li-number'>{v.number}</p>
                  </button>
                </li>
              )
            }
            return null
          })}
        </ul>
      )}
    </section>
  )
}