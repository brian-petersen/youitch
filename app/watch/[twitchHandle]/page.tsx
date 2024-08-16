import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import LivePortal from "@/app/components/LivePortal";
import {
  getCachedLiveYoutubeVideoIdByChannelId,
  getCachedCreators,
  getNameByTwitchHandle,
} from "@/lib/streams";

export function generateMetadata({ params }: WatchProps): Metadata {
  const name = getNameByTwitchHandle(params.twitchHandle);

  return {
    title: `${name} on youitch`,
  };
}

type WatchProps = {
  params: {
    twitchHandle: string;
  };
};

export default async function Watch({ params: { twitchHandle } }: WatchProps) {
  const creators = getCachedCreators();
  const creator = creators.find((c) => c.twitchHandle === twitchHandle);

  if (!creator) {
    notFound();
  }

  const youtubeVideoId = await getCachedLiveYoutubeVideoIdByChannelId(
    creator.youtubeChannelId,
  );

  const hostname = getHostname();

  return (
    <div className="h-screen flex flex-col">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-primary text-xl mt-3 ml-3"
        >
          {creator.name}
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {creators.map((c) => (
            <li key={c.twitchHandle}>
              <a href={`/watch/${c.twitchHandle}`}>{c.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <LivePortal
        twitchHandle={creator.twitchHandle}
        youtubeVideoId={youtubeVideoId}
        hostname={hostname}
      />
    </div>
  );
}

function getHostname(): string {
  const host = headers().get("host");

  if (!host) {
    console.warn("No host header provided");
    notFound();
  }

  return host.split(":")[0];
}
