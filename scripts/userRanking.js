const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const { normalizeText } = require("normalize-text");

(async () => {
    // Your code goes here
    try {
        // Crea un ranking del top 5 de usuarios con mayor número de followers
        const db = await low(adapter);
        if (db.get("#All").value()) {
            const findTweets = db.get("#All").value();
            const UserArray = [];
            const UserObject = {};
            for (const tweet of findTweets) {
                const username = _.get(tweet, "user.name");
                const followersCount = _.get(tweet, "user.followers_count");
                if (username) {
                    UserObject[username] = followersCount || 0;
                }
            }
            for (const [key, value] of Object.entries(UserObject)) {
                UserArray.push({ name: key, followers: value });
            }
            const UserArraySortByFollowers = _.orderBy(UserArray, ["followers"], ["desc"]);
            const UserTop = _.take(UserArraySortByFollowers, 3);
            console.log("Top for highest number of followers by user");
            let index = 0;
            for (const user of UserTop) {
                index += 1;
                console.log(`[${index}] ${normalizeText(user.name)}: ${user.followers}`);
            }
            return "Done!";
        }
        throw new Error("There is no dataset generated. Please run generateDataset.js first.");
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();
