#!/usr/bin/env node
const FileType = require('file-type');
const fs = require('fs');
const Jimp = require('jimp');
const readline = require('readline');

const IMAGE_FILE_EXTENSIONS = ['bmp', 'gif', 'jpg', 'png', 'tiff'];

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

function removeExtension(sourcePath) {
  const pattern = new RegExp('\\.(' + IMAGE_FILE_EXTENSIONS.join('|') + ')$', 'i');

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
  sourcePath,
}) {
  try {
    const data = await fs.promises.readFile(sourcePath);
    const image = await Jimp.read(data);
    const sourcePathWithoutOldExtension = removeExtension(sourcePath);

    const outputFilePath = `${sourcePathWithoutOldExtension}.${destinationFileExtension}`;

    await image.writeAsync(outputFilePath);
  } catch(error) {
    console.error(error);
  }
}

async function getFileExtension(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist ( ๑•́ㅿ•̀๑)');

    process.exit();
  }

  const fileContent = await fs.promises.readFile(filePath);
  const fileType = await FileType.fromBuffer(fileContent);

  return fileType?.mime?.split('/')?.slice(-1)?.[0] || null;
}

async function runProgram() {
  const sourcePath = await askQuestion('What is the path to the file you want to convert? (? ・・)σ\n> ');

  if (!sourcePath) {
    console.log('Please try again with the path to your file ( *ゝ∀ ･)v');

    return;
  }

  const sourceFileExtension = await getFileExtension(sourcePath)

  if (!sourceFileExtension) {
    console.log('Unsupported file extension ╮ (. ❛ ᴗ ❛.) ╭');

    return;
  }

  const newFileExtensionOptions = IMAGE_FILE_EXTENSIONS
    .filter((extension) => {
      if (sourceFileExtension === 'jpeg') {
        return extension !== 'jpg';
      }

      return extension !== sourceFileExtension
    });

  const newFileExtensionOptionsString = `
    ${newFileExtensionOptions.slice(0, newFileExtensionOptions.length - 1).join(', ')}, and ${newFileExtensionOptions[newFileExtensionOptions.length - 1]}.
  `;

  const destinationFileExtension = await askQuestion(`It looks like this is an image. What file type do you want to convert to? Your options are: ${newFileExtensionOptionsString}\n> `);

  await convertFileType({ destinationFileExtension, sourcePath });
  await removeOldFile(sourcePath);

  console.log('The file has successfully been converted d(･∀･○)');

  process.exit();
}

runProgram();
