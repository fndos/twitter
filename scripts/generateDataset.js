const _ = require("lodash");
const Twit = require("twit");
const moment = require("moment");
require("moment-timezone");
const fs = require("fs");

const credentials = {
    CONSUMER_KEY: process.env.CONSUMER_KEY || "tPhuYUlVME2IjA1rYsh26yXpa",
    CONSUMER_SECRET: process.env.CONSUMER_SECRET || "dS7zZIp1Jgq9dB3inxerM5GcDB85tC0CoyyOBch0aDCJPGm4PT",
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || "1146457499954044928-uVK4oBmxpb4SqAXRvtd8TwmJoE8SiR",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "rn6LaX48qT3Gk1q47hSSTgGOqw9EahZitxX9DOgNkc2VH",
};

const connect = (credentials) => {
    return new Twit({
        consumer_key: credentials.CONSUMER_KEY,
        consumer_secret: credentials.CONSUMER_SECRET,
        access_token: credentials.ACCESS_TOKEN,
        access_token_secret: credentials.ACCESS_TOKEN_SECRET,
    });
};

const searchTweets = (access, raw = {}) => {
    return new Promise((resolve) => {
        const T = connect(access);
        return T.get("search/tweets", raw, (err, data) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data);
        });
    });
};

const hashtags = [
    "#VacunaCOVID19",
    "#sismo",
    "#WandaVision",
    "#UKlockdown3",
    "#Indonesia",
    "#iPhone",
    "#CES2021",
    "#Adictosdigitales",
    "#Tech",
    "#innovation",
    "#iphone",
    "#EE.UU",
];

function generateJSONFile(filename, data) {
    fs.appendFile(filename, data, (err) => {
        if (err) {
            console.log("Error writing to csv file", err);
        } else {
            // Do nothing
        }
    });
}

(async () => {
    try {
        const results = {
            tweets: [],
        };
        const globalResult = [];
        for (const hashtag of hashtags) {
            //#region Random number between 20 and 100
            const count = Math.floor(Math.random() * 100) + 20;
            //#endregion Random number between 20 and 100
            //#region Last 5 days tweets
            const since = moment.tz("America/Guayaquil").subtract(5, "days");
            const until = moment.tz("America/Guayaquil");
            //#endregion Last 5 days tweets
            const response = await searchTweets(credentials, {
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
                    "favorited",
                    "favorite_count",
                    "retweeted",
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
                results.tweets.push(parsed);
            }
            // push object into
            results[hashtag] = temp;
        }
        generateJSONFile("db.json", JSON.stringify(results, null, 2));
        // using retweet count you can know about post
        console.log(JSON.stringify(results));
    } catch (e) {
        console.log("Error", e);
    }
})();
