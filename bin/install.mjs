import installForWindows from './install-windows.mjs';

const install = (version) => {
  if (process.platform === 'win32') {
    version && installForWindows(version);
  }
};

export default install;
