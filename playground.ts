import { getClient } from "./lib/clients/http";
import { TwitchClient } from "./lib/clients/twitch";
import { getConfig } from "./lib/config";

async function main() {

  const [config, configErr] = getConfig()
  if (configErr !== null) {
    throw new Error(configErr)
  }

  const client = getClient()

  let [twitchClient, twitchErr] = await TwitchClient.fromClientCreds(config, client)
  if (twitchErr !== null) {
    throw new Error(twitchErr)
  }

  console.log(await twitchClient?.isStreaming(['emongg', 'flatts']))
}

main()
