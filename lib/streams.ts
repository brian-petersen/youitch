import { getLiveVideoIdByChannelId } from "./clients/youtube";

const CREATOR_FIXED_DETAILS = [
  {
    name: "Emongg",
    twitchHandle: "emongg",
    youtubeChannelId: "UCAtmNvxD7eOs_kwxm-zzoMQ",
  },
  {
    name: "mL7",
    twitchHandle: "ml7support",
    youtubeChannelId: "UCejVlAl2kUwBgSHtQeBoKhQ",
  },
  {
    name: "Jay3",
    twitchHandle: "jay3",
    youtubeChannelId: "UCoKKe0XN5Zc1lSTi1_utNOw",
  },
  {
    name: "ThePrimagen",
    twitchHandle: "theprimeagen",
    youtubeChannelId: "UCUyeluBRhGPCW4rPe_UvBZQ",
  },
  {
    name: "PirateSoftware",
    twitchHandle: "piratesoftware",
    youtubeChannelId: "UCMnULQ6F6kLDAHxofDWIbrw",
  },
  {
    name: "HealthyGamerGG",
    twitchHandle: "healthygamer_gg",
    youtubeChannelId: "UClHVl2N3jPEbkNJVx-ItQIQ",
  },
];

type Creator = {
  name: string;
  twitchHandle: string;
  twitchStreamingStatus: "streaming" | "notStreaming" | "unknown";
  youtubeChannelId: string;
};

export function getCachedCreators(): Creator[] {
  return CREATOR_FIXED_DETAILS.map((c) => {
    return {
      ...c,
      twitchStreamingStatus: "unknown",
    };
  });
}

export function getNameByTwitchHandle(handle: string): string | null {
  return (
    CREATOR_FIXED_DETAILS.find((c) => c.twitchHandle === handle)?.name || null
  );
}

const liveYoutubeVideoIdsCache = new Map();

export async function getCachedLiveYoutubeVideoIdByChannelId(
  channelId: string,
): Promise<string | null> {
  if (liveYoutubeVideoIdsCache.has(channelId)) {
    console.log("Using cached live YouTube videoId");
    return liveYoutubeVideoIdsCache.get(channelId);
  }

  const videoId = await getLiveVideoIdByChannelId(channelId);
  liveYoutubeVideoIdsCache.set(channelId, videoId);

  return videoId;
}
