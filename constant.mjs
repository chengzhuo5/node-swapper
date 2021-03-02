import os from 'os';

export const nodeDir = './nodes';
export const platform = os.platform() === 'win32' ? 'win' : os.platform();
export const arch = os.arch();
export const envKey = 'NODE_SWAPPER';
