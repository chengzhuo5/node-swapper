import installForWindows from './install-windows.mjs';

if (process.platform === 'win32') {
  process.argv[2] && installForWindows(process.argv[2]);
}
