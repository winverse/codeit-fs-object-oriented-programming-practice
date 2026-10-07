// src/19-printer-interface/problem.js
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

  // TODO: 스캔 기능이 없는 LgPrinter에서 scan 메서드 지우기
  scan(paper) {
    console.log("[LG] 스캔 기능이 없습니다");
  }
}

// TODO: 인쇄만 하는 printAll(printers, file)과
// 스캔만 하는 scanAll(scanners, paper)로 나누기
function runOffice(machines, file, paper) {
  machines.forEach((machine) => {
    machine.print(file);
    machine.scan(paper);
  });
}

const samsung = new SamsungPrinter();
const lg = new LgPrinter();

// TODO: printAll로 두 프린터에서 인쇄하고, scanAll로 samsung에서만 스캔하기
runOffice([samsung, lg], "회의록.docx", "영수증");
// 출력:
// [삼성] 회의록.docx 인쇄
// [LG] 회의록.docx 인쇄
// [삼성] 영수증 스캔
