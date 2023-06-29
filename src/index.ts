#!/usr/bin/env node
import { existsSync } from 'fs';

import figlet from 'figlet';
import { fileTypeFromFile } from 'file-type';

import { ALL_SUPPORTED_FILE_TYPES, AllFileExtensionOptions } from './constants.js';
import askQuestion from './utils/askQuestion/askQuestion.js';
import getFileExtensionOptions from './utils/getFileExtensionOptions/getFileExtensionOptions.js';
import { convertFileType } from './utils/convertFileType/convertFileType.js';
import deleteSourceFile from './utils/deleteSourceFile/deleteSourceFile.js';

async function runProgram() {
  console.log(figlet.textSync('Diff File Type Pls'));

  let sourcePath = await askQuestion('What is the path to the file you want to convert? (? ・・)σ\n> ');

  while (!sourcePath) {
    sourcePath = await askQuestion('Please try again with the path to your file ( *ゝ∀ ･)v\n> ');
  }

  let fileType;

  while (!fileType) {
    try {
      const extractedFileType = await fileTypeFromFile(sourcePath);
      fileType = extractedFileType;
    } catch(error) {
      sourcePath = await askQuestion('Sorry, file was not found. Please try again with the path to your file ( *ゝ∀ ･)v\n> ');
    }
  }

  const sourceFileExtension = fileType?.ext as AllFileExtensionOptions;

  if (!ALL_SUPPORTED_FILE_TYPES.includes(sourceFileExtension)) {
    console.log('Unsupported file extension ╮ (. ❛ ᴗ ❛.) ╭');

    return;
  }

  const newFileExtensionOptions = getFileExtensionOptions(sourceFileExtension);
  const newFileExtensionOptionsString = `
    ${newFileExtensionOptions!.slice(0, newFileExtensionOptions!.length - 1).join(', ')} and ${newFileExtensionOptions![newFileExtensionOptions!.length - 1]}.
  `;

  const destinationFileExtension = await askQuestion(`It looks like this is an image. What file type do you want to convert to? Your options are: ${newFileExtensionOptionsString}\n> `);

  const outputFilePath = await convertFileType({
    destinationFileExtension,
    sourceFileExtension,
    sourcePath,
  });

  deleteSourceFile({
    outputFilePath,
    sourcePath,
  })

  process.exit();
}

runProgram();
