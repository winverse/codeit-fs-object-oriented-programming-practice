// src/12-singleton-logger/problem.js
class Logger {
  // TODO: 하나뿐인 인스턴스를 담을 static private field

  constructor() {
    // TODO: 이미 인스턴스가 있으면 오류 던지기

    console.log("Logger 생성");

    // TODO: 방금 만든 인스턴스 저장
  }

  static getInstance() {
    // TODO: 인스턴스가 없을 때만 새로 만들고, 저장해 둔 인스턴스 반환
  }

  log(message) {
    console.log(`[LOG] ${message}`);
  }
}

const logger1 = Logger.getInstance(); // 출력: Logger 생성
const logger2 = Logger.getInstance();

logger1.log("서버 시작"); // 출력: [LOG] 서버 시작
logger2.log("사용자 로그인"); // 출력: [LOG] 사용자 로그인

console.log(logger1 === logger2); // 출력: true

try {
  new Logger();
} catch (error) {
  console.log(error.message);
  // 출력: 이미 인스턴스가 존재합니다. getInstance()를 사용하십시오.
}
