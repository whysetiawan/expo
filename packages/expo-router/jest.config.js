const path = require('path');
const {
  getWebPreset,
  //   getNodePreset,
  getIOSPreset,
  //   getAndroidPreset,
} = require('jest-expo/config/getPlatformPreset');
const { withWatchPlugins } = require('jest-expo/config/withWatchPlugins');

function withDefaults({ watchPlugins, ...config }) {
  return {
    ...config,
    roots: ['src'],
    clearMocks: true,
    setupFilesAfterEnv: ['./build/testing-library/mocks.js'],
  };
}

const platformProjects = [
  // Create a new project for each platform.
  getWebPreset(),
  // getNodePreset(),
  getIOSPreset(),
  //   getAndroidPreset(),
].map(withDefaults);

const typeProjects = [
  {
    displayName: require('./package').name + '-types',
    runner: 'jest-runner-tsd',
    testRegex: '/__typetests__/.*(test|spec)\\.[jt]sx?$',
    rootDir: path.resolve(__dirname),
    roots: ['src'],
    globalSetup: '<rootDir>/src/__typetests__/generateFixtures.ts',
  },
];

module.exports = withWatchPlugins({
  projects: [...platformProjects, ...typeProjects],
});
