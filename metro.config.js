// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
module.exports = (() => {
    const config = getDefaultConfig(__dirname);
  
    config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
    config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
    config.resolver.sourceExts.push('svg');
  
    return config;
  })();