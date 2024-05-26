# Specmatic Insights Github Action
This Github Action is used to publish the build stats to the Specmatic Insights server.

While invoking this Github Action, the following arguments must be passes:

- `specmatic-insights-host`(Optional) URL of the Specmatic Insights server. By default this will point to https://insights.specmatic.in However if you've an on-prem Specmatic Insights server, then you can set the host accordingly.
- `specmatic-reports-dir`(Optional) Path to the Specmatic reports directory. If not specified, will default to ./build/reports/specmatic
