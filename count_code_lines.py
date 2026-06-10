
from pathlib import Path
from enum import StrEnum

class FileType(StrEnum):
    STYLING = '<style>'
    SCRIPTING = '<script>'
    DATA = '<data>'
    MARKDOWN = '<markdown>'
    CODING = '<code>'

lines_count: list[tuple[FileType, str, int]] = []

def extract_lines() -> None:
    for file in Path('./src').rglob('*.*'):
        if file.suffix in ['.astro', '.css', '.ts', '.tsx', '.json', '.md']:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                lines_count.append(
                    (
                        FileType.STYLING if file.suffix == '.css' else
                        FileType.SCRIPTING if file.suffix in ['.ts', '.tsx'] else
                        FileType.DATA if file.suffix == '.json' else
                        FileType.MARKDOWN if file.suffix in ['.md', '.txt'] else
                        FileType.CODING,
                        file.name,
                        len(content.splitlines())
                    )
                )

def log_results() -> None:
    print()
    total_lines = sum(count for _, _, count in lines_count)
    print(f'Total lines of code: {total_lines}\n')
    for file_type in FileType:
        type_lines = sum(count for ft, _, count in lines_count if ft == file_type)
        print(f'{file_type.value} lines: {type_lines}')
    print()

def main() -> None:
    extract_lines()
    log_results()

if __name__ == '__main__':
    main()
