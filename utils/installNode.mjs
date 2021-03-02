import path from 'path';
import decompress from 'decompress';
import addEnvForWindows from './windows/addEnv.mjs';
import { addPathEnv as addPathEnvForWindows } from './windows/pathEnv.mjs';
import { nodeDir, platform, envKey } from '../constant.mjs';

const extractNode = async (filePath) => {
  const dirName = path.basename(filePath, path.extname(filePath));
  console.log('正在解压');
  await decompress(filePath, nodeDir);
  console.log('解压完成');
  return path.resolve(filePath, '../', dirName);
};

const addNodeEnv = (dirPath) => {
  console.log('设置环境变量');
  switch (platform) {
    case 'win':
      addEnvForWindows(envKey, dirPath);
      addPathEnvForWindows(`%${envKey}%`);
      break;

    default:
      break;
  }
};

const installNode = async (filePath) => {
  const dirPath = await extractNode(filePath);
  addNodeEnv(dirPath);
};

export default installNode;
