async function determineFileType(buffer: Buffer) {
  const pngSignature = '89504e470d0a1a0a';
  const jpegSignature = 'ffd8ff';
  const heicSignature = '66747970'; // ftyp in ASCII

  // Getting the first 16 bytes for PNG and HEIC (converted to hexadecimal)
  const earlyBufferHex = buffer.subarray(0, 16).toString('hex');

  // Getting the first 6 bytes for JPEG (converted to hexadecimal)
  const earlyBufferHexForJpeg = buffer.subarray(0, 3).toString('hex');

  if (earlyBufferHex.includes(pngSignature)) {
      return 'PNG';
  } else if (earlyBufferHexForJpeg === jpegSignature) {
      return 'JPEG';
  } else if (earlyBufferHex.includes(heicSignature)) {
      return 'HEIC';
  }

  return '';
}

export default determineFileType;