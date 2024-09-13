import { z } from "zod";

const configSchema = z.object({
  GOOGLE_API_KEY: z.string().nullable().default(null),
  TWITCH_CLIENT_ID: z.string().nullable().default(null),
  TWITCH_CLIENT_SECRET: z.string().nullable().default(null),
})
const parseResult = configSchema.safeParse(process.env)

export type Config = z.infer<typeof configSchema>

export function getConfig(): [Config, null] | [null, string] {
  if (parseResult.success) {
    return [parseResult.data as Config, null]
  }

  return [null, parseResult.error.toString()]
}
