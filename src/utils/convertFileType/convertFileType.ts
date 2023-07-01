import path from 'path';

import { IMAGE_FILE_TYPES, FILE_EXTENSIONS } from '../../constants.js';
import convertImageFile from '../convertImageFile/convertImageFile.js';

// const { read } = Jimp;

interface ConvertFileTypeArgs {
  destinationFileType: string;
  sourcePath: string;
  sourceFileType: string;
  sourceFileBuffer: Buffer;
}

export async function convertFileType({
  destinationFileType,
  sourceFileBuffer,
  sourcePath,
  sourceFileType,
}: ConvertFileTypeArgs) {
  const sourcePathWithoutOldExtension = path.basename(sourcePath, path.extname(sourcePath));
  const destinationFilePath = `${sourcePathWithoutOldExtension}.${FILE_EXTENSIONS[destinationFileType]}`;

  try {
    if (IMAGE_FILE_TYPES.includes(sourceFileType)) {
      await convertImageFile({
        destinationFilePath,
        destinationFileType,
        sourcePath,
        sourceFileBuffer,
        sourceFileType,
      });
    }

    // if (isAudioFileType(sourceFileExtension)) {
    //   execFile(ffmpegPath, ['-i', sourcePathWithoutOldExtension, outputFilePath], (error, stdout, stderr) => {
    //     console.log('ffmpegg', {
    //       error,
    //       stdout,
    //       stderr,
    //     });

    //     stdout('success!');
    //   });
    // }
    return destinationFilePath;
  } catch(error) {
    console.error(error);
  }
}
