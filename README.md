# Specmatic Insights Github Action
This Github Action is used to publish the build stats to the Specmatic Insights server.

While invoking this Github Action, the following arguments must be passes:

- `specmatic-insights-host`(Optional) URL of the Specmatic Insights server. By default this will point to https://insights.specmatic.in However if you've an on-prem Specmatic Insights server, then you can set the host accordingly.
- `specmatic-reports-dir`(Optional) Path to the Specmatic reports directory. If not specified, will default to ./build/reports/specmatic
- `org-id`(Required) Specmatic Organization ID
- `branch-ref`(Required) The fully-formed branch ref name that triggered the build. In Github this maps to github.ref environment variable.
- `branch-name`(Required) The short branch name that triggered the build. In Github this maps to github.ref_name environment variable.
- `build-definition-id`(Required) Every build pipeline or workflow has an unique id which remains the same across all the CI build/workflow runs. In Github this maps to WORKFLOW_ID which is not avilable as the default environment variable.
- `build-id`(Required) The build ID that triggered the build. In Github this maps to github.run_id environment variable.
- `repo-name`(Required) Name of the GIT repository. The repo should not include the repo owner name. In Github this maps to github.event.repository.name environment variable.
- `repo-id`(Required) Unique ID of the GIT repository. In Github this maps to github.repository_id environment variable.
- `repo-url`(Required) Fully qualified HTTP GIT repository URL. In Github this maps to github.event.repository.html_url environment variable.

In your Github workflow file, please add the following step after running specmatic command:

```yaml
- name: Run Specmatic Insights Github Build Reporter
  uses: znsio/specmatic-insights-build-reporter-github-action@v1.1.4
  with:
    branch-ref: refs/heads/main
    branch-name: main
    build-definition-id: 4665857
    build-id: 9245136138
    repo-name: specmatic-order-bff-java
    repo-id: 636154288
    repo-url: https://github.com/znsio/specmatic-order-bff-java
```

If you need to specify the addition arguments, then this is a sample:

```yaml
- name: Run Specmatic Insights Github Build Reporter
  uses: znsio/specmatic-insights-build-reporter-github-action@v1.1.3
  with:
    specmatic-insights-host: https://custom-insights-service.com
    specmatic-reports-dir: ./custom/reports/dir/path
    branch-ref: refs/heads/main
    branch-name: main
    build-definition-id: 4665857
    build-id: 9245136138
    repo-name: specmatic-order-bff-java
    repo-id: 636154288
    repo-url: https://github.com/znsio/specmatic-order-bff-java
```
