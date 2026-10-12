// src/4-07-message-open-closed/problem.js
class KakaoMessage {
  #sender;
  #content;

  constructor(sender, content) {
    this.#sender = sender;
    this.#content = content;
  }

  // TODO: 다른 메시지와 같은 이름의 getNotificationText로 바꾸기
  getShortMessage() {
    return `[카카오톡] ${this.#sender}: ${this.#content}`;
  }
}

class TextMessage {
  #sender;
  #content;

  constructor(sender, content) {
    this.#sender = sender;
    this.#content = content;
  }

  getNotificationText() {
    return `[문자] ${this.#sender}: ${this.#content}`;
  }
}

// 새로 추가한 메시지 종류입니다
class InstagramMessage {
  #sender;
  #content;

  constructor(sender, content) {
    this.#sender = sender;
    this.#content = content;
  }

  getNotificationText() {
    return `[인스타그램] ${this.#sender}: ${this.#content}`;
  }
}

class MessageNotificationManager {
  #messages;

  constructor() {
    this.#messages = [];
  }

  addMessage(message) {
    this.#messages.push(message);
  }

  // TODO: instanceof 분기를 없애고, 메시지 종류와 관계없이
  // 모든 메시지에 getNotificationText()를 호출해 출력하기
  displayAll() {
    this.#messages.forEach((message) => {
      if (message instanceof KakaoMessage) {
        console.log(message.getShortMessage());
      } else if (message instanceof TextMessage) {
        console.log(message.getNotificationText());
      }
    });
  }
}

const manager = new MessageNotificationManager();
manager.addMessage(
  new KakaoMessage("이영희", "점심 먹었어?"),
);
manager.addMessage(
  new TextMessage("김철수", "택배가 도착했습니다"),
);
manager.addMessage(
  new InstagramMessage("박민수", "사진을 좋아합니다"),
);
manager.displayAll();
// 출력:
// [카카오톡] 이영희: 점심 먹었어?
// [문자] 김철수: 택배가 도착했습니다
// [인스타그램] 박민수: 사진을 좋아합니다
