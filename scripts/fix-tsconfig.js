const fs = require('fs');
const tsconfigPath = './tsconfig.json';

try {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

  // Remove any `.next/types/**/*.ts` from the `include` array
  tsconfig.include = tsconfig.include.filter((i) => !i.includes('.next/types'));

  // Save the modified tsconfig back to the file
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('✅ Fixed tsconfig.json to remove .next/types/**/*.ts');
} catch (err) {
  console.error('Error reading or writing tsconfig.json:', err);
}
