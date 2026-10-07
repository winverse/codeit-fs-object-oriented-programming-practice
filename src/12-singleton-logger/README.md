# 12. 싱글턴으로 로거 하나만 쓰기

푸는 시점: OOP 디자인 패턴 › 싱글턴 패턴 퀴즈 뒤

## 할 일

애플리케이션 전체에서 로그를 남기는 `Logger` 객체 하나를 재사용하려고 합니다. `problem.js`의 `Logger`를 싱글턴으로 완성합니다.

1. 하나뿐인 인스턴스를 담을 `static`과 `#`이 함께 붙은 필드 `#instance`를 `null`로 선언합니다.
2. constructor는 `#instance`가 이미 있으면 `이미 인스턴스가 존재합니다. getInstance()를 사용하십시오.` 오류를 던지고, 없으면 생성 메시지를 출력한 뒤 방금 만든 인스턴스를 `#instance`에 저장합니다.
3. `getInstance()`는 `#instance`가 없을 때만 새로 만들고, 저장해 둔 인스턴스를 반환합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/12-singleton-logger/problem.js
pnpm test:12
```

## 성공 기준

- `pnpm test:12`가 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다. `Logger 생성`은 한 번만 출력됩니다.
- 인스턴스가 있을 때 `new Logger()`를 직접 호출하면 오류가 발생합니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
