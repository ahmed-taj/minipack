// Native
import { basename } from 'path'

// Ours
import { FileSystem } from '../src/types/fs'

export const dir = '/fake/dir'
export const fs = list => new FakeFileSystem(dir, list)
export const mapTrue = list => list.map(e => [e, true])
export const mapFalse = list => list.map(e => [e, false])

/**
 * FAKE FILE SYSTEM
 */
export type FakeEntry = [string, boolean]

export class FakeFileSystem implements FileSystem {
  constructor(private path, private list: FakeEntry[]) {}
  public readdirSync(path) {
    return this.list.map(e => e[0])
  }
  public statSync(path) {
    path = basename(path)
    return {
      isFile: () => this.list.find(e => e[0] === path)[1]
    }
  }
}
