import path from 'path';

import { promises } from 'fs';

import { fileTypeFromFile } from 'file-type';
import Jimp from 'jimp';

import {
  isAudioFileType,
  isImageFileType,
} from '../determineFileType/determineFileType.js';
import { AllFileExtensionOptions } from '../../constants.js';

const { read } = Jimp;

interface ConvertFileTypeArgs {
  destinationFileExtension: string,
  sourceFileExtension: AllFileExtensionOptions,
  sourcePath: string,
}

export async function convertFileType({
  destinationFileExtension,
  sourceFileExtension,
  sourcePath,
}: ConvertFileTypeArgs) {
  const sourcePathWithoutOldExtension = path.basename(sourcePath, path.extname(sourcePath));
  const outputFilePath = `${sourcePathWithoutOldExtension}.${destinationFileExtension}`;

  try {
    if (isImageFileType(sourceFileExtension)) {
      const data = await promises.readFile(sourcePath);
      const image = await read(data);

      await image.writeAsync(outputFilePath);
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

    return outputFilePath;
  } catch(error) {
    console.error(error);
  }
}
