import { existsSync, unlink } from 'fs';

interface DeleteSourceFileArgs {
  destinationFilePath: string | undefined;
  sourcePath: string;
}

async function deleteSourceFile({
  destinationFilePath,
  sourcePath,
}: DeleteSourceFileArgs) {
  console.log({
    destinationFilePath,
    sourcePath,
  })
  if (destinationFilePath && existsSync(destinationFilePath)) {
    await unlink(sourcePath, (error) => {
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
