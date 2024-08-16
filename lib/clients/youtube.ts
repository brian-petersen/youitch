import axios from "axios";

const CANONICAL_URL =
  /<link rel="canonical" href="https:\/\/www.youtube.com\/watch\?v=(.+?)">/g;

// This function comes from
// https://stackoverflow.com/questions/32454238/how-to-check-if-youtube-channel-is-streaming-live
export async function getLiveVideoIdByChannelId(
  channelId: string,
): Promise<string | null> {
  console.log("Performing GET to YouTube");

  const url = `https://youtube.com/channel/${channelId}/live`;
  const res = await axios.get(url);

  console.log("YouTube status: " + res.status);

  const extract = CANONICAL_URL.exec(res.data);

  if (!extract) {
    return null;
  }

  const [_, videoId] = extract;

  return videoId;
}
