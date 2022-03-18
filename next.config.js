const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "#2C68A1" },
  lessVarsFilePath: "./styles/variables.less",

  webpack(config) {
    return config;
  },

  images: {
    domains: ["avatars.githubusercontent.com"],
  },
});
