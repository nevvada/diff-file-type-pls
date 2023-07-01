import {
  IMAGE_FILE_TYPES,
} from '../../constants.js';

function getFileExtensionOptions(fileType: string) {
  let fileTypeOptions: string[] = [];

  if (IMAGE_FILE_TYPES.includes(fileType)) {
    fileTypeOptions = IMAGE_FILE_TYPES.filter((type) => (
      type !== fileType && type !== 'HEIC'
    ));
  }

  return fileTypeOptions.length > 1
    ? `${fileTypeOptions.slice(0, fileTypeOptions.length - 1).join(', ')} and ${fileTypeOptions[fileTypeOptions.length - 1]}`
    : fileTypeOptions.toString();
}

export default getFileExtensionOptions;
