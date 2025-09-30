const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add path aliases
config.resolver.alias = {
  '@/components': './components',
  '@/services': './services',
  '@/utils': './utils',
  '@/types': './types',
  '@/constants': './constants',
  '@/hooks': './hooks',
};

module.exports = config;
