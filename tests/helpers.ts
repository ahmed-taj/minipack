// Native
import { basename } from 'path'

// Ours
import { FileSystem } from '../src/utils/entry'

/**
 * FAKE FILE SYSTEM
 */
export type FakeEntry = [string, boolean]

export class FakeFileSystem implements FileSystem {
  constructor(private dir, private list: FakeEntry[]) {
  }
  public readdirSync(dir) {
    return this.list.map(e => e[0])
  }
  public statSync(path) {
    path = basename(path)
    return {
      isFile: () => this.list.find(e => e[0] == path)[1]
    }
  }
}
