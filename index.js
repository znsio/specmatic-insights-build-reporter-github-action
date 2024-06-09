const core = require('@actions/core');
const { exec } = require('child_process');
const fetch = require('node-fetch');

async function getWorkflowId() {
    console.log('Running Specmatic Insights Build Reporter for Github Action');
    try {
        const githubToken = process.env['INPUT_GITHUB-TOKEN'];
        if (!githubToken) {
            core.setFailed('Github token is required');
            return;
        }

        const apiUrl = `https://api.github.com/repos/${process.env['GITHUB_REPOSITORY']}/actions/workflows`;
        const workflowName = process.env['GITHUB_WORKFLOW'];

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });

        if (!response.ok) {
            core.setFailed(`Failed to fetch workflows: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        const workflow = data.workflows.find(w => w.name === workflowName);

        if (!workflow) {
            core.setFailed(`Workflow ${workflowName} not found`);
            return;
        }

        const workflowId = workflow.id;
        console.log(`Workflow ID: ${workflowId}`);

        return workflowId;
    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

async function run() {
    console.log('Running Specmatic Insights Build Reporter for Github Action');
    try {
        const processEnv = Object.keys(process.env);
        const workflowId = await getWorkflowId();
        const argsString = processEnv
             .filter(key => key !== 'INPUT_GITHUB-TOKEN')
             .filter(key => key.startsWith('INPUT_'))
             .reduce((acc, key) => {
                 const inputName = key.slice('INPUT_'.length).toLowerCase();
                 const value = process.env[key];
                 return (value) ? `${acc} --${inputName}=${value}` : acc;
             }, '') + ` --build-definition-id=${workflowId}`;

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
