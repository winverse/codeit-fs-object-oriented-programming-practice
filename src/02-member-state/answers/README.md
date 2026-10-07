# 02. 팩토리 함수로 회원 상태 분리하기 해설

`createMember()`는 호출될 때마다 `name`, `level` 프로퍼티와 `levelUp()`, `getInfo()` 메서드를 가진 객체를 새로 만들어 반환합니다. 파라미터 이름과 프로퍼티 이름이 같으므로 `name: name` 대신 프로퍼티 축약 표기로 `name`만 적습니다. `m1`과 `m2`는 서로 다른 호출에서 만들어진 별개의 객체이므로, `m1.levelUp()`이 `this.level`을 1 올려도 `m2`의 `level`은 3 그대로입니다. `levelUp()`에서 `this` 없이 `level += 1`이라고 쓰면 객체의 `level` 프로퍼티가 아니라 함수가 받은 파라미터 `level`만 바뀌므로, `this.level`을 읽는 `getInfo()`의 결과는 바뀌지 않습니다.
