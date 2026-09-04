// src/07-pattern-reading/code-d.js
class CardPayment {
  pay(amount) {
    console.log(`[CARD] ${amount}원 결제`);
  }
}

class KakaoPayment {
  pay(amount) {
    console.log(`[KAKAO] ${amount}원 결제`);
  }
}

class Checkout {
  #paymentStrategy;

  constructor(paymentStrategy) {
    this.#paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy) {
    this.#paymentStrategy = paymentStrategy;
  }

  pay(amount) {
    this.#paymentStrategy.pay(amount);
  }
}

const checkout = new Checkout(new CardPayment());
checkout.pay(30_000);

checkout.setPaymentStrategy(new KakaoPayment());
checkout.pay(30_000);
