const fs = require("fs");
const path = require("path");

// 원본 디자인 시스템 파일 경로
const inputPath = path.join(__dirname, "../D.G.json");

// 변환 결과 저장
const outputPath = path.join(__dirname, "../style-dictionary/tokens");

// 원본 JSON 읽기
const rawData = fs.readFileSync(inputPath);
const tokens = JSON.parse(rawData);

// 결과 토큰 초기화
const colorTokens = {};
const typographyTokens = {};
const effectTokens = {};
const spacingTokens = {};

// 원본을 순회하면서 분류하기 : JSON의 Primary, Head, Effect 등을 순회
for (const category in tokens) {
    const group = tokens[category];

    // 1. group이 바로 value/type을 가지고 있는 경우 (ex.mobile) : top-level
    if('value' in group && 'type' in group) {
        const { value, type } = group;
        
        if (type === 'spacing') {
            spacingTokens[category] = { value: value };
        } else {
            console.warn(`Unknown top-level type: ${type}`);
        }
        
        continue; // 이번 항목은 여기서 끝내고 다음 항목 분류로 넘어감
    }

    // 2. 내부에 key별로 value/type이 있는 구조 (nested 구조)
    for (const key in group) {
        const token = group[key];
        const { value, type } = token;

        // type이 없으면 경고 출력 후 건너 뛰기
        if(!type) {
            console.warn(`Skipping token with undefined type in ${category} -> ${key}`);
        }

        // 타입에 따라 토큰 객체에 저장
        if(type === 'color') {
            if(!colorTokens[category]) colorTokens[category] = {};
            colorTokens[category][key] = { value : value }
        } else if (type === 'typography') {
            if(!typographyTokens[category]) typographyTokens[category] = {};
            typographyTokens[category][key] = { value : value }
        } else if (type === 'boxShadow') {
            if(!effectTokens[category]) effectTokens[category] = {};
            effectTokens[category][key] = { value : value }
        } else if (type === 'spacing') {
            if(!spacingTokens[category]) spacingTokens[category] = {};
            spacingTokens[category][key] = { value : value }
        } else {
            // 알 수 없는 타입이면 경고 출력
            console.warn(`Unknown type: ${type}`);
        }
    };
};

// 변환 결과 디렉토리 생성 (없으면 생성)
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true});
}

// 결과를 각각의 파일로 저장 (JSON pretty-print 포함)
fs.writeFileSync(path.join(outputPath, "color.json"), JSON.stringify({ color: colorTokens }, null,2 ));
fs.writeFileSync(path.join(outputPath, "typography.json"), JSON.stringify({ color: typographyTokens }, null,2 ));
fs.writeFileSync(path.join(outputPath, "effect.json"), JSON.stringify({ color: effectTokens }, null,2 ));
fs.writeFileSync(path.join(outputPath, "spacing.json"), JSON.stringify({ color: spacingTokens }, null,2 ));