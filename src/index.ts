import { writeFile } from 'fs'

const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const octaveMin = -1
const octaveMax = 7

const keys: string[] = []
const keyStatuses: { [key: string]: boolean } = {}

for (let octave = octaveMin; octave <= octaveMax; octave++) {
  for (const key of scale) {
    keys.push(`${key}${octave}`)
  }
}

for (const key of keys) {
  keyStatuses[key] = false
}

interface IData {
  ts: number
  key: string
  signal: string
  channel: number
}

const data: IData[] = []

process.stdin.on('data', (chunk: Buffer) => {
  const ts = new Date().getTime()
  const input = chunk.toString()
  const units = input.trim().split(/\s+/)
  const [, channelString, signal, key] = units
  const channel = parseInt(channelString, 10)
  data.push({ ts, channel, key, signal })
  console.log([ts, channel, key, signal].join(','))
})
