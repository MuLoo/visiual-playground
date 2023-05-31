/** 将给定的keys对应属性变为可选 */
export type SetOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** 条件选取。根据指定的条件来生成新的类型 */
export type ConditionalPick<V, T> = {
  [K in keyof V as V[K] extends T ? K : never]: V[K];
};

/** 为已有函数增加指定类型的参数，新增的参数放在函数参数的第一位，新增参数名假设为X */
export type AppendArgument<F extends (...args: any) => any, A> = (
  X: A,
  ...args: Parameters<F>
) => ReturnType<F>;

/** 数组类型扁平化.只去一层。返回联合类型， T[number]表示数组内元素类型 */
export type NativeFlat<T extends any[]> = T[number] extends any[]
  ? NativeFlat<T[number]>
  : T[number];
type NaiveResult = NativeFlat<[["a"], ["b", "c"], ["d", ["e", "f"]]]>;

/** 数组类型深度扁平化，返回联合类型 */
export type DeepFlat<T> = T extends any[] ? DeepFlat<T[number]> : T;

/** 数组类型拍平，返回数组类型 */
export type Flat<T extends any[]> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? [...Flat<A>, ...Flat<B>]
    : [A, ...Flat<B>]
  : [];

/** 只允许空对象赋值 */
export type EmptyObject = { [prop: string | number | symbol]: never };

/** 确保非空数组 */
export type NonEmptyArray<T> = [T, ...T[]];

/** 根据指定的分隔符，将字符串数组拼接起来 */
export type JoinStrArray<
  Arr extends string[],
  Sepatator extends string
> = Arr extends [infer A, ...infer B]
  ? `${A extends string ? A : ""}${B extends [string, ...string[]]
      ? `${Sepatator}${JoinStrArray<B, Sepatator>}`
      : ""}`
  : "";

/** 字符串进行去空格处理 */
export type Trim<V extends string> = V extends ` ${infer A}`
  ? Trim<A>
  : V extends `${infer B} `
  ? Trim<B>
  : V;

/** 字符串去除做空格 */
export type TrimLeft<V extends string> = V extends ` ${infer A}`
  ? TrimLeft<A>
  : V;

/** 字符串去除右空格 */
export type TrimRight<V extends string> = V extends `${infer A} `
  ? TrimRight<A>
  : V;

// Trim 也可以表示为
// type Trim<V extends string> = TrimLeft<TrimRight<V>>

/** 判断两个类型是否相等 */
export type IsEqual<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false;

/** 获取数组类型的第一个类型 */
export type Head<T extends any[]> = T extends [infer A, ...infer B] ? A : never;

/** 获取数组类型的除了第一个元素的剩下元素 */
export type Tail<T extends any[]> = T extends [infer A, ...infer B] ? B : never;

/** 将制定类型E，添加到T数组类型的第一个 */
export type Unshift<T extends any[], E> = [E, ...T];

/** 移除T数组类型的第一个类型 */
export type Shift<T extends any[]> = T extends [infer A, ...infer B] ? B : [];

/** 将制定类型E添加到T数组类型的最后一个 */
export type Push<T extends any[], E> = [...T, E];

/** 判断指定的类型 E 是否包含在 T 数组类型中 */
export type Includes<T extends any[], E> = T extends [infer A, ...infer B]
  ? IsEqual<A, E> extends true
    ? true
    : Includes<B, E>
  : false;

/** 将联合类型转换为交叉类型 */
export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

/** 获取对象类型中可选属性 */
export type OptionalKeys<T> = keyof {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};
// 另外的思路
// export type OptionalKeys<T> = Exclude<{
//   [K in keyof T]: undefined extends T[K] ? K : never
// }[keyof T], undefined>

/** 实现函数类型的科里化 */
export type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, ...infer B]
  ? B extends []
    ? (arg: A) => R
    : (arg: A) => Curry<(...arg: B) => R>
  : F;

/** 将两个类型合并为一个类型，第二种类型的key覆盖第一种类型的key */
export type Merge<FirstType, SecondType> = {
  [K in keyof (FirstType & SecondType)]: K extends keyof SecondType
    ? SecondType[K]
    : K extends keyof FirstType
    ? FirstType[K]
    : never;
};

/** 移除对象类型上所有属性或部分属性的readonly修饰符 */
export type Mutable<T, Keys extends keyof T = keyof T> = {
  -readonly [K in Keys]: T[K];
} & Omit<T, Keys>;

/** 判断指定的类型是否为联合类型 */
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never;

/** 判断是否是never类型 */
export type IsNever<T> = [T] extends [never] ? true : false;

/** 将元组类型中的元素位置颠倒，并返回数组 */
export type Reverse<T extends any[]> = T extends [infer A, ...infer B]
  ? [...Reverse<B>, A]
  : [];

/** 根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割 */
export type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer A}${Delimiter}${infer B}`
  ? [A, ...Split<B, Delimiter>]
  : [S];

/** 将属性访问([]或.)路径转换为元组的形式 */
export type ToPath<S extends string> =
  S extends `${infer A}[${infer B}]${infer C}`
    ? [A, B, ...ToPath<C>]
    : S extends `${infer A}.${infer B}`
    ? [A, ...ToPath<B>]
    : [S];

//  给基础类型 T 增加 { K, V } 键值对
type ReudceType<K extends string, V = any, T = object> = T & {
  [key in [K] as `${K}`]: V;
};
/** 通过option 链式调用，返回get返回最终结果 */
export type Chainable<T = object> = {
  option<K extends string, V = any>(
    key: K,
    value: V
  ): Chainable<ReudceType<K, V, T>>;
  get(): { [K in keyof T]: T[K] }; //  这里也可以直接返回 T, 不过这样并不直观, 所以手动遍历一下
};

/** 根据类型变量 C 的值，重复 T 类型并以元组的形式返回新的类型 */
export type Repeat<
  T,
  C extends number,
  A extends any[] = []
> = A["length"] extends C ? A : Repeat<T, C, [...A, T]>;

/** 根据类型变量 C 的值，重复 T 类型并以字符串的形式返回新的类型 */
export type RepeatString<
  T extends string,
  C extends number,
  A extends any[] = [],
  S extends string = ""
> = A["length"] extends C ? S : RepeatString<T, C, [...A, T], `${S}${T}`>;

/** 用于比较数值类型的大小 */
export type SmallerThan<
  N extends number,
  M extends number,
  A extends any[] = []
> = A["length"] extends N
  ? true
  : A["length"] extends M
  ? false
  : SmallerThan<N, M, [...A, ""]>;

/** 判断字符串字面量类型 T 是否以给定的字符串字面量类型 U 开头 */
export type StartsWith<
  T extends string,
  U extends string
> = T extends `${U}${infer A}` ? true : false;

/** 判断字符串字面量类型 T 是否以给定的字符串字面量类型 U 结尾 */
export type EndsWith<
  T extends string,
  U extends string
> = T extends `${infer Head}${U}` ? true : false;

/** 判断是否是any类型 */
export type IsAny<T> = [unknown] extends [T]
  ? [T] extends [string]
    ? true
    : false
  : false;

/** 字符串替换 */
export type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}` ? `${A}${To}${B}` : S;

/** 字符串全部替换 */
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}`
  ? `${A}${To}${ReplaceAll<B, From, To>}`
  : S;

/** 获取数组类型中指定箱的索引值，不存在的话，返回-1 */
export type IndexOf<T extends any[], Item, C extends any[] = []> = T extends [
  infer A,
  ...infer B
]
  ? IsEqual<A, Item> extends true
    ? C["length"]
    : IndexOf<B, Item, [...C, ""]>
  : -1;

/** 对给定的Keys要么都必选，要么都可选 */
export type RequireAllOrNone<T, K extends keyof T> = Omit<T, K> &
  (Required<Pick<T, K>> | Partial<Record<K, never>>);

/** 只能包含给定keys中的一个，不能包含全部 */
export type RequireExactlyOne<T, K extends keyof T> = K extends any
  ? Omit<T, K> & Partial<Record<K, never>>
  : never;

/** 判断一个长字符串是否是由多个子字符串组成 */
export type ConsistsOnlyOf<
  LongString extends string,
  Substring extends string
> = LongString extends ""
  ? true
  : LongString extends `${Substring}${infer A}`
  ? ConsistsOnlyOf<A, Substring>
  : false;
