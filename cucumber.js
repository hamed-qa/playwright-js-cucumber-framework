module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/steps/**/*.js', 'src/support/**/*.js'],
    format: ['progress'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    timeout: 120000
  }
};
