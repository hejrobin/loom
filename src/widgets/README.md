# Widgets

Widgets are components displayed on dashboards. Loom does not provide any magical data or state management, only presentation. Logic for your specific widgets _should_ belong to the widget itself, but if you need shared data structures you can add that logic to `src/bootstrap.ts`.

---

## Creating a Widget

To start off, run `bun loom:new {{WidgetName}}`, where `{{WidgetName}}` is a "[Pascal-cased](https://en.wikipedia.org/wiki/Camel_case)" string, with no special characters, spaces or numbers. This will generate a new widget in `src/widgets/{{widget_name}}`. This is where you build your presentation logic. You can change name, version and other meta data related things inside the `manifest.ts`.

### Styling Widgets

Loom ships with [CSS Modules](https://css-tricks.com/css-modules-part-1-need/), the CSS file should accordingly be named `styles.module.css`.

---

## Custom Widget Settings

Inside `settings.tsx` of your widget, you can add any settings to your widget, if needed.
