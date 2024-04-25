export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type AllowedParams = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Date
    | AllowedParams
    | (string | number | boolean | undefined | Date | AllowedParams)[];
};
