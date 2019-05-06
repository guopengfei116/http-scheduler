const rules = {
  "scope-max-length": [2, "always", 20],
};

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules,
};