import { EventEmitter } from 'events'
import { inherits } from 'util'
import Recording from './Recording'
import { createSqlClient, insertRecordingBatch } from './recordingRepository'

const dump1090 = require('../../node_modules/node-dump1090/build/Release/dump1090.node')
const NativeEmitter = dump1090.NativeEmitter
inherits(NativeEmitter, EventEmitter)

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
  insertRecordingBatch(client, test)

  emitter.on('data', (evt: any) => {
    console.log(evt)
    const records = evt as Recording[]
    insertRecordingBatch(client, records).then((x) => {
      console.log('---> Records written')
    })
  })

  emitter.callAndEmit()
}
main()
