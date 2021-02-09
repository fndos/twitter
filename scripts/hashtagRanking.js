const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const { normalizeText } = require("normalize-text");

(async () => {
    // Your code goes here
    try {
        // Crea un ranking del top 5 de los hashtags más utilizados
        const db = await low(adapter);
        if (db.get("#All").value()) {
            const findTweets = db.get("#All").value();
            const HashtagArray = [];
            const HashtagObject = {};
            for (const tweet of findTweets) {
                const hashtags = _.get(tweet, "entities.hashtags");
                if (!_.isEmpty(hashtags)) {
                    for (const hashtag of hashtags) {
                        HashtagObject[hashtag.text] = (HashtagObject[hashtag.text] || 0) + 1;
                    }
                }
            }
            for (const [key, value] of Object.entries(HashtagObject)) {
                HashtagArray.push({ text: key, count: value });
            }
            const HashtagArraySortByCount = _.orderBy(HashtagArray, ["count"], ["desc"]);
            const HashtagTop = _.take(HashtagArraySortByCount, 5);
            console.log("Top for most used hashtags");
            let i = 0;
            for (const hashtag of HashtagTop) {
                i += 1;
                console.log(`[${i}] ${normalizeText(hashtag.text)}: ${hashtag.count}`);
            }
            return "Done!";
        }
        throw new Error("There is no dataset generated. Please run generateDataset.js first.");
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();
