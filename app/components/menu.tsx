'use client'

import { useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type Button, type Div } from '../utils/Types'

export default function Menu(): JSX.Element {
  const router = useRouter()
  const menuRef = useRef<Div>(null)
  const menuModalRef = useRef<Button>(null)
  let menuCloseWait: NodeJS.Timeout

  const menuOpen = useCallback(() => {
    const menu = menuRef.current
    const menuModal = menuModalRef.current
    if (menu !== null && menuModal !== null) {
      menu.classList.add('menu__opened')
      menuModal.classList.remove('menu-modal__closed')
      menuModal.classList.add('menu-modal__opened')
    }
  }, [])

  const menuClose = useCallback(() => {
    const menu = menuRef.current
    const menuModal = menuModalRef.current
    if (menu !== null && menuModal !== null) {
      menu.classList.remove('menu__opened')
      menuModal.classList.remove('menu-modal__opened')
      menuModal.classList.add('menu-modal__closed')
    }
  }, [])

  return (
    <section id='menu'>
      <button
        ref={menuModalRef}
        type='button'
        className='menu-modal menu-modal__closed absolute -left-4 -top-4 z-40 h-dvh w-dvw bg-slate-900 bg-opacity-50 text-transparent sm:-left-5'
        onClick={menuClose}>
        메뉴 닫기
      </button>
      <button
        type='button'
        className='menu-open absolute left-0 top-0 z-50 h-8 w-20 overflow-hidden whitespace-nowrap text-transparent'
        onMouseEnter={() => {
          if (window.innerWidth > 640) {
            menuOpen()
          }
        }}
        onClick={() => {
          if (window.innerWidth < 640) {
            menuOpen()
          } else {
            router.push('/homekono')
          }
        }}>
        메뉴 열기, 홈으로 이동
      </button>
      <nav
        ref={menuRef}
        id='menu-box'
        className='menu-box absolute z-40 h-dvh w-2/3dvw bg-deep xs:w-1/2dvw sm:w-2/5dvw md:w-1/3dvw'
        onMouseEnter={() => {
          if (window.innerWidth > 640) {
            clearTimeout(menuCloseWait)
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth > 640) {
            menuCloseWait = setTimeout(menuClose, 3000)
          }
        }}>
        {/* <ul>
          <li>홈코노</li>
          <li>RWAM</li>
        </ul> */}
        <address className='menu-contact absolute bottom-0 mb-4 flex w-full flex-col items-center justify-end text-xs not-italic sm:hidden'>
          <div className='menu-contact-sns flex items-center gap-4'>
            <Link
              href='https://www.instagram.com/rwam__kn'
              target='_blank'
              aria-label='menu-contact-sns__instagram'>
              <Image
                id='menu-contact-sns__instagram'
                src='/icon_instagram.png'
                width={40}
                height={40}
                alt='contact_instagram'
                className='h-4 w-4'
              />
            </Link>
            <Link
              href='https://blog.naver.com/rwaming'
              target='_blank'
              aria-label='menu-contact-sns__naver-blog'>
              <Image
                id='menu-contact-sns__naver-blog'
                src='/icon_naver.png'
                width={40}
                height={40}
                alt='contact_naver_blog'
                className='h-4 w-4'
              />
            </Link>
            <Link
              href='https://github.com/rwaming/next_karaoke_remote'
              target='_blank'
              aria-label='menu-contact-sns__github'>
              <Image
                id='menu-contact-sns__github'
                src='/icon_github.png'
                width={40}
                height={40}
                alt='contact_github'
                className='h-4 w-4'
              />
            </Link>
          </div>

          <div className='menu-contact-more mt-3 flex h-full min-w-10 grow flex-col items-center'>
            <button
              type='button'
              className='h-4 w-10 overflow-hidden whitespace-nowrap opacity-100'>
              + more
            </button>
            <div className='mb-3 flex h-0 flex-col items-center overflow-hidden whitespace-nowrap text-center opacity-0'>
              <p>art.rwam@gmail.com</p>
              <p className='mt-2'>+82 10-9716-1132</p>
            </div>
          </div>
        </address>
      </nav>
    </section>
  )
}
