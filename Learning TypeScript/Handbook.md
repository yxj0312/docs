# [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Basic Types

### Array

Array types can be written in one of two ways.

```TypeScript
// use the type of the elements followed by [] to denote an array of that element type 
let list: number[] = [1, 2, 3];

// The second way uses a generic array type, Array<elemType>
let list: Array<number> = [1, 2, 3];
```

## Interfaces

One of TypeScript’s core principles is that type checking focuses on the shape that values have.

### Our First Interface

```TypeScript
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

### Optional Properties

```TypeScript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

### Readonly properties

Some properties should only be modifiable when an object is first created. You can specify this by putting readonly before the name of the property:

readonly vs const

The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property. Variables use const whereas properties use readonly.

### Excess Property Checks
