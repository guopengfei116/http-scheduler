const presets = [
  [
    "@babel/env",
    {
      "modules": 'commonjs',
      "targets": {
        "node": "8",
      },
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": 2,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }
  ],
  [
    "@babel/plugin-proposal-class-properties",
    { "loose": true },
  ],
];

module.exports = (api) => {
  api.cache(true);
  return { presets, plugins };
};
