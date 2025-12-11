const pactum = require('pactum');

// registra o reporter HTML ANTES dos testes iniciarem
pactum.reporter.add('html', {
  filename: 'pactum-report.html'
});

// exporta o pactum para usar nos testes
module.exports = pactum;
