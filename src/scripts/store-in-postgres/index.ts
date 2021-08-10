import { Client } from 'pg'

const client = new Client()

async function createCaptureTable() {}

async function main() {
  await client.connect()
}
