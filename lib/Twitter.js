const Twit = require("twit");
const { credentials } = require("../constants");

const searchTweets = (raw) => {
    return new Promise((resolve) => {
        const T = new Twit({
            consumer_key: credentials.CONSUMER_KEY,
            consumer_secret: credentials.CONSUMER_SECRET,
            access_token: credentials.ACCESS_TOKEN,
            access_token_secret: credentials.ACCESS_TOKEN_SECRET,
        });

        return T.get("search/tweets", raw, (err, data) => {
            if (err) {
                return resolve(err);
            }
            return resolve(data);
        });
    });
};

module.exports = {
    searchTweets,
};
