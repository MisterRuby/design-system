const fs = require('fs');
const path = require('path');

const sourceRoot = path.join(__dirname, '../src');
const componentsRoot = path.join(sourceRoot, 'components');
const targets = [
  path.join(__dirname, '../dist'),
  path.join(__dirname, '../dist/esm'),
];

const collectCssFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectCssFiles(fullPath);
    }
    return entry.name.endsWith('.css') ? [fullPath] : [];
  });
};

const copyToTargets = (filePath) => {
  targets.forEach((targetRoot) => {
    const relativePath = path.relative(sourceRoot, filePath);
    const destination = path.join(targetRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(filePath, destination);
  });
};

const cssFiles = collectCssFiles(componentsRoot);
cssFiles.forEach(copyToTargets);

console.log(`Copied ${cssFiles.length} CSS file(s) to dist outputs`);
