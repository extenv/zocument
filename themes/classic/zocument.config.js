export const config = {
    version: "1.0.0", //version of your documentation
    title: "My Awesome App", //Title your documentation
    imageIcon: "assets/icon.png", //Path to your logo icon

    directLink: [
        { title: "API", link: "#" },
        { title: "Github", link: "/github" },
        { title: "Donate", link: "/donate" },
    ],

    //list of menus to be displayed in the sidebar
    route: [
        {
            titleHeader: "Getting Started",
            //title of the menu
            sidebar: [
                { title: "Menu 1", content: "Path Markdown" }, // First line is the default page
                { title: "Menu 2", content: "Path Markdown" },
                { title: "Menu 3", content: "Path Markdown" },
            ],
        },
        {
            titleHeader: "Examples",
            //title of the menu
            sidebar: [
                { title: "Menu 1", content: "Path Markdown" },
                { title: "Menu 2", content: "Path Markdown" },
                { title: "Menu 3", content: "Path Markdown" },
            ],
        }
    ],
}