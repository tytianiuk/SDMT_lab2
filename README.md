# Сonverter Markdown to HTML

It is a simple tool for converting Markdown text to HTML format. Its functionality is based on replacing Markdown markup with HTML markup.You can output the converted text to the console or to an HTML file. Also, the program only provides for the use of the correct markdown markup, so be careful what you use. 

# What tags does it process?

-   bold text - ( \*\* )
-   italic text - ( \_ )
-   monospaced text - ( `` )
-   preformatted - ( ``` )
-   paragraphing

# Installation

1. Install [Node.js](https://nodejs.org/en/download/current) to run this program.
2. Clone this repository and enter to the cloned directory:
   ```bash
   git clone https://github.com/tytianiuk/SDMT_lab1.git
   cd SDMT_lab1
   ```
# Usage
The program has 2 types of use, both of which require specifying the path to the Markdown file. You can output the converted text to the console or to an HTML file if you specify `--out` and the path to the HTML file.
1. Output to the console:
   ```bash
   node index.js path/to/mark/down.md
   ```
2. Output to HTML file:
   ```bash
   node index.js path/to/mark/down.md --out path/to/html/file.html
   ```

# [Revert commit](https://github.com/tytianiuk/SDMT_lab1/commit/fc863abfa0e3ac3290a30c6ee23f752832185ff1)
