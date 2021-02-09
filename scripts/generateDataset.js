const _ = require("lodash");

const moment = require("moment");
require("moment-timezone");

const { hashtags } = require("../constants");
const { generateJSONFile } = require("../helpers");
const { searchTweets } = require("../lib/Twitter");

(async () => {
    try {
        const dataset = {
            Tweets: [],
        };
        for (const hashtag of hashtags) {
            //#region Random number between 20 and 100
            const count = Math.floor(Math.random() * 100) + 20;
            //#endregion Random number between 20 and 100
            //#region Last 5 days tweets
            const since = moment.tz("America/Guayaquil").subtract(5, "days");
            const until = moment.tz("America/Guayaquil");
            //#endregion Last 5 days tweets
            const response = await searchTweets({
                q: hashtag,
                since,
                until,
                count,
            });
            const statuses = response.statuses;
            // parse response
            const temp = [];
            for (const status of statuses) {
                const parsed = _.pick(status, [
                    "entities",
                    "favorite_count",
                    "retweet_count",
                    "lang",
                    "text",
                    "created_at",
                    "user.name",
                    "user.followers_count",
                    "user.verified",
                ]);
                temp.push(parsed);
                // global result parsed
                dataset.Tweets.push(parsed);
            }
            // push object into
            dataset[hashtag] = temp;
        }
        generateJSONFile("db.json", JSON.stringify(dataset, null, 2));
        // using retweet count you can know about post
        console.log("done!");
    } catch (e) {
        console.log("Error", e);
    }
})();
