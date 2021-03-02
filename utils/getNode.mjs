import axios from 'axios';
import request from 'request';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { nodeDir, platform, arch } from '../constant.mjs';

const shaFileName = 'SHASUMS256.txt';

const mirrorUrl = 'https://npm.taobao.org/mirrors/node';

const getExtname = (platform) => {
  if (platform === 'win') return '.zip';
  return '.tar.xz';
};

const geneFileName = (exactVersion) => {
  return `node-v${exactVersion}-${platform}-${arch}${getExtname(platform)}`;
};

export const checkNode = async (version) => {
  const exactVersion = version;
  try {
    const res = await axios.get(`${mirrorUrl}/v${exactVersion}/${shaFileName}`);
    if (res.status !== 200) {
      throw new Error('Not Found');
    }
    const sha256s = res.data.split('\n');
    return {
      exactVersion,
      sha256s,
    };
  } catch (e) {
    return false;
  }
};

const downloadFile = async (fileName, url) => {
  return new Promise((resolve) => {
    let receivedBytes = 0;
    let totalBytes = 0;

    const req = request({
      method: 'GET',
      uri: url,
    });

    const out = fs.createWriteStream(fileName);
    req.pipe(out);
    console.log('开始下载');

    req.on('response', (data) => {
      // 更新总文件字节大小
      totalBytes = parseInt(data.headers['content-length'], 10);
    });

    req.on('data', (chunk) => {
      // 更新下载的文件块字节大小
      receivedBytes += chunk.length;
      const progress = receivedBytes / totalBytes;
      const barLength = 40;
      const bar = new Array(barLength).fill('-');
      const leftLength = parseInt(barLength * progress);
      bar.fill('=', 0, leftLength);
      if (leftLength < barLength) {
        bar[leftLength] = '>';
      }
      process.stdout.write(`[${bar.join('')}]\r`);
      // process.stdout.write((progress * 100).toFixed(2) + '\r');
    });

    req.on('end', () => {
      process.stdout.write(`\r\n`);
      console.log('下载已完成，等待处理');
      resolve();
    });
  });
};

const checkLocalFileValid = (filePath, sha256) => {
  if (!fs.existsSync(nodeDir)) {
    fs.mkdirSync(nodeDir);
    return false;
  }
  if (!fs.existsSync(filePath)) {
    return false;
  }
  const data = fs.readFileSync(filePath);
  const calcSha256 = crypto.createHash('sha256').update(data).digest('hex');
  return calcSha256 === sha256;
};
export const getNode = async (version) => {
  const checkResult = await checkNode(version);
  if (checkResult) {
    const { exactVersion, sha256s } = checkResult;
    const fileName = geneFileName(exactVersion);
    const url = `${mirrorUrl}/v${exactVersion}/${fileName}`;

    const sha256String = sha256s.filter((item) => item.includes(fileName))[0];
    const filePath = path.resolve(nodeDir, fileName);
    if (sha256String) {
      const [sha256] = sha256String.split('  ');
      const localValid = checkLocalFileValid(filePath, sha256);
      if (localValid) {
        console.log('本地文件有效');
      } else {
        await downloadFile(filePath, url);
      }
    }
    return filePath;
  }
  return false;
};

export default getNode;
