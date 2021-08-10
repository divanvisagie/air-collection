import fs from 'fs'
import path from 'path'
import os from 'os'
import { head, tail } from 'ramda'

type RawEntry = string[]

const INPUT_PATH = path.join(__dirname, '..', '..', '..', 'log/adbs.log')
const OUTPUT_PATH = path.join(__dirname, '..', '..', '..', 'data/processed.json')

function readStringFromFile(): string {
    const content = fs.readFileSync(INPUT_PATH).toString()
    return content
}

function rawEntryToEntry(raw: RawEntry) {
    const trimmed = raw.map(x => x.trim())
    const h = head(trimmed)?.split(';')[0] ?? ''

    const originalObject: Record<string, string> = {}

    const t = tail(trimmed)
        .map(ti => ti.split(':')
            .map(x => x.trim())
        ).reduce((acc, r) => {
            acc[r[0]] = r[1]
            return acc
        }, originalObject)

    return {
        id: h,
        ...t,
    }
}

const contents = readStringFromFile()
const entries = contents.split('*')
    .map(x => x.split(os.EOL))
    .map(x => rawEntryToEntry(x))
console.dir(entries)

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2))