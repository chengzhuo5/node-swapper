import uninstallForWindows from './uninstall-windows.mjs';

const uninstall = () => {
  if (process.platform === 'win32') {
    uninstallForWindows();
  }
};

export default uninstall;
