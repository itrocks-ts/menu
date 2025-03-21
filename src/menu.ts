
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

export class MenuBlock
{

	items: MenuItem[] = []

	title: string

	constructor(title:string)
	{
		this.title = title
	}

}

export class MenuItem
{

	link: string

	title: string

	constructor(title: string, link: string)
	{
		this.link  = link
		this.title = title
	}

}
