const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");

(async () => {
    // Your code goes here
    try {
        // Visualizar el porcentaje de usuarios verificados totales versus los no verificados
        const db = await low(adapter);
        if (db.get("#All").value()) {
            const findTweets = db.get("#All").value();
            const UserArray = [];
            const UserObject = {};
            for (const tweet of findTweets) {
                const userName = _.get(tweet, "user.name");
                const verified = _.get(tweet, "user.verified");
                if (userName) {
                    UserObject[userName] = verified || false;
                }
            }
            for (const [key, value] of Object.entries(UserObject)) {
                UserArray.push({ name: key, verified: value });
            }
            // Filter percent
            const verifiedUsers = UserArray.filter(({ verified }) => verified);
            const nonVerifiedUsers = UserArray.filter(({ verified }) => !verified);
            // Percent by group
            const verifiedPercentage = (verifiedUsers.length * 100) / UserArray.length;
            const nonVerifiedPercentage = (nonVerifiedUsers.length * 100) / UserArray.length;
            // Display results
            console.log("Percentage of total verified users vs. non-verified users");
            console.log(`Verified users: ${verifiedPercentage.toFixed(2)}%`);
            console.log(`Non-verified users: ${nonVerifiedPercentage.toFixed(2)}%`);
            return "Done!";
        }
        throw new Error("There is no dataset generated. Please run generateDataset.js first.");
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();
