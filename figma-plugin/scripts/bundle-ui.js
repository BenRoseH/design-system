const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../src/ui/index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '../dist/ui.js'), 'utf8');

const bundled = html.replace(
  '<script src="ui.js"></script>',
  `<script>\n${js}\n</script>`
);

fs.writeFileSync(path.join(__dirname, '../dist/ui.html'), bundled);
console.log('UI bundled — JS inlined into ui.html');
