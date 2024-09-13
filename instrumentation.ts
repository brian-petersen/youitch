import { buildClients } from "./lib/startup";

export async function register() {
  await buildClients()
}
