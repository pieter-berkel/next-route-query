# Route Query

Route Query is a utility library for handling URL query parameters in NextJS applications. It supports NextJS 13 or higher and requires the `qs` package. It preserves types of string, number, boolean, and date during the query string parsing and stringifying process.

## Installation

To install Route Query and its dependencies, run the following command in your terminal:

```bash
npm install next-route-query
```

## Usage

### Server Side

To use Route Query on the server side, you can import `parseServerSearchParams` and `SearchParams` from the library. Here's an example:

```tsx
import { parseServerSearchParams, SearchParams } from "route-query";

function Page({ searchParams }: { searchParams?: SearchParams }) {
  const params = parseServerSearchParams<{ search: string; sizes: number[] }>(
    searchParams
  );

  // Now you can use the params in your server side logic
}
```

### Client Side

On the client side, you can use the `useRouteQuery` hook from Route Query. Here's how you can use it:

```tsx
import { useRouteQuery } from "route-query";

function Page() {
  const [params, setParams] = useRouteQuery<{
    search: string;
    sizes: number[];
  }>();

  // Now you can use the params in your client side logic
}
```

### Creating Query Strings

To create a query string from an object, you can use the `stringify` function from Route Query:

```tsx
import { stringify } from "route-query";

const query = stringify({
  search: "hello",
  sizes: [1, 2, 3],
});

// This will output: ?search=hello&sizes[0]=nr:1&sizes[1]=nr:2&sizes[2]=nr:3
```

### Parsing Query Strings

To parse a query string into an object, you can use the `parse` function from Route Query:

```tsx
import { parse } from "route-query";

const params = parse("?search=hello&sizes[0]=nr:1&sizes[1]=nr:2&sizes[2]=nr:3");

// This will output: { search: "hello", sizes: [1, 2, 3] }
```
