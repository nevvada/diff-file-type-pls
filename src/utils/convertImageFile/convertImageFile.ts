import { promises } from 'fs';
import decode from 'heic-decode';

import jpegJs, { encode } from 'jpeg-js';
import { PNG } from 'pngjs';

interface DecodedImage {
  data: Buffer | ArrayBuffer;
  width: number;
  height: number;
  quality?: number;
}

interface ConvertMap {
  JPEG: (args: DecodedImage) => ReturnType<typeof encode>['data'];
  PNG: (args: DecodedImage) => any;
  [key: string]: Function;
}

const convertMap: ConvertMap = {
  JPEG: ({ data, width, height, quality }) => jpegJs.encode({ data, width, height }, quality).data,
  PNG: ({ data, width, height }) => {
    const png = new PNG({ width, height });
    png.data = data as Buffer;

    return PNG.sync.write(png, {
      deflateLevel: 9,
      deflateStrategy: 3,
      filterType: -1,
      colorType: 6,
      inputHasAlpha: true
    });
  }
};

interface ConvertImageFileArgs {
  destinationFileType: string;
  destinationFilePath: string;
  sourcePath: string;
  sourceFileBuffer: Buffer;
  sourceFileType: string;
}

async function convertImageFile({
  destinationFilePath,
  destinationFileType,
  sourceFileBuffer,
  sourceFileType,
}: ConvertImageFileArgs) {
  let decodedImage: DecodedImage;

  if (sourceFileType === 'HEIC') {
    decodedImage = await decode({ buffer: sourceFileBuffer });
  } else if (sourceFileType === 'JPEG') {
    decodedImage = jpegJs.decode(sourceFileBuffer);
  } else {
    decodedImage = PNG.sync.read(sourceFileBuffer);
  }

  const destinationImageBuffer = await convertMap[destinationFileType]({
    data: decodedImage.data,
    width: decodedImage.width,
    height: decodedImage?.height,
    ...(destinationFileType === 'JPEG' && { quality: 100  }),
  });

  await promises.writeFile(destinationFilePath, destinationImageBuffer);
}

export default convertImageFile;
