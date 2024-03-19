import { useCallback, useContext, type MouseEvent } from 'react'
import HomeContext from './HomeContext'
import {
  moveTime,
  playPause,
  setVolume,
  showLatestVideo,
} from './controllerFunctions'

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
  } = useContext(HomeContext)

  const buttonOnclick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (id.match('latest') != null) {
        void showLatestVideo(
          setVideoID,
          setVideoTitle,
          setVideoDate,
          setIsPlaying,
        )
      } else if (id.match('playpause') != null) {
        playPause(videoEvent, isPlaying, setIsPlaying)
      } else if (id.match('time') != null) {
        moveTime(event, videoEvent)
      } else if (id.match('volume') != null) {
        setVolume(event, videoEvent)
      }
    },
    [
      id,
      isPlaying,
      setIsPlaying,
      setVideoDate,
      setVideoID,
      setVideoTitle,
      videoEvent,
    ],
  )

  return (
    <button
      type="button"
      id={id}
      className="border border-blue-300 block"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        buttonOnclick(event)
      }}
    >
      {text}
    </button>
  )
}
