const fs = require('fs');
const cp = require('child_process');

const root = process.cwd().replace(/\\/g,'/');
const lines = fs.readFileSync('lint.out','utf8').split(/\r?\n/);

let currentPath = null;
const errors = [];
for (const line of lines) {
  if (/^[A-Za-z]:\\/.test(line)) {
    currentPath = line.trim();
    continue;
  }
  const m = line.match(/^\s*(\d+):(\d+)\s+error\s+(.+?)\s*$/);
  if (m && currentPath) {
    const [, ln, col, message] = m;
    let rel = currentPath.replace(/\\/g,'/');
    if (rel.toLowerCase().startsWith(root.toLowerCase() + '/')) rel = rel.slice(root.length + 1);
    errors.push({ file: rel, line: Number(ln), col: Number(col), message: message.trim() });
  }
}

console.log('LINT_ERROR_LINES_START');
for (const e of errors) console.log(`${e.file}:${e.line}:${e.col} ${e.message}`);
console.log('LINT_ERROR_LINES_END');

const diffOut = cp.spawnSync('git', ['diff', '--name-only'], { encoding: 'utf8' });
const modified = (diffOut.stdout || '').split(/\r?\n/).map(s => s.trim().replace(/\\/g,'/')).filter(Boolean);
console.log('GIT_DIFF_NAME_ONLY_START');
for (const f of modified) console.log(f);
console.log('GIT_DIFF_NAME_ONLY_END');

const modSet = new Set(modified);
const errsInModified = errors.filter(e => modSet.has(e.file) || modSet.has(`frontend/${e.file}`));
console.log('ERRORS_IN_MODIFIED_START');
if (errsInModified.length === 0) console.log('None');
else for (const e of errsInModified) console.log(`${e.file}:${e.line}:${e.col} ${e.message}`);
console.log('ERRORS_IN_MODIFIED_END');
