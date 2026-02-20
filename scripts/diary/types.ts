import type { DiaryConfig } from "./config";

export interface ICommand {
	name: string;
	description: string;
	execute(args: string[], config: DiaryConfig): Promise<void> | void;
}
