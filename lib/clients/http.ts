import axios, {Axios} from 'axios';

export type HttpClient = Axios

const client = axios.create()

export function getClient(): HttpClient {
  return client
}
