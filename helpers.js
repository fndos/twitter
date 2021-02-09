const fs = require("fs");

module.exports.generateJSONFile = (filename, data) => {
    fs.appendFile(filename, data, (err) => {
        if (err) {
            console.log("Error writing to csv file", err);
        } else {
            // Do nothing
        }
    });
};
