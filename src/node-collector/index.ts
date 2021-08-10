const EventEmitter = require('events').EventEmitter
const dump1090 = require('../../node_modules/node-dump1090/build/Release/dump1090.node')
const NativeEmitter = dump1090.NativeEmitter
const inherits = require('util').inherits
inherits(NativeEmitter, EventEmitter)

const emitter = new NativeEmitter()

emitter.on('data', (evt: any) => {
  console.log(evt)
})

emitter.callAndEmit()
