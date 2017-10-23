exports.config = {
  namespace: 'smartimage',
  generateDistribution: true,
  bundles: [
    { components: ['smart-image'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
