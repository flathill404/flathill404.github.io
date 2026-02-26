import { CLI } from "./diary/cli";
import { ConvertImagesCommand } from "./diary/commands/convert-images";
import { CopyAssetsCommand } from "./diary/commands/copy-assets";
import { GenCommand } from "./diary/commands/gen";
import { getConfig } from "./diary/config";

async function main() {
	const config = getConfig();
	const cli = new CLI(config);

	cli.register(new GenCommand());
	cli.register(new ConvertImagesCommand());
	cli.register(new CopyAssetsCommand());

	const args = process.argv.slice(2);
	await cli.run(args);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
