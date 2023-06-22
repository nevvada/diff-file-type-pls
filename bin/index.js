#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const readline = require('readline');
const FileType = require('file-type');

const IMAGE_FILE_EXTENSIONS = ['bmp', 'gif', 'jpeg', 'jpg', 'png', 'tiff'];
const FILE_TYPES = {
  IMAGE: 'image',
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function removeExtension({ sourceFileExtension, sourcePath }) {
  const pattern = new RegExp(`\\.${sourceFileExtension}$`, 'i');

  return sourcePath.replace(pattern, '');
}

async function removeOldFile(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error(`Error removing file: ${error}`);
    }
  })
}

async function convertFileType({
  destinationFileExtension,
  sourceFileExtension,
  sourcePath,
}) {
  try {
    const data = await fs.promises.readFile(sourcePath);
    const image = await Jimp.read(data);
    const sourcePathWithoutOldExtension = removeExtension({ sourceFileExtension, sourcePath});

    const outputFilePath = `${sourcePathWithoutOldExtension}.${destinationFileExtension}`;
    await image.writeAsync(outputFilePath);
  } catch(error) {
    console.error(error);
  }
}

async function getFileExtension(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist');

    process.exit();
  }

  const fileContent = await fs.promises.readFile(filePath);
  const fileType = await FileType.fromBuffer(fileContent);

  return fileType?.mime?.split('/')?.slice(-1)?.[0] || null;
}

async function runProgram() {
  const sourcePath = await askQuestion('What is the path to the file you want to convert?\n> ');

  if (!sourcePath) {
    console.log('Please try again with the path to your file.');

    return;
  }

  const sourceFileExtension = await getFileExtension(sourcePath)

  if (!sourceFileExtension) {
    console.log('Unsupported file extension. Please try again.');

    return;
  }

  const newFileExtensionOptions = IMAGE_FILE_EXTENSIONS.filter((extension) => extension !== sourceFileExtension);
  const newFileExtensionOptionsString = `
    ${newFileExtensionOptions.slice(0, newFileExtensionOptions.length - 1).join(', ')}, and ${newFileExtensionOptions[newFileExtensionOptions.length - 1]}.
  `;

  const destinationFileExtension = await askQuestion(`It looks like this is an image. What file type do you want to convert to? Your options are: ${newFileExtensionOptionsString}\n> `);

  await convertFileType({
    destinationFileExtension,
    sourceFileExtension,
    sourcePath,
  });

  await removeOldFile(sourcePath);

  process.exit();
}

runProgram();
