const fs = require('fs').promises;  // fs의 Promise 버전을 사용
const path = require('path');
const prettier = require('prettier');

// 파일 경로 설정 
const directoryPath = path.join(__dirname, "../html/site/outline");

(async function formatFiles() {
  try {
    // 디렉토리 내 파일 목록 읽기
    const files = await fs.readdir(directoryPath);

    // .html 파일만 처리
    for (const file of files) {
      if (path.extname(file) === ".html") {
        const filePath = path.join(directoryPath, file);
        try {
          // 파일 읽기
          const data = await fs.readFile(filePath, 'utf8');

          // Prettier 포맷팅 적용
          const formatted = prettier.format(data, { parser: 'html' });

          // 포맷팅된 파일 다시 쓰기
          await fs.writeFile(filePath, formatted, 'utf8');
          console.log(`${file}에 Prettier 적용 완료`);
        } catch (err) {
          console.error(`파일 처리 중 에러 발생: ${file}`, err);
        }
      }
    }
  } catch (err) {
    console.error('디렉토리를 읽는 중 에러 발생:', err);
  }
})();
