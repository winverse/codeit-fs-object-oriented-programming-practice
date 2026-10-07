# 18. 리스코프 치환 원칙으로 도형 클래스 고치기 해설

`resizeToBanner()`는 `setWidth()`가 가로만, `setHeight()`가 세로만 바꾼다는 `Rectangle`의 동작을 믿고 작성되었습니다. 상속한 `Square`는 정사각형 모양을 지키려고 두 메서드가 모두 두 변을 바꾸도록 오버라이딩했기 때문에, 마지막 `setHeight(4)`가 가로까지 4로 바꿔 넓이가 `16`이 되었습니다. 일상에서는 정사각형이 직사각형의 한 종류이지만, 가로와 세로를 따로 바꿀 수 있는 이 `Rectangle`의 자리에는 `Square`를 넣을 수 없습니다. 정답에서는 `Square`를 `Rectangle`과 상속 관계가 없는 클래스로 만들고 한 변의 길이를 `setSize()`로 바꾸게 했습니다. 두 클래스는 같은 `getArea()`를 제공하므로 넓이만 쓰는 `printAreas()`에는 함께 넘길 수 있고, 가로·세로를 따로 바꾸는 `resizeToBanner()`에는 `Rectangle`만 넘깁니다.
