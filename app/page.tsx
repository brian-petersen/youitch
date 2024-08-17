"use client"

import { useEffect, useState } from "react"

type SectionProps = {
  title: string,
  onHide: () => void,
  className?: string,
  children: React.ReactNode,
}

function Section({ title, className, onHide, children }: SectionProps) {
  return (
    <div className={`${className} border rounded flex flex-col`}>
      <div className="py-1.5 px-2 flex border-b">
        <div>{title}</div>
        <button className="ml-auto hover:opacity-70" onClick={onHide}>&#10006;</button>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}

type FooterButtonProps = {
  title: string,
  onClick: () => void,
}

function FooterButton({ title, onClick }: FooterButtonProps) {
  return <button
    className="text-white bg-indigo-500 hover:opacity-70 py-2 px-3 rounded-t"
    onClick={onClick}
  >
    {title}
  </button>
}

type Dispatch = (show: boolean) => void

export default function Home() {
  // TODO improve how the hostname is loaded (don't render anything until it's ready maybe?)
  let [hostname, setHostname] = useState<string | null>(null)

  useEffect(() => {
    setHostname(document.location.hostname)
  }, [])

  const twitchHandle = "emongg"
  const youtubeVideo = "pjcR6O8BES8"

  const [showYoutubeVideo, setShowYoutubeVideo] = useState(true)
  const [showTwitchVideo, setShowTwitchVideo] = useState(true)

  const [showTwitchChat, setShowTwitchChat] = useState(true)
  const [showYoutubeChat, setShowYoutubeChat] = useState(true)

  const handleHide = (dispatch: Dispatch) => () => {
    dispatch(false)
  }

  const handleShow = (dispatch: Dispatch) => () => {
    dispatch(true)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="grow flex gap-2 p-2">
        <div className="grow flex flex-col gap-2">
        {showYoutubeVideo &&<Section
            title="YouTube Video"
            onHide={handleHide(setShowYoutubeVideo)}
            className="grow"
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeVideo}`}
              allowFullScreen
            >
            </iframe>
          </Section>
        }

        {showTwitchVideo && <Section
            title="Twitch Video"
            onHide={handleHide(setShowTwitchVideo)}
            className="grow"
          >
            <iframe
              className="h-full w-full"
              src={`https://player.twitch.tv/?channel=${twitchHandle}&autoplay=false&parent=${hostname}`}
              allowFullScreen
            >
            </iframe>
          </Section>}
        </div>

        {showTwitchChat && <Section
          title="Twitch Chat"
          onHide={handleHide(setShowTwitchChat)}
        >
          <iframe
            className="h-full"
            width="350"
            src={`https://www.twitch.tv/embed/${twitchHandle}/chat?parent=${hostname}`}
          >
          </iframe>
        </Section>}

        {showYoutubeChat &&<Section
          title="YouTube Chat"
          onHide={handleHide(setShowYoutubeChat)}
        >
          <iframe
            className="h-full"
            width="350"
            src={`https://www.youtube.com/live_chat?v=${youtubeVideo}&embed_domain=${hostname}`}
          >
          </iframe>
        </Section>}

      </div>

      <ul className="flex gap-1.5 px-2">
        <li className="grow"></li>
        {!showYoutubeVideo && <FooterButton title="YouTube Video" onClick={handleShow(setShowYoutubeVideo)} />}
        {!showTwitchVideo && <FooterButton title="Twitch Video" onClick={handleShow(setShowTwitchVideo)} />}
        {!showTwitchChat && <FooterButton title="Twitch Chat" onClick={handleShow(setShowTwitchChat)} />}
        {!showYoutubeChat && <FooterButton title="YouTube Chat" onClick={handleShow(setShowYoutubeChat)} />}
      </ul>
    </div>
  )
}
