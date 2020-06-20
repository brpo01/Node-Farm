const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataDetail = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
      header: "head",
    });
    const parsedData = dataDetail
      .map((el) => replaceTemplate(card, el))
      .join("");
    const output = overview.replace(/{%PRODUCT_CARDS%}/g, parsedData);
    res.end(output);
    
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const parse = dataDetail[query.id];
    const output = replaceTemplate(product, parse);
    res.end(output);
  } else {
    res.writeHead(401, {
      "Content-type": "text/html",
    });

    res.end("<h1>Page Not Found!!</h1>");
  }
});

const port = 4000;

server.listen(port, "127.0.0.1", () => {
  console.log(`server listening at ${port}`);
});
