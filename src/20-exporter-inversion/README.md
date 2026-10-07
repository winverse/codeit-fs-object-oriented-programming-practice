# 20. 의존성 역전 원칙으로 보고서 변환기 바꿔 끼우기

푸는 시점: SOLID 원칙 › 의존성 역전 원칙 퀴즈 뒤

## 할 일

`problem.js`의 `ExportController`는 `constructor`에서 `new MarkdownExporter()`로 변환기를 직접 만들고, `run()`에서 `toMarkdown()`을 호출합니다. 그래서 같은 보고서를 HTML로 출력하려면 `ExportController`를 고쳐야 합니다. `ExportController`가 특정 변환기 클래스가 아니라 `convert(report)`라는 약속에 기대도록 바꿉니다.

1. `MarkdownExporter`의 `toMarkdown()`과 `HtmlExporter`의 `toHtml()`을 같은 이름의 `convert(report)`로 바꿉니다.
2. `ExportController`는 변환기 객체를 `constructor`의 인수로 받아 private field `#exporter`에 담고, `run(report)`에서는 그 객체의 `convert(report)` 결과를 출력합니다. `ExportController` 안에는 변환기 클래스 이름이 남지 않게 합니다.
3. 파일 끝에서 `MarkdownExporter` 객체를 넘긴 `ExportController`와 `HtmlExporter` 객체를 넘긴 `ExportController`를 만들어 차례로 `run(report)`를 호출합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/20-exporter-inversion/problem.js
pnpm test:20
```

## 성공 기준

- `pnpm test:20`이 통과합니다.
- `node`로 실행하면 `# 3분기 매출`, `매출이 10% 늘었습니다.`, `<h1>3분기 매출</h1><p>매출이 10% 늘었습니다.</p>`가 차례로 출력됩니다.
- `ExportController`에는 `MarkdownExporter`, `HtmlExporter` 같은 변환기 클래스 이름이 없고, `convert(report)`를 가진 어떤 객체를 넘겨도 그 결과를 출력합니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
