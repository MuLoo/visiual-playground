# utils中TS工具函数的示例文档

## SetOptional
```typescript
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;
// 即
type SomeOptional = {
	a?: number; // 该属性已变成可选的
	b?: string; // 保持不变
	c: boolean; 
}
```
## ConditionalPick
```typescript
type Example = {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}
const tetst: ConditionalPick<Example, string | number> = {
  a: '11',
  b: 123
}
```

## AppendArgument
```typescript
type Fn = (a: number, b: string) => number
type FinalFn = AppendArgument<Fn, boolean> 
// 即
// (X: boolean, a: number, b: string) => number
```

## NativeFlat
只能去一层括号,返回联合类型
```typescript
type NaiveResult = NativeFlat<[['a'], ['b', 'c'], ['d']]>  
// "a" | "b" | "c" | "d"
type NaiveResult1 = NativeFlat<[['a'], ['b', 'c'], ['d', ['e','f']]]> 
// "a" | "b" | "c" | ["e", "f"] | "d"
```

## DeepFlat
返回联合类型
```typescript
type DeepResult = DeepFlat<[['a'], ['b', 'c'], ['d', ['e','f']]]>
// "a" | "b" | "c" | "e" | "f" | "d"
```
## Flat
返回数组类型
```typescript
type F0 = Flat<[]> // []
type F1 = Flat<['a', 'b', 'c']> // ["a", "b", "c"]
type F2 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]
```

## EmptyObject
```typescript
// 可以正常赋值
const shouldPass: EmptyObject = {};
// 将出现编译错误
const shouldFail: EmptyObject = {
  prop: "TS"
}
```

## NonEmptyArray
```typescript
const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
```

## JoinStrArray
```typescript
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
```

## Trim
```typescript
type TrimTest = Trim<' semlinker '>
type TrimTest1 = Trim<'     semlinker '>
type TrimTest2 = Trim<' semlinker    '>
type TrimTest3 = Trim<' semlinker'>
// 都是 "semlinker"
```

## IsEqual
```typescript
// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
type E2 = IsEqual<[1], []>; // false
```

## Head
```typescript
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3
```

## Tail
```typescript
type T0 = Tail<[]> // []
type T1 = Tail<[1, 2]> // [2]
type T2 = Tail<[1, 2, 3, 4, 5]> // [2, 3, 4, 5]
```

## Unshift
```typescript
type Arr0 = Unshift<[], 1>; // [1]
type Arr1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]
```

## Shift
```typescript
type S0 = Shift<[1, 2, 3]> // [2, 3]
```

## Push
```typescript
type Arr0 = Push<[], 1> // [1]
type Arr1 = Push<[1, 2, 3], 4> // [1, 2, 3, 4]
```

## Includes
```typescript
type I0 = Includes<[], 1> // false
type I1 = Includes<[2, 2, 3, 1], 2> // true
type I2 = Includes<[2, 3, 3, 1], 1> // true
type I3 = Includes<[2 | 3, 3, 3, 1], 2 | 3 | 4> // false
type I4 = Includes<[2 | 3, 3, 3, 1], 2 | 3> // true
type I5 = Includes<[never, 3, 3, 1], never> // true
```

## UnionToSection
```typescript
type U0 = UnionToIntersection<string | number> // never
type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }
```

## OptionalKeys
```typescript
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};
type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"
```

## Curry
```typescript
type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg: number) => (arg: string) => Date

```

## Merge
```typescript
type Foo = {
	a: number;
	b: string;
};

type Bar = {
	b: number;
};
type Test = Merge<Foo, Bar>
```

## Mutable
```typescript
type Foo = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};
type Test = Mutable<Foo, 'a'>
const mutableFoo: Mutable<Foo, 'a'> = { a: 1, b: '2', c: true };
mutableFoo.a = 2
```

## IsUnion
```typescript
type IsUnion<T, U = T> = // 你的实现代码

type I0 = IsUnion<string|number> // true
type I1 = IsUnion<string|never> // false
type I2 =IsUnion<string|unknown> // false

```

## Reverse
```typescript
type R0 = Reverse<[]> // []
type R1 = Reverse<[1, 2, 3]> // [3, 2, 1]
```

## Split
```typescript
type Item = 'semlinker,lolo,kakuqo';
type ElementType = Split<Item, ','>; // ["semlinker", "lolo", "kakuqo"]
```

## ToPath
```typescript
ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']
```


## Chainable
```typescript
type Chainable = {
  option(key: string, value: any): any
  get(): any
}

const result = config
  .option('age', 7)
  .option('name', 'lolo')
  .option('address', { value: 'XiaMen' })
  .get()

type ResultType = typeof result  
// ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }

```

## Repeat
```typescript

type R0 = Repeat<0, 0>; // []
type R1 = Repeat<1, 1>; // [1]
type R2 = Repeat<number, 2>; // [number, number]
```

## RepeatString
```typescript

type S0 = RepeatString<"a", 0>; // ''
type S1 = RepeatString<"a", 2>; // 'aa'
type S2 = RepeatString<"ab", 3>; // 'ababab'
```

## StartsWith
```typescript
type S0 = StartsWith<'123', '12'> // true
type S1 = StartsWith<'123', '13'> // false
type S2 = StartsWith<'123', '1234'> // false

```

## IsAny
```typescript
type I0 = IsAny<never> // false
type I1 = IsAny<unknown> // false
type I2 = IsAny<any> // true
```

## Replace
```typescript
type R0 = Replace<'', '', ''> // ''
type R1 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
type R2 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"
```

## ReplaceAll
```typescript
  type R2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
```

## Indexof
```typescript
type Arr = [1, 2, 3, 4, 5]
type I0 = IndexOf<Arr, 0> // -1
type I1 = IndexOf<Arr, 1> // 0
type I2 = IndexOf<Arr, 3> // 2
```

## RequireAllOrNone
```typescript
const p1: RequireAllOrNone<Person, 'age' | 'gender'> = {
  name: "lolo"
};

const p2: RequireAllOrNone<Person, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
  gender: 1
};
```

## RequireExactlyOne
```typescript
const p1: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
};

const p2: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: "lolo",
  gender: 1
};

// Error
const p3: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
  gender: 1
};
```

## ConsistsOnlyOf
```typescript
type C0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
type C1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
type C2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
type C3 = ConsistsOnlyOf<'', 'a'> //=> true
```