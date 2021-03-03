import getNode from '../utils/getNode.mjs';
import installNode from '../utils/installNode.mjs';

const install = async (version) => {
  const filePath = await getNode(version);
  if (filePath) {
    installNode(filePath);
  } else {
    console.error('版本未找到');
  }
};

export default install;
