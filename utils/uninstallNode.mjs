import { clearPathEnv as clearPathEnvForWindows } from './windows/pathEnv.mjs';
import { platform, envKey } from '../constant.mjs';

const removeNodeEnv = () => {
  console.log('删除环境变量');
  switch (platform) {
    case 'win':
      clearPathEnvForWindows(`%${envKey}%`);
      break;

    default:
      break;
  }
};

const uninstallNode = async () => {
  removeNodeEnv();
};

export default uninstallNode;
