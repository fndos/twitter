const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const { normalizeText } = require("normalize-text");

(async () => {
    // Your code goes here
    try {
        // Crea un ranking del top 3 de idiomas más utilizados
        const db = await low(adapter);
        if (db.get("#All").value()) {
            const findTweets = db.get("#All").value();
            const LangArray = [];
            const LangObject = {};
            for (const tweet of findTweets) {
                const lang = _.get(tweet, "lang");
                if (lang) {
                    LangObject[lang] = (LangObject[lang] || 0) + 1;
                }
            }
            for (const [key, value] of Object.entries(LangObject)) {
                LangArray.push({ text: key, count: value });
            }
            const LangArraySortByCount = _.orderBy(LangArray, ["count"], ["desc"]);
            const LangTop = _.take(LangArraySortByCount, 3);
            console.log("Top for most used languages");
            let index = 0;
            for (const lang of LangTop) {
                index += 1;
                console.log(`[${index}] ${normalizeText(lang.text)}: ${lang.count}`);
            }
            return "Done!";
        }
        throw new Error("There is no dataset generated. Please run generateDataset.js first.");
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();
