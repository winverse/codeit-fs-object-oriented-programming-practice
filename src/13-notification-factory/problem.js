// src/13-notification-factory/problem.js
class EmailNotification {
  send(message) {
    console.log(`[EMAIL] ${message}`);
  }
}

class SmsNotification {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

class NotificationFactory {
  static create(channel) {
    // TODO: channel에 맞는 알림 객체를 새로 만들어 반환하고, 등록되지 않은 채널이면 오류 던지기
  }
}

function sendWelcome(channel, message) {
  const notifier = NotificationFactory.create(channel);
  notifier.send(message);
}

sendWelcome("email", "회원가입이 완료되었습니다."); // 출력: [EMAIL] 회원가입이 완료되었습니다.
sendWelcome("sms", "인증번호는 1234입니다."); // 출력: [SMS] 인증번호는 1234입니다.

try {
  sendWelcome("push", "주문이 완료되었습니다.");
} catch (error) {
  console.log(error.message); // 출력: 지원하지 않는 채널입니다: push
}
