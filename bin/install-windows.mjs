import getNode from '../utils/getNode.mjs';
import installNode from '../utils/installNode.mjs';

const install = async (version) => {
  const filePath = await getNode(version);
  if (filePath) {
    await installNode(filePath);
    console.log('安装成功，请重新打开控制台或重启计算机。');
  } else {
    console.error('版本未找到');
  }
};

export default install;
