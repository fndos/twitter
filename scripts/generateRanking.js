const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const { hashtags } = require("../constants");
const { normalizeText } = require("normalize-text");
const _ = require("lodash");

(async () => {
    // Your code goes here
    try {
        // Propuesta de cómo medir la influencia de un usuario de la muestra
        // Para medir la influencia de un usuario de la muestra puedes usar retweet_count
        for (const hashtag of hashtags) {
            const db = await low(adapter);
            if (db.get(hashtag).value()) {
                const findTweet = db.get(hashtag).value();
                const TweetSortByRetweetCount = _.orderBy(findTweet, ["retweet_count"], ["desc"]);
                const TweetTop = _.take(TweetSortByRetweetCount, 5);
                const results = TweetTop.map((currentValue, i) => {
                    return `[${i + 1}] ${currentValue.user.name} with ${currentValue.retweet_count} retweets`;
                });
                // Top 5 de los usuarios más influyentes
                console.log(`Top for ${hashtag}`);
                for (const result of results) {
                    console.log(result);
                }
                continue;
            }
            throw new Error("There is no dataset generated. Please run generateDataset.js first.");
        }
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();

// Visualiza la actividad por día de cada uno de los hashtags, indicando el día de mayor actividad.
