import { removePathEnv as removePathEnvForWindows } from './windows/pathEnv.mjs';
import { platform, envKey } from '../constant.mjs';

const removeNodeEnv = () => {
  console.log('删除环境变量');
  switch (platform) {
    case 'win':
      removePathEnvForWindows(`%${envKey}%`);
      break;

    default:
      break;
  }
};

const uninstallNode = async () => {
  removeNodeEnv();
};

export default uninstallNode;
