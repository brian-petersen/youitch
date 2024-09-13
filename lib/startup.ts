import { getClient, HttpClient } from "./clients/http";
import { TwitchClient } from "./clients/twitch";
import { getConfig } from "./config";

let globalHttpClient: HttpClient;
let globalTwitchClient: TwitchClient | null;

export async function buildClients() {
  console.log('Building global clients')

  const [config, configErr] = getConfig();
  if (configErr !== null) {
    console.warn(`Failed to get config: ${configErr}`)
  }

  const httpClient = getClient()
  globalHttpClient = httpClient

  if (config !== null) {
    const [twitchClient, twitchErr] = await TwitchClient.fromClientCreds(config, httpClient);
    globalTwitchClient = twitchClient

    if (twitchErr !== null) {
      console.warn(`Failed to build twitch client: ${twitchErr}`)
    }
  }
}

export function getGlobalClients() {
  return {
    httpClient: globalHttpClient,
    twitchClient: globalTwitchClient,
  }
}
