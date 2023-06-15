//imports
import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import pageFind from "lume/plugins/pagefind.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sheets from "lume/plugins/sheets.ts";
// init site
const site = lume({
    src: "./src",
    location: new URL("https://lume-deno-template.deno.dev/"),
    components: {
        variable: "components",
    },
});

// adding plugins
site.use(
    tailwindcss({
        options: {
            darkMode: "class",
        },
    })
);
site.use(postcss());
site.use(metas());
site.use(codeHighlight());
site.use(date());
site.use(sitemap());
site.use(sheets());
site.use(
    pageFind({
        ui: {
            resetStyles: false,
            containerId: "search",
            showImages: false,
        },
    })
);

// static files
site.copy("assets");

// ignored files/directories
site.ignore("README.md", "CHANGELOG.md");

// global variables | site info
site.data("siteInfo", {
    name: "Networkstats.xyz",
    version: 0.1,
    repo: "https://github.com/ArnavK-09/lume-deno-template",
    description: "The network states statistical office ",
});

// image alts if not prsent
site.process([".html"], (page) => {
    page.document?.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("alt")) {
            img.setAttribute("alt", "Website image!");
        }
    });
});

// export
export default site;
