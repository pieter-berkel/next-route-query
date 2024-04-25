export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

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
