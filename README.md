# Specmatic Insights Github Action
This Github Action is used to publish the build stats to the Specmatic Insights server.

While invoking this Github Action, the following arguments must be passes:

- `specmatic-insights-host`(Optional) URL of the Specmatic Insights server. By default this will point to https://insights.specmatic.in However if you've an on-prem Specmatic Insights server, then you can set the host accordingly.
- `specmatic-reports-dir`(Optional) Path to the Specmatic reports directory. If not specified, will default to ./build/reports/specmatic

In your Github workflow file, please add the following step after running specmatic command:

```yaml
- name: Run Specmatic Insights Github Build Reporter
  uses: znsio/specmatic-insights-build-reporter-github-action@v1.1.3
  env:
    SPECMATIC_ORG_ID: ${{ secrets.SPECMATIC_ORG_ID }}
    GITHUB_TOKEN: ${{ secrets.SPECMATIC_INSIGHTS_ACCESS_TOKEN }}
    GITHUB_REF: ${{ github.ref }}
    GITHUB_REF_NAME: ${{ github.ref_name }}
    GITHUB_REPOSITORY: ${{ github.repository }}
    GITHUB_RUN_ID: ${{ github.run_id }}
    GITHUB_REPOSITORY_OWNER: ${{ github.repository_owner }}
    GITHUB_REPOSITORY_ID: ${{ github.repository_id }}
    GITHUB_SERVER_URL: ${{ github.server_url }}
```

If you need to specify the addition arguments, then this is a sample:

```yaml
- name: Run Specmatic Insights Github Build Reporter
  uses: znsio/specmatic-insights-build-reporter-github-action@v1.1.3
  with:
    specmatic-insights-host: https://custom-insights-service.com
    specmatic-reports-dir: ./custom/reports/dir/path
  env:
    SPECMATIC_ORG_ID: ${{ secrets.SPECMATIC_ORG_ID }}
    GITHUB_TOKEN: ${{ secrets.SPECMATIC_INSIGHTS_ACCESS_TOKEN }}
    GITHUB_REF: ${{ github.ref }}
    GITHUB_REF_NAME: ${{ github.ref_name }}
    GITHUB_REPOSITORY: ${{ github.repository }}
    GITHUB_RUN_ID: ${{ github.run_id }}
    GITHUB_REPOSITORY_OWNER: ${{ github.repository_owner }}
    GITHUB_REPOSITORY_ID: ${{ github.repository_id }}
    GITHUB_SERVER_URL: ${{ github.server_url }}
```
