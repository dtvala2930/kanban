import { type ClassValue, clsx } from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function lazyImport<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	T extends React.ComponentType<any>,
	I extends { [K2 in K]: T },
	K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
	return Object.create({
		[name]: React.lazy(() =>
			factory().then((module) => ({ default: module[name] })),
		),
	});
}
