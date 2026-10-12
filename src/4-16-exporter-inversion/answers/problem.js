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
  convert(report) {
    return `# ${report.getTitle()}\n${report.getBody()}`;
  }
}

class HtmlExporter {
  convert(report) {
    return `<h1>${report.getTitle()}</h1><p>${report.getBody()}</p>`;
  }
}

class ExportController {
  #exporter;

  constructor(exporter) {
    this.#exporter = exporter;
  }

  run(report) {
    console.log(this.#exporter.convert(report));
  }
}

const report = new Report(
  "3분기 매출",
  "매출이 10% 늘었습니다.",
);

const markdownController = new ExportController(
  new MarkdownExporter(),
);
const htmlController = new ExportController(
  new HtmlExporter(),
);
markdownController.run(report);
htmlController.run(report);
// 출력:
// # 3분기 매출
// 매출이 10% 늘었습니다.
// <h1>3분기 매출</h1><p>매출이 10% 늘었습니다.</p>
