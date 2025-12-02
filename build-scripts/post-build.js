const fs = require('fs');
const path = require('path');

// ESM 모듈용 package.json 생성
const esmPackageJson = {
  "type": "module"
};

fs.writeFileSync(
  path.join(__dirname, '../dist/esm/package.json'),
  JSON.stringify(esmPackageJson, null, 2)
);

console.log('✅ ESM build completed');