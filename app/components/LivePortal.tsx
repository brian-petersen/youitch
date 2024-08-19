"use client";

import { useState } from "react";

type SectionProps = {
  title: React.ReactNode;
  onHide: () => void;
  className?: string;
  children: React.ReactNode;
};

function Section({ title, className, onHide, children }: SectionProps) {
  return (
    <div
      className={`${className} border border-neutral-content rounded flex flex-col`}
    >
      <div className="py-1.5 px-2 flex">
        <div>{title}</div>
        <button
          className="ml-auto text-2xl leading-[0] hover:opacity-70"
          onClick={onHide}
        >
          &times;
        </button>
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}

type FooterButtonProps = {
  title: string;
  onClick: () => void;
};

function FooterButton({ title, onClick }: FooterButtonProps) {
  return (
    <button
      className="btn btn-outline rounded-b-none border-b-0"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

type LivePortalProps = {
  hostname: string;
  twitchHandle: string;
  youtubeVideo: string;
};

type Dispatch = (show: boolean) => void;

export default function LivePortal({
  hostname,
  twitchHandle,
  youtubeVideo,
}: LivePortalProps) {
  const [showYoutubeVideo, setShowYoutubeVideo] = useState(true);
  const [showTwitchVideo, setShowTwitchVideo] = useState(false);

  const [showTwitchChat, setShowTwitchChat] = useState(true);
  const [showYoutubeChat, setShowYoutubeChat] = useState(true);

  const handleHide = (dispatch: Dispatch) => () => {
    dispatch(false);
  };

  const handleShow = (dispatch: Dispatch) => () => {
    dispatch(true);
  };

  return (
    <div className="grow flex flex-col">
      <div className="grow flex gap-3 p-3">
        <div className="grow flex flex-col gap-3">
          {showYoutubeVideo && (
            <Section
              title={
                <a
                  className="link"
                  href={`https://www.youtube.com/watch?v=${youtubeVideo}`}
                >
                  YouTube Video
                </a>
              }
              onHide={handleHide(setShowYoutubeVideo)}
              className="grow"
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeVideo}`}
                allowFullScreen
              ></iframe>
            </Section>
          )}

          {showTwitchVideo && (
            <Section
              title={
                <a
                  className="link"
                  href={`https://www.twitch.tv/${twitchHandle}`}
                >
                  Twitch Video
                </a>
              }
              onHide={handleHide(setShowTwitchVideo)}
              className="grow"
            >
              <iframe
                className="h-full w-full"
                src={`https://player.twitch.tv/?channel=${twitchHandle}&autoplay=false&parent=${hostname}`}
                allowFullScreen
              ></iframe>
            </Section>
          )}
        </div>

        {showTwitchChat && (
          <Section title="Twitch Chat" onHide={handleHide(setShowTwitchChat)}>
            <iframe
              className="h-full"
              width="350"
              src={`https://www.twitch.tv/embed/${twitchHandle}/chat?darkpopout&parent=${hostname}`}
            ></iframe>
          </Section>
        )}

        {showYoutubeChat && (
          <Section title="YouTube Chat" onHide={handleHide(setShowYoutubeChat)}>
            <iframe
              className="h-full"
              width="350"
              src={`https://www.youtube.com/live_chat?v=${youtubeVideo}&embed_domain=${hostname}&dark_theme=1`}
            ></iframe>
          </Section>
        )}
      </div>

      <ul className="flex gap-3 px-3">
        {!showYoutubeVideo && (
          <FooterButton
            title="YouTube Video"
            onClick={handleShow(setShowYoutubeVideo)}
          />
        )}

        {!showTwitchVideo && (
          <FooterButton
            title="Twitch Video"
            onClick={handleShow(setShowTwitchVideo)}
          />
        )}

        <li className="grow"></li>

        {!showTwitchChat && (
          <FooterButton
            title="Twitch Chat"
            onClick={handleShow(setShowTwitchChat)}
          />
        )}

        {!showYoutubeChat && (
          <FooterButton
            title="YouTube Chat"
            onClick={handleShow(setShowYoutubeChat)}
          />
        )}
      </ul>
    </div>
  );
}
