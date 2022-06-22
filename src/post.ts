import { setFailed } from '@actions/core'
import { mkdirP, mv } from '@actions/io'

import { getVars } from './lib/getVars'
import { isErrorLike } from './lib/isErrorLike'
import log from './lib/log'

async function post(): Promise<void> {
  try {
    const result = getVars()
    const { cacheDir, targetPath, cachePath } = result
    log.info(`getVars ${JSON.stringify(result)}`)
    await mkdirP(cacheDir)
    await mv(targetPath, cachePath, { force: true })
  } catch (error: unknown) {
    log.trace(error)
    setFailed(isErrorLike(error) ? error.message : `unknown error: ${error}`)
  }
}

void post()
