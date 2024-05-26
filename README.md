# Specmatic Insights Github Action
This Github Action is used to publish the build stats to the Specmatic Insights server.

While invoking this Github Action, the following arguments must be passes:

- `specmatic-insights-host`(Required) URL of the Specmatic Insights server. Ex: https://insights.specmatic.in
- `specmatic-central-repo-report`(Optional) Path to the central contract repo report. Ex: ./build/reports/specmatic/central_contract_repo_report.json
- `specmatic-coverage`(Optional) Path to the coverage report. Ex: ./build/reports/specmatic/coverage_report.json
- `specmatic-stub-usage`(Optional) Path to the stub usage report. Ex: ./build/reports/specmatic/stub_usage_report.json
