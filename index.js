const core = require('@actions/core');
const { exec } = require('child_process');

async function run() {
    console.log('Running Specmatic Insights Build Reporter for Github Action');
    try {
        const argsMap = Object.keys(process.env)
            .filter(key => key.startsWith('INPUT_'))
            .reduce((acc, key) => {
                const inputName = key.slice('INPUT_'.length).toLowerCase();
                acc[inputName] = process.env[key];
                return acc;
            }, {
                'specmatic-reports-dir': './build/reports/specmatic',
                'specmatic-insights-host': 'https://insights.specmatic.in'
            });

        const argsString = Object.entries(argsMap)
            .reduce((acc, [key, value]) => `${acc} --${key}=${value}`, '');

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
