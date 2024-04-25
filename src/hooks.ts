"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { parse, stringify } from "./utils.js";
import type { AllowedParams } from "./types.js";

export const useRouteQuery = <T extends AllowedParams>(): [
  T,
  React.Dispatch<React.SetStateAction<T>>
] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [params, setParams] = useState<T>(parse(searchParams.toString()) as T);

  const updated = useRef(true);
  useEffect(() => {
    if (updated.current) {
      updated.current = false;
      return;
    }

    setParams(parse(searchParams.toString()) as T);
  }, [searchParams]);

  useEffect(() => {
    updated.current = true;
    const query = stringify(params);
    router.replace(`${pathname}${query}`);
  }, [params, pathname, router]);

  return [params, setParams];
};
