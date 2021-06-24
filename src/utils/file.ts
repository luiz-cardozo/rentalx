import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    fs.promises.stat(filename);
  } catch (err) {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.promises.unlink(filename);
};
