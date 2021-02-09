const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");

(async () => {
    // code
    const db = await low(adapter);

    const findTweet = db.get("#VacunaCOVID19").sortsortBy("retweet_count").take(5).value();
    console.log(findTweet);
})();
