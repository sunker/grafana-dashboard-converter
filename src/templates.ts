import * as types from './gcp2grafana/types';
import fs from 'fs';

const jsonTemplate = fs.readFileSync('./templates/dashboard.json', 'utf-8');
export const defaultDashboard: types.GrafanaDashboard = JSON.parse(
  jsonTemplate
);

const panelTemplate = fs.readFileSync('./templates/graph-panel.json', 'utf-8');
export const defaultPanel: types.GrafanaDashboard = JSON.parse(panelTemplate);

const stackedGraphPanelTemplate = fs.readFileSync(
  './templates/stacked-graph-panel.json',
  'utf-8'
);
export const defaultStackedGraphPanel: types.GrafanaDashboard = JSON.parse(
  stackedGraphPanelTemplate
);

const textTemplate = fs.readFileSync('./templates/text.json', 'utf-8');
export const defaultText: types.GrafanaDashboard = JSON.parse(textTemplate);
