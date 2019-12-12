#!/usr/bin/env node
const path = require('path'),
  fs = require('fs-extra'),
  minimist = require('minimist'),
  options = minimist(process.argv.slice(2)),
  SCSSBundle = require('scss-bundle');

const PACKAGE_ROOT = path.join(__dirname, '..');

async function run() {
  try {
    if (!options.project) {
      throw new Error('We must know the project name e.g: "./bundleSass --project gdpr"');
    }
    console.info(`Building SASS file for ${options.project} project`);

    // making sure the dist exists
    await fs.access(path.resolve(PACKAGE_ROOT, 'dist', options.project));

    const dumpFile = path.resolve(PACKAGE_ROOT, 'dist', options.project, 'main.scss');
    const projectDirectory = path.resolve(PACKAGE_ROOT, 'projects', options.project);
    const entryPoint = path.resolve(projectDirectory, 'main.scss');
    const bundler = new SCSSBundle.Bundler(undefined, projectDirectory);
    // Relative file path to project directory path.
    const result = await bundler.bundle(
      entryPoint,
      [],
      [
        path.resolve(PACKAGE_ROOT, 'projects/utils/src/lib/scss'),
        path.resolve(PACKAGE_ROOT, 'projects/utils/src/lib/scss/mixins')
      ]
    );
    await fs.writeFile(dumpFile, result.bundledContent);
    console.info(`${dumpFile} created`);
  } catch (error) {
    console.error(error);
  }
}

run();
