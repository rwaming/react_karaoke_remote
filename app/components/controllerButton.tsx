import { useCallback, useContext, useRef, type MouseEvent } from 'react'
import { type ButtonType } from '@/utils/Types'
import playPause from '@/controller/playPause'
import searchBoxOpen from '@/controller/searchBoxOpen'
import showLatestVideo from '@/controller/showLatestVideo'
import stopVideo from '@/controller/stopVideo'
import moveTime from '@/controller/moveTime'
import setVolume from '@/controller/setVolume'
import setSpeed from '@/controller/setSpeed'
import applause from '@/controller/applause'
import AppContext from '@/utils/AppContext'
import ApplauseAudios from '@/components/controllerApplauseAudios'

export default function ControllerButton({
  id,
  text,
}: {
  id: string
  text: string
}): JSX.Element {
  const {
    videoEvent,
    setVideoID,
    setVideoTitle,
    setVideoDate,
    isPlaying,
    setIsPlaying,
    playerRef,
    controllerRef,
    searchRef,
    searchModalRef,
  } = useContext(AppContext)

  const applauseRef1 = useRef(null)
  const applauseRef2 = useRef(null)
  const applauseRef3 = useRef(null)
  const applauseRef4 = useRef(null)

  const setControll = useCallback(
    (event: MouseEvent<ButtonType>) => {
      void (
        id.includes('latest') &&
        showLatestVideo(setVideoID, setVideoTitle, setVideoDate, setIsPlaying)
      )
      id.includes('search') &&
        searchBoxOpen(playerRef, controllerRef, searchRef, searchModalRef)
      id.includes('playpause') && playPause(videoEvent, isPlaying, setIsPlaying)
      id.includes('stop') && stopVideo(videoEvent, setIsPlaying)
      id.includes('time') && moveTime(event, videoEvent)
      id.includes('volume') && setVolume(event, videoEvent)
      id.includes('speed') && setSpeed(event, videoEvent)
      id.includes('applause') &&
        applause([applauseRef1, applauseRef2, applauseRef3, applauseRef4])
    },
    [
      controllerRef,
      id,
      isPlaying,
      playerRef,
      searchModalRef,
      searchRef,
      setIsPlaying,
      setVideoDate,
      setVideoID,
      setVideoTitle,
      videoEvent,
    ],
  )
  return (
    <>
      <button
        type="button"
        id={id}
        className={`${id.includes('latest') ? 'text-xs' : 'text-2xl'}`}
        onClick={(event: MouseEvent<ButtonType>) => {
          setControll(event)
        }}
      >
        {text}
      </button>

      {id.includes('applause') && (
        <ApplauseAudios
          audioRefs={[applauseRef1, applauseRef2, applauseRef3, applauseRef4]}
          id={id}
        />
      )}
    </>
  )
}