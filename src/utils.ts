import qs from "qs";

import type {
  AllowedParams,
  DeepPartial,
  Prettify,
  SearchParams,
} from "./types";

type Params<T> = Prettify<DeepPartial<T>>;

export const parseServerSearchParams = <T extends AllowedParams>(
  searchParams?: SearchParams
) => {
  if (!searchParams) return {} as Params<T>;
  const string = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return parse(string) as Params<T>;
};

export const parse = (...args: Parameters<typeof qs.parse>) => {
  return qs.parse(args[0], {
    ignoreQueryPrefix: true,
    decoder: (str, decoder, charset, type) => {
      const decoded = decoder(str, decoder, charset);
      if (type !== "value") return decoded;

      const regex = /^(date|bool|nr):(.*)/m;
      const match = regex.exec(decoded);

      if (!match) return decoded;
      const [, typed, value] = match;

      switch (typed) {
        case "nr":
          return Number(value);
        case "bool":
          return value === "true";
        case "date":
          return new Date(value);
        default:
          return decoded;
      }
    },
    ...args[1],
  });
};

export const stringify = (...args: Parameters<typeof qs.stringify>) => {
  return qs.stringify(args[0], {
    addQueryPrefix: true,
    encodeValuesOnly: true,
    serializeDate: (date) => `date:${date.toISOString()}`,
    encoder: (str, encoder, charset, type) => {
      if (type === "value" && typeof str !== "string") {
        switch (typeof str) {
          case "number":
            return `nr:${encoder(str, encoder, charset)}`;
          case "boolean":
            return `bool:${encoder(str, encoder, charset)}`;
        }
      }

      return encoder(str, encoder, charset);
    },
    ...args[1],
  });
};
