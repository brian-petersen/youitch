"use client"

import { useState } from "react"

type SectionProps = {
  title: string,
  show: boolean,
  onHide: () => void,
  onShow: () => void,
  className?: string,
  children: React.ReactNode,
}

function Section({ title, show, className, onHide, onShow, children }: SectionProps) {
  if (!show) {
    return <p onClick={onShow}>hidden</p>
  }

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

type Dispatch = (show: boolean) => void

export default function Home() {
  const hostname = document.location.hostname

  const twitchHandle = "emongg"
  const youtubeVideo = "7EiK8PMccwQ"

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
    <div className="h-screen flex gap-2 p-2">
      <div className="grow flex flex-col gap-2">
        <Section
          title="YouTube Video"
          show={showYoutubeVideo}
          onHide={handleHide(setShowYoutubeVideo)}
          onShow={handleShow(setShowYoutubeVideo)}
          className="grow"
        >
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeVideo}`}
            allowFullScreen
          >
          </iframe>
        </Section>

        <Section
          title="Twitch Video"
          show={showTwitchVideo}
          onHide={handleHide(setShowTwitchVideo)}
          onShow={handleShow(setShowTwitchVideo)}
          className="grow"
        >
          <iframe
            className="h-full w-full"
            src={`https://player.twitch.tv/?channel=${twitchHandle}&autoplay=false&parent=${hostname}`}
            allowFullScreen
          >
          </iframe>
        </Section>
      </div>

      <Section
        title="Twitch Chat"
        show={showTwitchChat}
        onHide={handleHide(setShowTwitchChat)}
        onShow={handleShow(setShowTwitchChat)}
      >
        <iframe
          className="h-full"
          width="350"
          src={`https://www.twitch.tv/embed/${twitchHandle}/chat?parent=${hostname}`}
        >
        </iframe>
      </Section>

      <Section
        title="YouTube Chat"
        show={showYoutubeChat}
        onHide={handleHide(setShowYoutubeChat)}
        onShow={handleShow(setShowYoutubeChat)}
      >
        <iframe
          className="h-full"
          width="350"
          src={`https://www.youtube.com/live_chat?v=${youtubeVideo}&embed_domain=${hostname}`}
        >
        </iframe>
      </Section>
    </div>
  )
}
