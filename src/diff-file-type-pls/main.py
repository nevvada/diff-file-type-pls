import subprocess
import sys

IMAGE_FILE_TYPES = ("gif", "jpg", "jpeg", "png")


def prompt_new_file_type(file_type: str) -> str:
    new_file_type_options = [
        option for option in IMAGE_FILE_TYPES if option != file_type
    ]

    new_file_type_options_string = "{} and {}".format(
        ", ".join(new_file_type_options[:-1]),
        new_file_type_options[-1]
    )

    result = subprocess.run(
        [
            "bash",
            "-c",
            f"echo 'It looks like this is a {file_type}. What would you like to convert this to? Your options are: {new_file_type_options_string}.'; read -r choice; echo $choice"
        ],
        capture_output=True,
        text=True,
    )

    new_file_type = result.stdout.strip()

    print('>>>>>>.', new_file_type)

    return new_file_type

    # input(
    #     f"It looks like this is a {file_type}. What would you like to convert this to? Your options are: {new_file_type_options_string}."; read -r choice; echo $choice"]
    # )

    return


def cli_prompt():
    if len(sys.argv) < 2:
        print("Please include the path to the file you want to convert.")

        return

    path_to_file = sys.argv[1]
    file_type = path_to_file.split(".")[-1]

    if file_type in IMAGE_FILE_TYPES:
        prompt_new_file_type(file_type)


cli_prompt()
