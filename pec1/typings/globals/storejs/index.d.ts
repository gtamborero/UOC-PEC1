// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/0e50ed4cc33b26a7f3396cd61ed6e6d4ad9206ec/storejs/index.d.ts
interface StoreJSStatic {
	set(key: string, value: any): any;
	get(key: string): any;
	remove(key: string): void;
	clear(): void;
	enabled: boolean;
	disabled: boolean;
	transact(key: string, defaultValue: any, transactionFn?: (val: any) => void): void;
	getAll(): any;
	serialize(value: any): string;
	deserialize(value: string): any;
	forEach(command: (key: string, value: any) => void): void;
}

declare var store: StoreJSStatic;
declare module 'store' {
	export = store;
}
