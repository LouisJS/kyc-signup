module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push('nativewind/babel');

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
