export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type Prettify<TType> = {
  [K in keyof TType]: TType[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface AllowedParams {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Date
    | AllowedParams
    | (string | number | boolean | undefined | Date | AllowedParams)[];
}
