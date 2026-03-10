export const getEnv = (envName: string) => {
  const val = process.env[envName];
  if (val == undefined) {
    throw new Error(`Missing environment variable: ${envName}`);
  }
  return val;
};
