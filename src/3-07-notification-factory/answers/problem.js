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
  static #creators = {
    email: () => new EmailNotification(),
    sms: () => new SmsNotification(),
  };

  static create(channel) {
    const creator = NotificationFactory.#creators[channel];
    if (!creator) {
      throw new Error(
        `지원하지 않는 채널입니다: ${channel}`,
      );
    }
    return creator();
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
