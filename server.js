var express = require('express');
var glob = require('glob');
var app = express();
var port = process.env.PORT || 3000;
var publicDir = "public/";

var htmlFiles;

glob("public/*.html", null, function (er, files) {
  htmlFiles = files.map(function(file) {
      var splitName = file.replace(publicDir, "").replace(".html", "")
        .split("_");
      var name = splitName.map(function(name) {
          return name.charAt(0).toUpperCase() + name.slice(1);

      }).join(" ");
      var file = "/" + file.replace(publicDir, "");
      return {
          "name": name,
          "fileUrl": file
      };
  });
});

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('files', {
        data: htmlFiles
    });
});

app.use(express.static(__dirname + "/" + publicDir));

app.listen(port);


console.log("Server is running on port " + port);
