# 04. 공유 메서드로 리팩터링하기 해설

공통 동작을 constructor 바깥의 class 본문 메서드로 정의하면 여러 인스턴스가 같은 함수 객체를 공유합니다. class 본문에 정의한 `buy`는 `User.prototype`에 하나만 놓이고 두 인스턴스가 prototype chain으로 같은 함수를 찾으므로, `u1.buy === u2.buy`와 `u1.buy === User.prototype.buy`가 모두 `true`입니다.
