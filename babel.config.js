const presets = [
  [
    "@babel/env",
    {
      "targets": {
        "node": "8",
      },
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-proposal-class-properties",
    { "loose": true },
  ],
];

module.exports = { presets, plugins };