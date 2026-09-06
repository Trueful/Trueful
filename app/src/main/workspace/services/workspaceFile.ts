import fs from 'fs'

class WorkspaceFileError extends Error {
  path: string
  error: NodeJS.ErrnoException

  constructor(path: string, error: NodeJS.ErrnoException) {
    super(error.message)
    this.path = path
    this.error = error
  }
}

export function writeJsonFile(path: string, data: unknown): string {
  const tempPath = path + '.tmp'
  const returnJson = JSON.stringify(data)
  try {
    fs.writeFileSync(tempPath, returnJson)
    fs.renameSync(tempPath, path)
  } catch (error) {
    throw new WorkspaceFileError(path, error as NodeJS.ErrnoException)
  }
  return path
}
