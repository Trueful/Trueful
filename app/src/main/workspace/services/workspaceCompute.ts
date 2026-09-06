import { Workspace } from '../../shared/types'

export function isArchivable(
  dormantedTimeMs: number | null,
  nowMs: number,
  archiveThresholdMs: number
): boolean {
  if (dormantedTimeMs == null) {
    return false
  }

  const spaceTime = nowMs - dormantedTimeMs
  const archivable = spaceTime >= archiveThresholdMs ? true : false
  return archivable
}

export function sortByLru(workspaces: Workspace[]): Workspace[] {
  return workspaces.sort((a, b) => b.lastUsedTimeMs - a.lastUsedTimeMs)
}
