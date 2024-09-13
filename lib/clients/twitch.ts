import { URLSearchParams } from "url";
import { Config } from "../config";
import { HttpClient } from "./http";

type IsStreamingResponse = {
  data: { user_login: string }[];
}

export class TwitchClient {
  // TODO there's no way to refresh the bearer token once this class
  // is instantiated. Could cause a problem later on, but we're good for now.
  constructor(private client: HttpClient, private clientId: string, private bearerToken: string) { }

  static async fromClientCreds(config: Config, client: HttpClient): Promise<[TwitchClient, null] | [null, string]> {
    if (config.TWITCH_CLIENT_ID === null || config.TWITCH_CLIENT_SECRET === null) {
      return [null, 'Missing needed twitch env vars']
    }

    const clientId = config.TWITCH_CLIENT_ID
    const clientSecret = config.TWITCH_CLIENT_SECRET

    try {
      const res = await client.post('https://id.twitch.tv/oauth2/token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      })

      const bearerToken = res.data.access_token

      if (typeof bearerToken !== 'string') {
        return [null, `Unexpected response from Twitch`]
      }

      return [new TwitchClient(client, clientId, bearerToken), null]
    } catch (error) {
      return [null, `Failed to get bearer token: ${error}`]
    }
  }

  async isStreaming(userLogins: string[]): Promise<[string[], null] | [null, string]> {
    if (userLogins.length > 100) {
      return [null, "Cannot request more than 100 user logins at a time"]
    }

    const params = new URLSearchParams()
    userLogins.forEach(l => params.append('user_login', l))

    try {
      const res = await this.client.get<IsStreamingResponse>('https://api.twitch.tv/helix/streams?type=live&first=100', {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Client-Id': this.clientId,
        },
        params,
      })

      return [res.data.data.map(d => d.user_login), null]
    } catch (error) {
      return [null, `Failed to get streaming statuses: ${error}`]
    }
  }
}
