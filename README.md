# grafana-dashboard-converter

Converts a [Cloud Monitoring dashboard](https://github.com/GoogleCloudPlatform/monitoring-dashboard-samples/tree/master/dashboards) to a Grafana dashboard

## How to use

The program will scan the input folder in the root of the app for Cloud Monitoring dashboards. It will scan the input folder recusively to look for dashboards, and the idea of that is that you should be able to drop the file structure from the [cloud monitoring dashboards sample github page](https://github.com/GoogleCloudPlatform/monitoring-dashboard-samples/tree/master/dashboards) directly into the input folder. The program will then process each dashboard and put the resulting Grafana dashboard in the output folder. Whenever a readme.md file is found in input/\*\* the program will try to scrape the dashboard description from the readme file and tie it to a dashboard. In case it could find a match, that description will be put in a text panel at the top of the dashboard.

## Limitations

At the moment the following mappings are supported:
GCP Line widget --> Grafana graph panel
GCP stacked bar widget --> Grafana graph panel with bars
GCP Text widget --½ Grafana Text panel

All other widgets will be ignored

Also, Cloud Monitoring layouting props will be completely ignored. Panels will be put into the Grafana dashboard in the same order that they were in the Cloud Monitoring dashboar. This might be problematic when mosaic layout is being used in the Cloud Monitoring dashboard.
