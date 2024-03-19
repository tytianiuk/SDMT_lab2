# Сonverter Markdown to HTML | ANSI 

It is a simple tool for converting Markdown text to HTML or ANSI format. Its functionality is based on replacing Markdown markup with HTML or ANSI markup.You can output the converted text to the console or to file. Also, the program only provides for the use of the correct markdown markup, so be careful what you use.

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
3. Install dependencies for program work 
   ```bash
   npm i
   ```
4. Run program
   ```bash
   node index.js
   ```

# Usage

The program has 2 options for use, we specify the path to the file with the Markdown text. And then you can use 2 flags: 
- '--out=' - you can specify the path where to send the converted text.
- '--format=' - you can choose which format to convert to.

1. Output to the file:
    ```bash
    node index.js path/to/mark/down -out=path/to/file
    ```
> **NOTE:** if you omit `--out=` the default output will be to the console
2. Select format:
    ```bash
    node index.js path/to/mark/down --format=ansi
    ```
> **NOTE:** if you omit `--format=` the default format will be ANSI
3. Select format with outputting to the file:
    ```bash
    node index.js path/to/mark/down --out=path/to/html/file --format=ansi
    ```
> **NOTE:** if the `--format=` flag is present, its format is always used. If it is not present, but '--out=' is present, then HTML is used.

# Testing

You can run the tests with the command:
```bash
    npm test
```

# [Revert commit](https://github.com/tytianiuk/SDMT_lab2/commit/b1fc96fe60984b1a39e67afdead19519dbd6a6ea)
# [Failed tests](https://github.com/tytianiuk/SDMT_lab2/commit/89c63bbfc8d2a45a1535638ff2cd49f529e40de8)

# Conclusion

The use of tests has changed my perception of their necessity. Now I'm convinced that almost all projects need them. 
Yes, writing tests takes time, but it is compensated by the fact that:
- we are convinced that if we change some part of the code, the program will work correctly
- we save time because we don't have to manually test the program every time
