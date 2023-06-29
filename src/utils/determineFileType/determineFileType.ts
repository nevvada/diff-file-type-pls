import {
  AUDIO_FILE_EXTENSIONS_MIME,
  AllFileExtensionOptions,
  IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS,
} from '../../constants.js';

export function isImageFileType(sourceFileExtension: AllFileExtensionOptions) {
  return (IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS as readonly AllFileExtensionOptions[]).includes(sourceFileExtension);
}

export function isAudioFileType(sourceFileExtension: AllFileExtensionOptions) {
  return AUDIO_FILE_EXTENSIONS_MIME.includes(sourceFileExtension);
}
