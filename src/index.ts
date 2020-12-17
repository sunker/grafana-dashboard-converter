import * as types from './gcp2grafana/types';
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path, { parse } from 'path';
import DashboardConverter from './gcp2grafana/DashboardConverter';
import { parseReadme } from './parseReadme';

const pluginJsonItems = [];

const isDirectory = (source) => lstatSync(source).isDirectory();

const handleJsonFile = (rootDir, path, dashboardDescription) => {
  const fileName = path ? rootDir + '/' + path : rootDir;
  try {
    const cloudMonitoringJsonDashboard = readFileSync(fileName, 'utf-8');

    const cloudMonitoringDashboard: types.CloudMonitoringDashboard = JSON.parse(
      cloudMonitoringJsonDashboard
    );

    const dashboardConverter = new DashboardConverter(
      cloudMonitoringDashboard,
      dashboardDescription
    );
    const grafanaDashboard = dashboardConverter.convert();

    writeFileSync(`./output/${path}`, JSON.stringify(grafanaDashboard));

    pluginJsonItems.push({
      type: 'dashboard',
      name: grafanaDashboard.title,
      path: 'dashboards/output/' + path,
    });
  } catch (error) {
    console.log(`Failed to convert ${path}. error:`, error);
  }
};

const handleDirectory = (rootDir, path = '') => {
  const dir = path ? rootDir + '/' + path : rootDir;
  const files = readdirSync(dir);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  let fileNameWithDescription = {};

  const readmeFile = files.find((f) => f === 'README.md');
  if (readmeFile) {
    fileNameWithDescription = parseReadme(dir + '/' + readmeFile, jsonFiles);
  }

  for (const file of jsonFiles) {
    handleJsonFile(dir, file, fileNameWithDescription[file] || '');
  }

  for (const file of files.filter((f) => isDirectory(dir + '/' + f))) {
    handleDirectory(dir, file);
  }
};

handleDirectory('./input');

writeFileSync(`./output/plugin.json`, JSON.stringify(pluginJsonItems));

console.log('Convertion done');
