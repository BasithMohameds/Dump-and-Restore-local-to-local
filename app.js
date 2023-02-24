const express = require("express");
const restore = require("mongodb-restore-dump");
const dumpDb = require("@dotmind/node-mongo-dump/lib/dumpDb");

const uri = "mongodb://localhost:27017/";
const app = express();
const myOutPath = `${__dirname}/dumpfiles`;

//default api
app.get("/", async () => {
  res.send("Backend Api Running...!");
});

//restore individual database data
app.get("/restoredatabase", async () => {
  await restore.database({
    uri,
    database: "which db u want to restore db name(local db Name)",
    from: "existing dump db path/dumped dbs which db u want to restore...? database Name",
  });
});

//restore individual database  individual collection data
app.get("/restoredbcollection", async (req, res) => {
  await restore.collection({
    uri,
    database: "which db u want to restore db name(local db Name)",
    collection: "your collection name.bson(sample.bson)",
    from: "existing dump db path/dumped dbs which db u want to restore...? /database Name/sample.bson",
  });
});

//local to local dump mongodb database
app.get("/dumpdb", async (req, res) => {
  try {
    const file = await dumpDb({
      dbName: "TestcaseTool",
      host: "localhost",
      port: "27017",
      nbSaved: 5,
      outPath: myOutPath,
      withStdout: false,
      withStderr: false,
      withClose: false,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(2000, () => {
  console.log("server started..!");
});
