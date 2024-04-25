"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parse, stringify } from "./utils";
import type { AllowedParams, DeepPartial, Prettify } from "./types";

type Params<T> = Prettify<DeepPartial<T>>;

export const useRouteQuery = <T extends AllowedParams>(): [
  Params<T>,
  React.Dispatch<React.SetStateAction<Params<T>>>
] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [params, setParams] = useState<Params<T>>(
    parse(searchParams.toString()) as Params<T>
  );

  const updated = useRef(true);
  useEffect(() => {
    if (updated.current) {
      updated.current = false;
      return;
    }

    setParams(parse(searchParams.toString()) as Params<T>);
  }, [searchParams]);

  useEffect(() => {
    updated.current = true;
    const query = stringify(params);
    router.replace(`${pathname}${query}`);
  }, [params, pathname, router]);

  return [params, setParams];
};
