const PurgeCSS = require('purgecss');
const CleanCSS = require('clean-css');
const fs = require('fs');
const chalk = require('chalk');

const purgeCSSConfig = {
  css: ['docs/*.css'],
  content: ['docs/**/*.html', 'docs/*.html', 'docs/*.js'],
};

const cleanCSSConfig = {};

optimizeCSS();

function optimizeCSS() {
  console.log(chalk.blue('Optimizing CSS...'));
  const purgedCSS = new PurgeCSS(purgeCSSConfig).purge();
  const cleanCSS = new CleanCSS(cleanCSSConfig);
  purgedCSS.forEach(output => {
    console.log(chalk.blue(`Overwriting file ${output.file}...`));
    const cleanedCSS = cleanCSS.minify(output.css);
    fs.writeFileSync(output.file, cleanedCSS.styles, 'utf-8');
  });
  console.log(chalk.green('CSS are all optimized!'));
}
