#!/usr/bin/env node

const path = require('path'),
  fs = require('fs-extra');

const PACKAGE_ROOT = path.join(__dirname, '..');
const DIST_PATH = path.join(PACKAGE_ROOT, 'dist');

async function run() {
  try {
    const { name, version, license } = await fs.readJson(path.join(PACKAGE_ROOT, 'package.json'));

    await fs.outputJson(path.join(DIST_PATH, 'package.json'), {
      name,
      version,
      license
    });
    await fs.copy(path.join(PACKAGE_ROOT, 'LICENSE'), path.join(DIST_PATH, 'LICENSE'));

    console.info('package.json and License updated');
  } catch (error) {
    console.error(error);
  }
}

run();
