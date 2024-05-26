const { exec } = require('child_process');
const { constructCLIArguments } = require('./index');

jest.mock('@actions/core', () => ({
    setFailed: jest.fn()
}));

describe('constructCLIArguments', () => {
    beforeEach(() => {
        process.env = {}
    });

    it('should generate correct args string with default values', () => {
        process.env = {
            INPUT_SAMPLE_KEY: 'sampleValue'
        };

        const argsString = constructCLIArguments();

        console.log("Result : " + argsString)

        expect(argsString).toContain('--sample-key=sampleValue');
        expect(argsString).toContain('--specmatic-reports-dir=./build/reports/specmatic');
        expect(argsString).toContain('--specmatic-insights-host=https://insights.specmatic.in');
    });

    it('should override default values if specified in env', () => {
        process.env = {
            INPUT_SPECMATIC_REPORTS_DIR: './custom/dir',
            INPUT_SPECMATIC_INSIGHTS_HOST: 'https://custom.host'
        };

        const argsString = constructCLIArguments();

        expect(argsString).toContain('--specmatic-reports-dir=./custom/dir');
        expect(argsString).toContain('--specmatic-insights-host=https://custom.host');
    });

    it('should skip empty and undefined environment variables', () => {
        process.env = {
            INPUT_SPECMATIC_REPORTS_DIR: '',
            INPUT_SPECMATIC_INSIGHTS_HOST: ''
        };

        const argsString = constructCLIArguments();

        expect(argsString).toContain('--specmatic-reports-dir=./build/reports/specmatic');
        expect(argsString).toContain('--specmatic-insights-host=https://insights.specmatic.in');
    });

});