
from pathlib import Path
from enum import StrEnum
from rich.console import Console

console = Console()

class FileType(StrEnum):
    STYLING = '<estilo>'
    SCRIPTING = '<interactividad>'
    DATA = '<base de datos>'
    MARKDOWN = '<documentación>'
    CODING = '<código>'

files: int = 0
lines_count: list[tuple[FileType, str, int, int]] = []

def extract_lines() -> None:
    global files
    for file in Path('.').rglob('*.*'):
        if any(part in ['node_modules', 'dist', 'build'] for part in file.parts):
            continue

        files += 1
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
                        len(content.splitlines()),
                        len(content.split())
                    )
                )

def log_results() -> None:
    print()
    total_lines = sum(count for _, _, count, _ in lines_count)
    total_words = sum(words for _, _, _, words in lines_count)
    console.print(f'[green]Lineas totales de código: [yellow]{total_lines} lineas[/yellow] | Palabras totales: [yellow]{total_words} palabras[/yellow] | Archivos Totales: [yellow]{files} archivos[/yellow][/green]\n')
    for file_type in FileType:
        type_lines = sum(count for ft, _, count, _ in lines_count if ft == file_type)
        console.print(f'[red]{file_type.value}[/red] [green]lineas:[/green] [yellow]{type_lines} lineas[/yellow]')
    console.print()

# kareli is next :3 | let's resolve the puzzle
def main() -> None:
    extract_lines()
    log_results()

if __name__ == '__main__':
    main()
