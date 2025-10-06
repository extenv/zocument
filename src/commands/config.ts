import { ObjectBuilder } from '../utils/Builder';
import { DEFAULT_VERSION } from '../types/constant';

const classicBuilder = new ObjectBuilder();

classicBuilder.objectHeader(true, 'const', 'config');

// version
classicBuilder.addComment('version of your documentation');
classicBuilder.addProperty('version', DEFAULT_VERSION);

// title
classicBuilder.addComment('Title your documentation');
classicBuilder.addProperty('title', 'My Awesome App');

// imageIcon
classicBuilder.addComment('Path to your logo icon');
classicBuilder.addProperty('imageIcon', 'assets/icon.png');

// themes
classicBuilder.addComment('theme mode, available light/dark for default');
classicBuilder.addProperty('themes', 'light');

// themeMode
classicBuilder.addComment('toogle button for dark/light mode');
classicBuilder.addProperty('themeMode', true);

// githubLink
classicBuilder.addComment(
  'github link, if you want to display the github icon on the navbar'
);
classicBuilder.addProperty('githubLink', '');

// route
classicBuilder.addComment('list of menus to be displayed in the sidebar');
classicBuilder.startArray('route');

classicBuilder.startObject(undefined);
classicBuilder.addProperty('titleHeader', '/', '"/" for root');
classicBuilder.addComment('title of the menu');
classicBuilder.startArray('sidebar');
classicBuilder.addInlineObject(
  { title: 'Home', content: 'File Name Markdown' },
  'first line is the default page'
);
classicBuilder.addInlineObject({
  title: 'About',
  content: 'File Name Markdown',
});
classicBuilder.addInlineObject({
  title: 'Contact',
  content: 'File Name Markdown',
});
classicBuilder.endArray();
classicBuilder.endObject();

classicBuilder.startObject(undefined);
classicBuilder.addProperty('titleHeader', 'Docs', 'title of the header menu');
classicBuilder.addComment('title of the menu');
classicBuilder.startArray('sidebar');
classicBuilder.addInlineObject(
  { title: 'Home', content: 'File Name Markdown' },
  'first line is the default page'
);
classicBuilder.addInlineObject({
  title: 'About',
  content: 'File Name Markdown',
});
classicBuilder.addInlineObject({
  title: 'Contact',
  content: 'File Name Markdown',
});
classicBuilder.endArray();
classicBuilder.endObject();

classicBuilder.endArray();

const classicTheme = classicBuilder.build();

// ========= MODERN THEME =========
const modernBuilder = new ObjectBuilder();

modernBuilder.objectHeader(true, 'const', 'config');

// version
modernBuilder.addComment('version of your documentation');
modernBuilder.addProperty('version', DEFAULT_VERSION);

// title
modernBuilder.addComment('Title your documentation');
modernBuilder.addProperty('title', 'My Awesome App');

// imageIcon
modernBuilder.addComment('Path to your logo icon');
modernBuilder.addProperty('imageIcon', 'assets/icon.png');

// themes
modernBuilder.addComment('theme mode, available light/dark for default');
modernBuilder.addProperty('themes', 'light');

// themeMode
modernBuilder.addComment('toogle button for dark/light mode');
modernBuilder.addProperty('themeMode', true);

// githubLink
modernBuilder.addComment(
  'github link, if you want to display the github icon on the navbar'
);
modernBuilder.addProperty('githubLink', '');

// route
modernBuilder.addComment('list of menus to be displayed in the sidebar');
modernBuilder.startArray('route');

modernBuilder.startObject(undefined);
modernBuilder.addProperty('titleHeader', '/', '"/" for root');
modernBuilder.addComment('title of the menu');
modernBuilder.startArray('sidebar');
modernBuilder.addInlineObject(
  { title: 'Home', content: 'File Name Markdown' },
  'first line is the default page'
);
modernBuilder.addInlineObject({
  title: 'About',
  content: 'File Name Markdown',
});
modernBuilder.addInlineObject({
  title: 'Contact',
  content: 'File Name Markdown',
});
modernBuilder.endArray();
modernBuilder.endObject();

modernBuilder.startObject(undefined);
modernBuilder.addProperty('titleHeader', 'Docs', 'title of the header menu');
modernBuilder.addComment('title of the menu');
modernBuilder.startArray('sidebar');
modernBuilder.addInlineObject(
  { title: 'Home', content: 'File Name Markdown' },
  'first line is the default page'
);
modernBuilder.addInlineObject({
  title: 'About',
  content: 'File Name Markdown',
});
modernBuilder.addInlineObject({
  title: 'Contact',
  content: 'File Name Markdown',
});
modernBuilder.endArray();
modernBuilder.endObject();

modernBuilder.endArray();

const modernTheme = modernBuilder.build();

const themes = {
  classic: classicTheme,
  modern: modernTheme,
};

export default themes;
