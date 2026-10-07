# 19. 인터페이스 분리 원칙으로 프린터 기능 나누기

푸는 시점: SOLID 원칙 › 인터페이스 분리 원칙 퀴즈 뒤

## 할 일

`problem.js`의 `runOffice()`는 받은 기기마다 `print(file)`와 `scan(paper)`를 모두 호출합니다. 그래서 스캔 기능이 없는 `LgPrinter`도 호출을 받으려고 실제로는 스캔하지 않는 `scan()`을 갖추고 있습니다. 인쇄와 스캔을 따로 요구하도록 나눕니다.

1. `LgPrinter`에서 `scan()`을 지웁니다. `SamsungPrinter`는 그대로 둡니다.
2. `runOffice()`를 인쇄만 하는 `printAll(printers, file)`과 스캔만 하는 `scanAll(scanners, paper)`로 나눕니다. `printAll()`은 받은 객체마다 `print(file)`만, `scanAll()`은 받은 객체마다 `scan(paper)`만 호출합니다.
3. 파일 끝에서 `printAll()`로 두 프린터에서 인쇄하고, `scanAll()`로 `samsung`에서만 스캔합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/19-printer-interface/problem.js
pnpm test:19
```

## 성공 기준

- `pnpm test:19`가 통과합니다.
- `node`로 실행하면 `[삼성] 회의록.docx 인쇄`, `[LG] 회의록.docx 인쇄`, `[삼성] 영수증 스캔`이 차례로 출력됩니다.
- `LgPrinter`에는 `scan()`이 없고, `print()`만 가진 객체는 `printAll()`에, `scan()`만 가진 객체는 `scanAll()`에 넘길 수 있습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
