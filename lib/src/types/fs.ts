/**
 * General File System interface
 */
export interface FileSystem {
  readdirSync: (dir: string) => string[]

  statSync(
    path: string
  ): {
    isFile: () => boolean
  }
}
