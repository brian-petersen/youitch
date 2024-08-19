import { notFound } from "next/navigation";
import { headers } from "next/headers";

import LivePortal from "../../components/LivePortal";

const creators = [
  {
    name: "Emongg",
    twitchHandle: "emongg",
    youtubeVideo: "pjcR6O8BES8",
  },
  {
    name: "Jay3",
    twitchHandle: "jay3",
    youtubeVideo: "pjcR6O8BES8",
  },
  {
    name: "ThePrimagen",
    twitchHandle: "theprimeagen",
    youtubeVideo: "eRb3pD5tDN0",
  },
  {
    name: "HealthyGamerGG",
    twitchHandle: "healthygamer_gg",
    youtubeVideo: "X-s6WeLOOck",
  },
];

type WatchProps = {
  params: {
    twitchHandle: string;
  };
};

export default function Watch({ params: { twitchHandle } }: WatchProps) {
  const creator = creators.find((c) => c.twitchHandle === twitchHandle);

  if (!creator) {
    notFound();
  }

  const { name, youtubeVideo } = creator;

  const hostname = getHostname();

  return (
    <div className="h-screen flex flex-col">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-primary text-xl mt-3 ml-3"
        >
          {name}
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
        twitchHandle={twitchHandle}
        youtubeVideo={youtubeVideo}
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
