# loom

Loom is a tiny but versitile dashboard framework that provides the fundamentals to build and work with a single page dashboard of widgets. Loom runs on [Bun](https://bun.sh/) with [React](https://react.dev/) and is written in [TypeScript](https://www.typescriptlang.org/).

### What To Expect

Loom will not solve all your problems, but will handle (most) of the visual aspects of creating widgets and managing layout states among other things. Data sources and individial settings is entirely up to the widgets themselves.

---

## Getting Started

### Prerequisites

- [git](https://git-scm.com/)
- [Bun](https://bun.sh/)

### Setting Up Your Environment

1. Fork `loom` (`git clone git@github.com:hejrobin/loom.git`)
2. `cd` to your forked project and run `bun install`
3. `bun start` to start development server.

> If you intend to run loom as a stand-alone project, fork it to a new folder. After that you can run `bun loom:init {{project_id}}`, this will create a `project.json` in your project root with some project config variables.

### Contributing

You can chose whatever code editor or IDE you're the most comfortable with, we like [Visual Studio Code](https://code.visualstudio.com/). It is recommended that your chosen editor can use `.editorconfig`.

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org) is run before each commit, but it's recommended that you set up your editor to run these checks on save.

When committing code, commit messages must follow [Conventional Commits 1.0](https://www.conventionalcommits.org/). There is a pre-commit hook that will lint commit messages for you aswell.

---

### Available Commands

- `bun start` — _Starts development server_
- `bun build` — _Builds the app for production_
- `bun release:patch` — _Creates a patch release, git tags and updates CHANGELOG.md_
- `bun release:minor` — _Creates a minor release, git tags and updates CHANGELOG.md_
- `bun release:major` — _Creates a major release, git tags and updates CHANGELOG.md_

#### Loom Specific Commands

- `bun loom:new {{WidgetName}}` — _Creates a new widget boilerplate_
- `bun loom:scan` — _Will scan through src/widgets and update repository file_

---

## Creating Widgets

> :exclamation: `{{WidgetName}}` is just a placeholder for the name of your widget, in [PascalCase](https://en.wikipedia.org/wiki/Camel_case).

1. Run `bun loom:new {{WidgetName}}`
	> A new widget boilerplate will be created in `src/widgets/{{widget_name}}`.
2. Get to coding! If you need more in-depth help, check out `src/widgets/README.md`.

---

#### Useful Links

- [JavaScript Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Bun Documentation](https://bun.sh/docs)
- [Can I Use?](https://caniuse.com/) — JavaScript & CSS browser compability tables

---

Happy coding! 🥳
