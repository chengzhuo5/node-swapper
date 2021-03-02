import { execSync } from 'child_process';

export const addEnv = (name, value) => {
  execSync(`setx "${name}" "${value}" /m`);
};

export default addEnv;
