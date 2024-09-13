import { TwitchClient } from "./clients/twitch";

const KNOWN_CREATORS = [
  {
    name: 'ml7support',
    twitchHandle: 'ml7support',
  },
  {
    name: "Emongg",
    twitchHandle: "emongg",
    // youtubeVideo: "pjcR6O8BES8",
  },
  {
    name: "Jay3",
    twitchHandle: "jay3",
    // youtubeVideo: "pjcR6O8BES8",
  },
  {
    name: "ThePrimagen",
    twitchHandle: "theprimeagen",
    // youtubeVideo: "eRb3pD5tDN0",
  },
  {
    name: "HealthyGamerGG",
    twitchHandle: "healthygamer_gg",
    // youtubeVideo: "X-s6WeLOOck",
  },
]

export type StreamStatus =
  | 'streaming'
  | 'offline'
  | 'unknown'

export type Creator = {
  name: string;
  twitchHandle: string;
  // youtubeHandle: string;
  youtubeVideoId: string | null;
  twitchStatus: StreamStatus;
  youtubeStatus: StreamStatus;
}

export async function getKnownCreators(twitchClient: TwitchClient | null): Promise<[Creator[], string | null] | [null, string]> {
  // twitchClient.isStreaming(CREATORS.map(c => c.twitchHandle));

  const creators: Creator[] = KNOWN_CREATORS.map(c => {
    return {
      name: c.name,
      twitchHandle: c.twitchHandle,
      youtubeVideoId: null,
      twitchStatus: 'unknown',
      youtubeStatus: 'unknown',
    }
  })

  return [creators, null];
}

export async function isKnownCreator(twitchHandle: string): Promise<boolean> {
  return KNOWN_CREATORS.find(c => c.twitchHandle === twitchHandle) !== undefined
}
