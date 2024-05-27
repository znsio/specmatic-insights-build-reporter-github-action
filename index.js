const core = require('@actions/core');
const { exec } = require('child_process');

async function run() {
    console.log('Running Specmatic Insights Build Reporter for Github Action');
    try {
        const argsString = Object.keys(process.env)
             .filter(key => key.startsWith('INPUT_'))
             .reduce((acc, key) => {
                 const inputName = key.slice('INPUT_'.length).toLowerCase();
                 const value = process.env[key];
                 return (value) ? `${acc} --${inputName}=${value}` : acc;
             }, '');

        const command = `npx specmatic-insights-github-build-reporter ${argsString}`;

        console.log("Executing: " + command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                core.setFailed(`Action failed with error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
