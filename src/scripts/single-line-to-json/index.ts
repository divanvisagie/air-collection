import fs from 'fs'
import path from 'path'
import os from 'os'

const INPUT_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'data',
  'basic-ac-db.json',
)

const OUTPUT_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'data',
  'aircraft-db.json',
)

function readFileContent(): string {
  return fs.readFileSync(INPUT_PATH).toString()
}

const entries = readFileContent().split(os.EOL)
const joined = entries.join(`,${os.EOL}`)
const wrapped = `[${os.EOL}${joined}${os.EOL}]`

fs.writeFileSync(OUTPUT_PATH, wrapped)
