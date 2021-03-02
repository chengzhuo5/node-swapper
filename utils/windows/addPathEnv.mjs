import getPathKey from 'path-key';
import Registry from 'winreg';
import regedit from 'regedit';

const pathKey = getPathKey();
export const addPathEnv = (value) => {
  if (value.includes(';')) {
    value = `"${value}"`;
  }
  return new Promise((resolve, reject) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key: '\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment',
    });

    regKey.values(function (err, items /* array of RegistryItem */) {
      if (err) {
        reject(err);
      } else {
        const pathValue = items.filter((item) => item.name === pathKey)[0]
          .value;
        const pathValues = pathValue.match(/(\".+?\")|(.+?);/g);
        if (!pathValues.includes(value) && !pathValues.includes(value + ';')) {
          let pathValuesStr = value + ';' + pathValues.join('');

          regedit.putValue(
            {
              'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment': {
                [`${pathKey}`]: {
                  value: pathValuesStr,
                  type: 'REG_EXPAND_SZ',
                },
              },
            },
            function (err) {
              resolve();
            }
          );
        } else {
          resolve();
        }
      }
    });
  });
};

export default addPathEnv;
