// src/20-exporter-inversion/problem.js
class Report {
  #title;
  #body;

  constructor(title, body) {
    this.#title = title;
    this.#body = body;
  }

  getTitle() {
    return this.#title;
  }

  getBody() {
    return this.#body;
  }
}

class MarkdownExporter {
  // TODO: 메서드 이름을 convert로 바꾸기
  toMarkdown(report) {
    return `# ${report.getTitle()}\n${report.getBody()}`;
  }
}

class HtmlExporter {
  // TODO: 메서드 이름을 convert로 바꾸기
  toHtml(report) {
    return `<h1>${report.getTitle()}</h1><p>${report.getBody()}</p>`;
  }
}

// TODO: 변환기를 직접 만들지 않고 constructor로 받아,
// run()에서 받은 변환기의 convert(report)만 호출하기
class ExportController {
  #exporter;

  constructor() {
    this.#exporter = new MarkdownExporter();
  }

  run(report) {
    console.log(this.#exporter.toMarkdown(report));
  }
}

const report = new Report(
  "3분기 매출",
  "매출이 10% 늘었습니다.",
);

// TODO: MarkdownExporter와 HtmlExporter 객체를 각각 넘겨 만든
// ExportController 두 개로 보고서를 출력하기
const controller = new ExportController();
controller.run(report);
// 출력:
// # 3분기 매출
// 매출이 10% 늘었습니다.
// <h1>3분기 매출</h1><p>매출이 10% 늘었습니다.</p>
