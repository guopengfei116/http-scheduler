const presets = [
  [
    "@babel/env",
    {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 11"],
        "node": "8",
      },
      corejs: 2,
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  // [
  //   "@babel/plugin-transform-runtime",
  //   {
  //     "corejs": 2,
  //     "helpers": true,
  //     "regenerator": false,
  //     "useESModules": false
  //   }
  // ],
  [
    "@babel/plugin-proposal-class-properties",
    { "loose": true },
  ],
];

module.exports = (api) => {
  api.cache(true);
  return { presets, plugins };
};
