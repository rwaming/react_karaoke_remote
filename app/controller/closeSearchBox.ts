import { type MutableRefObject } from 'react'

export default function closeSearchBox(
  playerRef: MutableRefObject<HTMLDivElement | null> | null,
  searchRef: MutableRefObject<HTMLDivElement | null> | null,
  controllerRef: MutableRefObject<HTMLDivElement | null> | null,
): void {
  const player: HTMLDivElement | null = playerRef?.current ?? null
  const search: HTMLDivElement | null = searchRef?.current ?? null
  const controller: HTMLDivElement | null = controllerRef?.current ?? null

  if (search !== null && player !== null && controller !== null) {
    search.classList.add('hidden')
    search.classList.remove('flex')
    player.classList.remove('player-search')
    controller.classList.remove('controller-search')
  }
}