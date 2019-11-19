const esModules = ['lodash-es'].join('|');

module.exports = {
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      isolatedModules: true
    }
  },
  setupFiles: ['<rootDir>/tests/mocks/matchMedia.js'],
  modulePathIgnorePatterns: ['package.json'],
  moduleNameMapper: {
    'lodash-es': 'lodash',
    'ob-ui-libs/(.*)': '<rootDir>/dist/$1',
    '<rootDir>/projects/utils/package.json': '<rootDir>/tests/mocks/jsonMock.json',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
};
