import uninstallNode from '../utils/uninstallNode.mjs';

const uninstall = async () => {
  await uninstallNode();
  console.log('卸载成功，请重新打开控制台或重启计算机。');
};

export default uninstall;
