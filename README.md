[![npm version](https://img.shields.io/npm/v/@itrocks/menu?logo=npm)](https://www.npmjs.org/package/@itrocks/menu)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/menu)](https://www.npmjs.org/package/@itrocks/menu)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/menu?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/menu)
[![issues](https://img.shields.io/github/issues/itrocks-ts/menu)](https://github.com/itrocks-ts/menu/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# menu

A flexible and accessible customizable main menu component with sidebar layout.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/menu
```

## Usage

`@itrocks/menu` provides a small set of classes you use to represent the
structure of your application menu. You typically:

1. Build a `Menu` instance from a simple configuration object.
2. Pass that instance to your view layer (for example the it.rocks
   template engine) to render the navigation.

Each menu is composed of blocks (`MenuBlock`) that contain items
(`MenuItem`). Both blocks and items have a `title` and a CSS-friendly
`class` derived from that title.

### Minimal example

```ts
import { Menu } from '@itrocks/menu'

const menu = new Menu({
	'General': {
		'/':          'Home',
		'/dashboard': 'Dashboard',
	},
	'Account': {
		'/profile': 'My profile',
		'/logout':  'Sign out',
	},
})

// menu.blocks is now an array of MenuBlock instances
```

This configuration creates two blocks, **General** and **Account**, each
containing several navigation items.

### Complete example with template rendering

In a real it.rocks application, the framework builds a `Menu` instance
from your configuration and exposes it to the HTML templates that render
the main layout.

The provided `menu.html` file illustrates how a typical sidebar layout
is generated from a `Menu` instance:

```html
<nav class="app menu">
	<ul>
		<!-- for each block in menu.blocks -->
		<li class="{class}">
			<h3>{title.tr}</h3>
			<ul>
				<!-- for each item in block.items -->
				<li>
					<a href="app://(link)" target="main">{title.tr}</a>
				</li>
			</ul>
		</li>
	</ul>
</nav>
```

You normally do not manipulate this template directly when using the
full it.rocks framework, but it shows the structure that will be
rendered: a navigation element containing an unordered list of blocks,
each with its own title and list of items.

If you want to reuse `@itrocks/menu` outside of the framework, you can
build a `Menu` instance as shown above and render it with your own
templating system by iterating over `menu.blocks` and `block.items`.

## API

### `class Menu`

Represents the whole application menu, made of multiple blocks of items.

#### Constructor

```ts
constructor(config?: Record<string, Record<string, string>>)
```

If a configuration object is provided, it is immediately loaded using
`loadConfig`.

The configuration format is:

```ts
type MenuConfig = Record<
	string,                     // block title
	Record<string, string>      // link -> item title
>
```

- The **keys** of the outer object are block titles.
- For each block, the **keys** of the inner object are item links
  (typically application routes), and the **values** are item titles
  shown to the user.

#### Properties

- `blocks: MenuBlock[]` – list of blocks that make up the menu. The
  order of the blocks follows the insertion order of the configuration
  object.

#### Methods

##### `loadConfig(config: Record<string, Record<string, string>>): void`

Clears the current menu structure and rebuilds it from the provided
configuration object.

For each `[blockTitle, blockItems]` entry in `config` a new
`MenuBlock(blockTitle)` is created, and for each `[link, title]` in
`blockItems` a `MenuItem(title, link)` is added to the block.

You can call `loadConfig` again to replace the menu at runtime (for
example when switching tenant, language, or user role).

#### Example

```ts
import { Menu } from '@itrocks/menu'

const menu = new Menu()

menu.loadConfig({
	'Admin': {
		'/admin/users':    'Users',
		'/admin/settings': 'Settings',
	},
})
```

---

### `class MenuBlock`

Represents a group of related menu items (for example a section in a
sidebar).

Blocks are created automatically by `Menu.loadConfig`, but you can also
instantiate them manually if you build the structure by hand.

#### Constructor

```ts
constructor(title: string)
```

#### Properties

- `title: string` – human-readable title of the block, as it should
  appear in the menu.
- `class: string` (getter) – CSS-friendly identifier derived from
  `title`, lowercased with all non-alphanumeric characters replaced by
  dashes (`-`). This is useful to style each block differently.
- `items: MenuItem[]` – list of items belonging to this block.

---

### `class MenuItem`

Represents a single clickable entry in a menu block.

Items are created automatically by `Menu.loadConfig`, but you can also
instantiate them manually.

#### Constructor

```ts
constructor(title: string, link: string)
```

#### Properties

- `title: string` – label displayed to the user.
- `class: string` (getter) – CSS-friendly identifier derived from
  `title`, lowercased with all non-alphanumeric characters replaced by
  dashes (`-`). This lets you style certain items differently.
- `link: string` – navigation target associated with the item. In a
  full it.rocks application this is typically a route handled by the
  framework.

#### Example

```ts
import { Menu, MenuBlock, MenuItem } from '@itrocks/menu'

const menu = new Menu()
const adminBlock = new MenuBlock('Administration')

adminBlock.items.push(new MenuItem('Users', '/admin/users'))
adminBlock.items.push(new MenuItem('Settings', '/admin/settings'))

menu.blocks.push(adminBlock)
```

## Typical use cases

- Build the main sidebar or header menu of an it.rocks application from
  a simple configuration object.
- Generate different menus depending on the current user role, tenant or
  context by loading different configurations at runtime.
- Integrate a navigation structure into your own templating system by
  iterating over `menu.blocks` and `block.items`.
- Style individual blocks and items through their automatically derived
  `class` property, without hard-coding CSS class names in your
  templates.
