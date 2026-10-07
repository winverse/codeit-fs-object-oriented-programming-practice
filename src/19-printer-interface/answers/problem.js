class SamsungPrinter {
  print(file) {
    console.log(`[삼성] ${file} 인쇄`);
  }

  scan(paper) {
    console.log(`[삼성] ${paper} 스캔`);
  }
}

class LgPrinter {
  print(file) {
    console.log(`[LG] ${file} 인쇄`);
  }
}

function printAll(printers, file) {
  printers.forEach((printer) => {
    printer.print(file);
  });
}

function scanAll(scanners, paper) {
  scanners.forEach((scanner) => {
    scanner.scan(paper);
  });
}

const samsung = new SamsungPrinter();
const lg = new LgPrinter();

printAll([samsung, lg], "회의록.docx");
scanAll([samsung], "영수증");
// 출력:
// [삼성] 회의록.docx 인쇄
// [LG] 회의록.docx 인쇄
// [삼성] 영수증 스캔
