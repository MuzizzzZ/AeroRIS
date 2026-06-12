from pathlib import Path
from zipfile import ZipFile

SOURCE_DOCX = Path('/Users/hozeeric/Desktop/2207030223-李泓哲-面向低空智能感知的无人机场景指代表达理解方法研究.docx')
OUT_DIR = Path('/Users/hozeeric/Desktop/AeroRIS/public/assets/thesis')

IMAGE_MAP = {
    'word/media/image2.png': 'fig-research-route.png',
    'word/media/image8.png': 'fig-dataset-stats.png',
    'word/media/image10.png': 'fig-finetuned-visualization.png',
    'word/media/image13.png': 'fig-accuracy-efficiency.png',
    'word/media/image14.png': 'fig-cris-errors.png',
    'word/media/image15.png': 'fig-aerocris-framework.png',
    'word/media/image23.png': 'fig-aerocris-comparison.png',
}


def main() -> None:
    if not SOURCE_DOCX.exists():
        raise FileNotFoundError(f'Missing thesis file: {SOURCE_DOCX}')
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with ZipFile(SOURCE_DOCX) as archive:
        for source, filename in IMAGE_MAP.items():
            target = OUT_DIR / filename
            target.write_bytes(archive.read(source))
            print(f'wrote {target}')


if __name__ == '__main__':
    main()
