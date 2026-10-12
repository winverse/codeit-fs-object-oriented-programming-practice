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

class Square {
  #size;

  constructor(size) {
    this.#size = size;
  }

  setSize(size) {
    this.#size = size;
  }

  getArea() {
    return this.#size * this.#size;
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

square.setSize(6);

printAreas([rectangle, square]);
// 출력:
// 20
// 36
