import * as path from 'path'
import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'

import AsserterBase from './base'

const mergeYaml = require('merge-yaml')

export class YamlHasPropertiesAsserter extends AsserterBase {
  protected async uniqWork() {
    const targetYamlPath = path.join(this.workingDir, this.assertion.target_relative_filepath)
    const sourceYamlPath = path.join(this.templateDir, this.assertion.source_relative_filepath)
    const assertedJson = mergeYaml([targetYamlPath, sourceYamlPath])
    const assertedYaml = yaml.dump(assertedJson, {indent: 2})
    await fs.writeFile(targetYamlPath, assertedYaml)
  }
}
