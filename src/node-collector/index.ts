import { EventEmitter } from 'events'
import { inherits } from 'util'
import { Client } from 'pg'

const dump1090 = require('../../node_modules/node-dump1090/build/Release/dump1090.node')
const NativeEmitter = dump1090.NativeEmitter
inherits(NativeEmitter, EventEmitter)

const createSqlClient = async (): Promise<Client> => {
  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'flight-data',
  })
  await client.connect()
  return client
}

const insertRecording = async (
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

interface Recording {
  hex: string
  flight: string
  lat: number
  lon: number
  altitude: number
  track: number
  speed: number
}
const emitter = new NativeEmitter()

const test: Recording[] = [
  {
    hex: '009993',
    flight: 'SFR  ',
    lat: -29.797897,
    lon: 31.129074,
    altitude: 10275,
    track: 49,
    speed: 292,
  },
]

async function main() {
  const client = await createSqlClient()
  insertRecording(client, test[0])

  emitter.on('data', (evt: any) => {
    console.log(evt)
    const records = evt as Recording[]
    records.forEach((x) => {
      insertRecording(client, x)
    })
  })

  emitter.callAndEmit()
}
main()
