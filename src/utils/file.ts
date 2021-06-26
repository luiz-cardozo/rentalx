import fs from "fs";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteFile = async (filename: string) => {
  try {
    fs.promises.stat(filename);
  } catch (err) {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.promises.unlink(filename);
};
