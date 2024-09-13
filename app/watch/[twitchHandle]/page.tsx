import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getKnownCreators, isKnownCreator } from "@/lib/creators";
import LivePortal from "../../components/LivePortal";
import { getGlobalClients } from "@/lib/startup";

type WatchProps = {
  params: {
    twitchHandle: string;
  };
};

export default async function Watch({ params: { twitchHandle } }: WatchProps) {
  if (!isKnownCreator(twitchHandle)) {
    notFound();
  }

  const hostname = getHostname();

  const { twitchClient } = getGlobalClients()
  const [creators, error] = await getKnownCreators(twitchClient);
  if (creators === null) {
    throw new Error(`Failed to load creators: ${error}`)
  }

  const creator = creators.find(c => c.twitchHandle === twitchHandle);
  if (!creator) {
    throw new Error('Failed to find creator in list after verified as known')
  }

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
        creator={creator}
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
