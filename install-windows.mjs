import { execSync } from 'child_process';
import getNode from './utils/getNode.mjs';
import installNode from './utils/installNode.mjs';

const install = async (version) => {
  execSync(`chcp 65001`);
  const filePath = await getNode(version);
  installNode(filePath);
};

install('14.8.0');
