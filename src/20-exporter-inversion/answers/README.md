# 20. 의존성 역전 원칙으로 보고서 변환기 바꿔 끼우기 해설

처음 `ExportController`는 `new MarkdownExporter()`와 `toMarkdown()`을 직접 써서 마크다운 변환기 하나에 묶여 있었습니다. 정답에서는 두 변환기가 같은 `convert(report)`를 제공하게 하고, `ExportController`가 변환기를 `constructor`로 받아 `this.#exporter.convert(report)`만 호출하게 했습니다. 이제 `ExportController`는 어떤 변환기 클래스가 있는지 모르고 `convert(report)`라는 약속만 알며, 변환기 클래스들도 그 약속에 맞춰 작성됩니다. 새 형식이 필요하면 `convert(report)`를 가진 클래스를 만들어 넘기면 되고 `ExportController`는 고치지 않습니다. `constructor` 안에서 `new HtmlExporter()`로 바꾸기만 하면 이번에는 HTML 변환기에 묶일 뿐이므로, 두 형식을 함께 출력할 수 없습니다.
