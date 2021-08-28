import { Client } from 'pg'
import Recording from './Recording'

export const createSqlClient = async (): Promise<Client> => {
  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'flight-data',
  })
  await client.connect()
  return client
}

export const insertRecording = async (
  client: Client,
  { hex, flight, lat, lon, altitude, track, speed }: Recording,
) => {
  const queryText =
    'INSERT INTO recording(hex,flight,lat,lon,altitude,track,speed) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id'
  const result = await client.query(queryText, [
    hex,
    flight,
    lat,
    lon,
    altitude,
    track,
    speed,
  ])
  console.log('Inserted', result)
}

export const insertRecordingBatch = async (
  client: Client,
  recordings: Recording[],
) => {
  return await Promise.all(recordings.map((r) => insertRecording(client, r)))
}
