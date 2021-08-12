const EventEmitter = require('events').EventEmitter
const dump1090 = require('../../node_modules/node-dump1090/build/Release/dump1090.node')
const NativeEmitter = dump1090.NativeEmitter
const inherits = require('util').inherits
inherits(NativeEmitter, EventEmitter)

interface Recording {
  id: number
  hex: string
  flight: string
  lat: number
  lon: number
  altitude: number
  track: number
  speed: number
}

const knex = require('knex')({
  client: 'postgres',
  connection: async () => {
    return {
      host: '0.0.0.0',
      user: 'postgres',
      password: 'postgres',
      database: 'flight-data',
    }
  },
})

const emitter = new NativeEmitter()

emitter.on('data', (evt: any) => {
  console.log(evt)
  knex('recording').insert(evt)
})

emitter.callAndEmit()
