import {
  IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS,
  AUDIO_FILE_EXTENSIONS_OUTPUT_OPTIONS,
  AllFileExtensionOptions,
} from '../../constants.js';

import {
  isImageFileType,
  isAudioFileType,
} from '../determineFileType/determineFileType.js';

function getFileExtensionOptions(sourceFileExtension: AllFileExtensionOptions) {
  if (isImageFileType(sourceFileExtension)) {
    return IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS.filter((option) => option !== sourceFileExtension);
  }

  if (isAudioFileType(sourceFileExtension)) {
    return AUDIO_FILE_EXTENSIONS_OUTPUT_OPTIONS.filter((option) => option !== sourceFileExtension);
  }
}

export default getFileExtensionOptions;
