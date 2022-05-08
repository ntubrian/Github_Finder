const withAntdLess = require("next-plugin-antd-less");
const { i18n } = require("./next-i18next.config");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "#2C68A1" },
  lessVarsFilePath: "./styles/variables.less",

  webpack(config) {
    return config;
  },

  images: {
    domains: ["avatars.githubusercontent.com", "www.google.com", "c.tenor.com"],
  },
  i18n,
});
