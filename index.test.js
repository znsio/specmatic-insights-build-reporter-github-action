const { exec } = require('child_process');
const { constructCLIArguments } = require('./index');

jest.mock('@actions/core', () => ({
    setFailed: jest.fn()
}));

const defaultReportDir = './build/reports/specmatic';
const defaultSpecmaticHost = 'https://insights.specmatic.in';

describe('constructCLIArguments', () => {
    it('should generate correct args string with default values', () => {
        process.env = {
            INPUT_SAMPLE_KEY: 'sampleValue'
        };

        const argsString = constructCLIArguments();

        expect(argsString).toContain('--sample-key=sampleValue');
        expect(argsString).toContain('--specmatic-reports-dir=' + defaultReportDir);
        expect(argsString).toContain('--specmatic-insights-host=' + defaultSpecmaticHost);
    });

    it('should override default values if specified in env', () => {
        const reportDir = './custom/dir';
        const specmaticHost = 'https://custom.host';

        process.env = {
            INPUT_SPECMATIC_REPORTS_DIR: reportDir,
            INPUT_SPECMATIC_INSIGHTS_HOST: specmaticHost
        };

        const argsString = constructCLIArguments();

        expect(argsString).toContain('--specmatic-reports-dir=' + reportDir);
        expect(argsString).toContain('--specmatic-insights-host=' + specmaticHost);
    });

    it('should skip empty and undefined environment variables', () => {
        process.env = {
            INPUT_SPECMATIC_REPORTS_DIR: '',
            INPUT_SPECMATIC_INSIGHTS_HOST: ''
        };

        const argsString = constructCLIArguments();

        expect(argsString).toContain('--specmatic-reports-dir=' + defaultReportDir);
        expect(argsString).toContain('--specmatic-insights-host=' + defaultSpecmaticHost);
    });

});