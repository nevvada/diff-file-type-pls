export const IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS = ['bmp', 'jpg', 'png'] as const;
export type ImageFileExtensionOptions = typeof IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS[number];

export const IMAGE_FILE_EXTENSIONS_WITH_JPEG = [...IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS, 'jpeg'] as const;
export const AUDIO_FILE_EXTENSIONS_OUTPUT_OPTIONS = ['aac', 'mp3', 'wav'] as const;
export const AUDIO_FILE_EXTENSIONS_MIME = ['mpeg']
export const VIDEO_FILE_EXTENSIONS = ['avi', 'flv', 'mkv', 'mov', 'mp4'];
export const DOCUMENT_FILE_EXTENSIONS = ['csv', 'docx', 'pdf', 'pptx', 'txt', 'xlsx'];

export const ALL_SUPPORTED_FILE_TYPES = [
  ...IMAGE_FILE_EXTENSIONS_OUTPUT_OPTIONS,
  ...AUDIO_FILE_EXTENSIONS_OUTPUT_OPTIONS,
] as const;

export type AllFileExtensionOptions = (
  ImageFileExtensionOptions |
  typeof AUDIO_FILE_EXTENSIONS_OUTPUT_OPTIONS[number]
)
