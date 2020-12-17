// export declare module CloudMonitoring {
export interface Require {
  type: string;
  id: string;
  name: string;
  version: string;
}

export interface AnnotationsList {
  builtIn: number;
  datasource: string;
  enable: boolean;
  hide: boolean;
  iconColor: string;
  name: string;
  type: string;
}

export interface Annotations {
  list: AnnotationsList[];
}

export interface Current {
  selected: boolean;
  text: string;
  value: string;
}

export interface TemplatingList {
  current: Current;
  error?: any;
  hide: number;
  includeAll: boolean;
  label?: any;
  multi: boolean;
  name: string;
  options: any[];
  query: any;
  queryValue: string;
  refresh: number;
  regex: string;
  skipUrlSync: boolean;
  type: string;
  allValue?: any;
  datasource: string;
  definition: string;
  sort?: number;
  tagValuesQuery: string;
  tags: any[];
  tagsQuery: string;
  useTags?: boolean;
}

export interface Templating {
  list: TemplatingList[];
}

export interface Time {
  from: string;
  to: string;
}

export interface Timepicker {}

export interface GrafanaDashboard {
  __inputs: any[];
  __requires: Require[];
  annotations: Annotations;
  editable: boolean;
  gnetId?: any;
  graphTooltip: number;
  id?: any;
  links: any[];
  panels: any[];
  schemaVersion: number;
  style: string;
  tags: any[];
  templating: Templating;
  time: Time;
  timepicker: Timepicker;
  timezone: string;
  title: string;
  uid: string;
  version: number;
}

export enum PanelTypes {
  Graph = 'graph',
  Text = 'text',
}

export interface ChartOptions {
  mode: string;
}

export interface Aggregation {
  crossSeriesReducer: string;
  perSeriesAligner: string;
  groupByFields: string[];
}

export interface SecondaryAggregation {}

export interface TimeSeriesFilter {
  aggregation: Aggregation;
  filter: string;
  secondaryAggregation: SecondaryAggregation;
}

export interface TimeSeriesQuery {
  timeSeriesQueryLanguage: string;
  legendTemplate: string;
  timeSeriesFilter: TimeSeriesFilter;
  unitOverride: string;
}

export enum PlotType {
  LINE = 'LINE',
  STACKED_AREA = 'STACKED_AREA',
  STACKED_BAR = 'STACKED_BAR',
  HEATMAP = 'HEATMAP',
}

export interface DataSet {
  minAlignmentPeriod: string;
  plotType: PlotType;
  timeSeriesQuery: TimeSeriesQuery;
}

export interface YAxis {
  label: string;
  scale: string;
}

export interface XyChart {
  chartOptions: ChartOptions;
  dataSets: DataSet[];
  timeshiftDuration: string;
  yAxis: YAxis;
}

export interface Text {
  content: string;
  format: string;
}

export interface Widget {
  title: string;
  xyChart: XyChart;
  text: Text;
}

export interface GridLayout {
  columns: string;
  widgets: Widget[];
}

export interface Tile {
  height: number;
  widget: Widget;
  width: number;
  yPos: number;
  xPos?: number;
}

export interface MosaicLayout {
  columns: number;
  tiles: Tile[];
}

export interface CloudMonitoringDashboard {
  displayName: string;
  gridLayout: GridLayout;
  mosaicLayout: MosaicLayout;
}

export interface Label {
  key: string;
  description: string;
  valueType: string;
}

export interface Metadata {
  launchStage: string;
  samplePeriod: string;
  ingestDelay: string;
}

export interface MetricDescriptor {
  name: string;
  labels: Label[];
  metricKind: string;
  valueType: string;
  unit: string;
  description: string;
  displayName: string;
  type: string;
  metadata: Metadata;
  launchStage: string;
  monitoredResourceTypes: string[];
}

export interface Metric {
  metricDescriptors: MetricDescriptor[];
}
