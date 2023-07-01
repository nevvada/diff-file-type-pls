#!/usr/bin/env node
import { promises } from 'fs';

import figlet from 'figlet';

import askQuestion from './utils/askQuestion/askQuestion.js';
import getFileExtensionOptions from './utils/getFileExtensionOptions/getFileExtensionOptions.js';
import { convertFileType } from './utils/convertFileType/convertFileType.js';
import deleteSourceFile from './utils/deleteSourceFile/deleteSourceFile.js';
import determineFileType from './utils/determineFileType/determineFileType.js';

async function runProgram() {
  console.log(figlet.textSync('Diff File Type Pls'));

  let sourcePath = await askQuestion('What is the path to the file you want to convert? (? ・・)σ\n> ');

  while (!sourcePath) {
    sourcePath = await askQuestion('Please try again with the path to your file ( *ゝ∀ ･)v\n> ');
  }

  let sourceFileBuffer;

  while (!sourceFileBuffer) {
    try {
      const extractedFileBuffer = await promises.readFile(sourcePath);
      sourceFileBuffer = extractedFileBuffer;
    } catch(error) {
      sourcePath = await askQuestion('Sorry, file was not found. Please try again with the path to your file ( *ゝ∀ ･)v\n> ');
    }
  }

  const sourceFileType = await determineFileType(sourceFileBuffer);

  if (!sourceFileType) {
    console.log('Unsupported file extension ╮ (. ❛ ᴗ ❛.) ╭');
  }

  const newFileExtensionOptions = getFileExtensionOptions(sourceFileType);
  const destinationFileType = await askQuestion(`It looks like this is an image. What file type do you want to convert to? Your options are: ${newFileExtensionOptions}\n> `);

  const destinationFilePath = await convertFileType({
    destinationFileType,
    sourceFileBuffer,
    sourceFileType,
    sourcePath,
  });


  await deleteSourceFile({
    destinationFilePath,
    sourcePath,
  })

  process.exit();
}

runProgram();
