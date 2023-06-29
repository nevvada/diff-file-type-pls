import { existsSync, unlink } from 'fs';

interface DeleteOldFileArgs {
  outputFilePath: string | undefined;
  sourcePath: string;
}

function deleteSourceFile({
  outputFilePath,
  sourcePath,
}: DeleteOldFileArgs) {
  if (outputFilePath && existsSync(outputFilePath)) {
    unlink(sourcePath, (error) => {
      if (error) {
        console.error(`Error removing file: ${error}`);
      }
    })

    console.log('The file has successfully been converted d(･∀･○)');
  } else {
    console.log('Sorry, something went wrong ( ๑•́ㅿ•̀๑)');
  }
}

export default deleteSourceFile;
