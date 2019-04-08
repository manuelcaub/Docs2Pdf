const mdToPdf = require('md-to-pdf');
const fs = require('fs');

(async () => {
    const data = fs.readFileSync('.order', { encoding: 'utf8' });
    const text = data.toString().replace(/\r/g, '');
    const lines = text.split("\n");
    const allText = lines.map(line => fs.readFileSync(line + ".md", { encoding: 'utf8' }));

    if (!fs.existsSync("wiki")) {
      fs.mkdirSync("wiki");
    }

    fs.writeFileSync("wiki/allpages.md", allText.join(''));
    await mdToPdf('wiki/allpages.md', { dest: 'wiki/allpages.pdf',   pdf_options: {
        format: "A4",
        margin: "30mm 20mm"
      },
      stylesheet_encoding: "utf-8" }).catch(console.error);
})();