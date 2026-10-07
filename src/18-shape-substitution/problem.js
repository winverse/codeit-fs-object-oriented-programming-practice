// src/18-shape-substitution/problem.js
class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  setWidth(width) {
    this.#width = width;
  }

  setHeight(height) {
    this.#height = height;
  }

  getArea() {
    return this.#width * this.#height;
  }
}

// TODO: Rectangle을 상속하지 않는 클래스로 바꾸고,
// 한 변의 길이를 private field #size에 담아 setSize(size)로 바꾸기
class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  setWidth(width) {
    super.setWidth(width);
    super.setHeight(width);
  }

  setHeight(height) {
    super.setWidth(height);
    super.setHeight(height);
  }
}

// 직사각형을 가로 5, 세로 4인 배너 크기로 바꾸고 넓이를 반환합니다
function resizeToBanner(rectangle) {
  rectangle.setWidth(5);
  rectangle.setHeight(4);
  return rectangle.getArea();
}

// 도형 목록의 넓이를 차례로 출력합니다
function printAreas(shapes) {
  shapes.forEach((shape) => {
    console.log(shape.getArea());
  });
}

const rectangle = new Rectangle(2, 3);
const square = new Square(2);

console.log(resizeToBanner(rectangle)); // 출력: 20

// TODO: 아래 줄을 지우고 square.setSize(6)으로 한 변을 6으로 바꾸기
console.log(resizeToBanner(square));

printAreas([rectangle, square]);
// 출력:
// 20
// 36
