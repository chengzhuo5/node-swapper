#!/usr/bin/env node

import install from './install.mjs';
import uninstall from './uninstall.mjs';

const [type, version] = process.argv.slice(2);

switch (type) {
  case 'install':
    install(version);
    break;
  case 'uninstall':
    uninstall();
    break;
}
