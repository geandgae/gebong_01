// 필요한 모듈
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// 조사할 폴더 경로
const folderPath = "./html/pattern/";

// 기준이 되는 클래스 목록
const targetClasses = [
	"krds", "nuri", "skip-nav", "logo", "header", "head", "gnb", "footer",
	"modal", "fade", "alert", "sr-only",
	"toggle", "ico",
	"btn", "primary", "secondary", "tertiary", "underline", "link",
	// "xsm", "sm", "md", "lg", "xlg",
	"breadcrumb", "lnb", "quick",
	"pagination", "page", "conts",
	"search", "sch", "badge", "chip",
	"card", "urgent",
	"form", "datepicker", "select", "chk", "input",
	"tbl", "disclosure", "expand", "accordion",
	"swiper", "tab", "upload", "file",
	"step", "spinner", "helper", "tooltip", "coach",
	"active", "terms", "agree", "box",
	"assess", "error", "filter", "drop",
];

// 결과를 저장할 파일 경로
const resultFilePath = "./z-debug/result.txt";

// 탐색에서 제외할 폴더와 파일 목록
const excludeFolders = ["./html/pattern/inc"];
const excludeFiles = [];

// 기존 결과 파일을 비우기 위해 초기화
fs.writeFile(resultFilePath, "", (err) => {
  if (err) {
    console.error("결과 파일 초기화 중 오류 발생:", err);
    return;
  }
});

// 폴더 내 모든 파일을 읽음
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("폴더를 읽는 중 오류 발생:", err);
    return;
  }

	// HTML 파일만 필터링, 탐색에서 제외할 파일을 건너뜀
	const htmlFiles = files.filter(file => {
		const extname = path.extname(file);
		const basename = path.basename(file);
		// 폴더가 아닌 파일만 처리하며 제외 리스트에 없는 파일만 필터링
		return extname === '.html' && !excludeFiles.includes(basename) && !excludeFolders.includes(basename);
	});

  // HTML 파일만 필터링 old
  // const htmlFiles = files.filter((file) => path.extname(file) === ".html");

  // 각 HTML 파일을 검사
  htmlFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // 파일을 읽고 HTML 파싱
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`${file} 파일을 읽는 중 오류 발생:`, err);
        return;
      }

      const $ = cheerio.load(data);

      // HTML 내 모든 클래스들을 배열로 추출
      let foundClasses = new Set();

      $("[class]").each((i, el) => {
        const classes = $(el).attr("class").split(/\s+/); // 공백을 기준으로 여러 클래스 분리
        classes.forEach((cls) => foundClasses.add(cls)); // Set에 추가
      });

      // targetClasses의 단어가 포함된 클래스들을 필터링
      const matchingClasses = [...foundClasses].filter((cls) => targetClasses.some((target) => cls.includes(target)));

      // targetClasses의 단어가 포함되지 않은 클래스들을 필터링
      const nonMatchingClasses = [...foundClasses].filter((cls) => !targetClasses.some((target) => cls.includes(target)));

      // // targetClasses 배열에 없는 클래스들을 필터링 old
      // const extraClasses = [...foundClasses].filter((cls) => !targetClasses.includes(cls));

      // 만약 기준 targetClasses에 없는 클래스가 있으면 출력
      if (matchingClasses.length > 0 || nonMatchingClasses.length > 0) {
        // console.log(`${file}: 기준 클래스에 포함되지 않은 추가 클래스 갯수: ${extraClasses.length}`);
        // console.log("추가 클래스들:\n" + extraClasses.map(cls => `- ${cls}`).join("\n"));
        // console.log("\n"); // 파일 간의 출력 구분을 위한 개행 추가
        const resultText =
          `${file}:\n` +
          `\n기준 클래스 포함된 클래스 갯수: ${matchingClasses.length}\n` +
          `포함된 클래스들:\n${matchingClasses.map((cls) => `- ${cls}`).join("\n")}\n` +
          `\n기준 클래스 포함되지 않은 클래스 갯수: ${nonMatchingClasses.length}\n` +
          `포함되지 않은 클래스들:\n${nonMatchingClasses.map((cls) => `- ${cls}`).join("\n")}\n\n\n\n`;

        // 결과를 파일에 저장 (이어 쓰기)
        fs.appendFile(resultFilePath, resultText, (err) => {
          if (err) {
            console.error("결과 파일에 쓰는 중 오류 발생:", err);
          }
        });
      }
    });
  });
});
