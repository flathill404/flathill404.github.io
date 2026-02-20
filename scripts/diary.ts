import { getConfig } from "./diary/config";
import { CLI } from "./diary/cli";
import { GenCommand } from "./diary/commands/gen";
import { ConvertImagesCommand } from "./diary/commands/convert-images";
import { CopyAssetsCommand } from "./diary/commands/copy-assets";

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
