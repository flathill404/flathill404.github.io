import type { ICommand } from "./types";
import type { DiaryConfig } from "./config";

export class CLI {
	private commands: Map<string, ICommand> = new Map();

	constructor(private config: DiaryConfig) {}

	register(command: ICommand): void {
		this.commands.set(command.name, command);
	}

	async run(args: string[]): Promise<void> {
		const commandName = args[0];
		const commandArgs = args.slice(1);

		if (!commandName || ["help", "--help", "-h"].includes(commandName)) {
			this.printHelp();
			return;
		}

		const command = this.commands.get(commandName);
		if (!command) {
			console.error(`Unknown command: ${commandName}`);
			this.printHelp();
			process.exit(1);
		}

		try {
			await command.execute(commandArgs, this.config);
		} catch (error) {
			console.error(`Error executing ${commandName}:`, error);
			process.exit(1);
		}
	}

	private printHelp(): void {
		console.log("Usage: bun run scripts/diary.ts <command> [options]");
		console.log("\nCommands:");
		for (const command of this.commands.values()) {
			console.log(`  ${command.name.padEnd(10)} ${command.description}`);
		}
	}
}
