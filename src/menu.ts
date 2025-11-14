
export class Menu
{

	blocks: MenuBlock[] = []

	constructor(config?: Record<string, Record<string, string>>)
	{
		if (config) {
			this.loadConfig(config)
		}
	}

	loadConfig(config: Record<string, Record<string, string>>)
	{
		for (const [blockTitle, blockItems] of Object.entries(config)) {
			const block = new MenuBlock(blockTitle)
			for (const [link, title] of Object.entries(blockItems)) {
				block.items.push(new MenuItem(title, link))
			}
			this.blocks.push(block)
		}
	}

}

class MenuCommons
{

	constructor(public title: string)
	{}

	get class()
	{
		return this.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
	}

}

export class MenuBlock extends MenuCommons
{

	items: MenuItem[] = []

}

export class MenuItem extends MenuCommons
{

	link: string

	constructor(title: string, link: string)
	{
		super(title)
		this.link = link
	}

}
