const fs = require("fs");
const path = require("path");

// tokens.js 파일을 읽어옴
const tokens = require("../src/styles/token.js");

// 출력 경로 정의
const outputPath = path.resolve(__dirname, "../src/types/tokens.d.ts");

// 시작 주석 + 모듈 선언 시작
let content = `// ⚠️ 이 파일은 자동 생성되었습니다. 직접 수정하지 마세요.\ndeclare module '../styles/tokens.js' {\n`;

// 각 export에 대해 타입 선언 추가
for (const key in tokens) {
  const value = tokens[key];
  const type = typeof value === "object" ? "Record<string, any>" : typeof value;
  content += `  export const ${key}: ${type};\n`;
}

content += `}\n`;

// 파일 생성
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content, "utf8");

console.log("✅ tokens.d.ts 파일 생성 완료!");
