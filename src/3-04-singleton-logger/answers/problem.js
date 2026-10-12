class Logger {
  static #instance = null;

  constructor() {
    if (Logger.#instance) {
      throw new Error(
        "이미 인스턴스가 존재합니다. getInstance()를 사용하십시오.",
      );
    }

    console.log("Logger 생성");

    Logger.#instance = this;
  }

  static getInstance() {
    if (Logger.#instance === null) {
      new Logger();
    }
    return Logger.#instance;
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
