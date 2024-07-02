const helper = require('./helper');
//const chalk = require('chalk');

import('chalk').then(chalkModule => {

    const chalk = chalkModule.default;

    console.log(chalk.blue("In the sample application"));

    helper.writeToFile("sample.txt", "This is a sample for testing modules");
    const content = helper.readFromFile("sample.txt");

    console.log("File content: ", content);
    console.log("Current date: ", helper.getFormattedDate("YYYY-MM-DD"));
    console.log("Current date: ", helper.getFormattedDate("MMM Do YY"));
    console.log("Date after 5 days: ", helper.addDays(5, "YYYY-MM-DD"));

})


