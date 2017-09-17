import { FakeFileSystem } from '../helpers'

export const dir = '/fake/dir'
export const fs = list => new FakeFileSystem(dir, list)
export const mapTrue = list => list.map(e => [e, true])
export const mapFalse = list => list.map(e => [e, false])
