import fs from 'fs';
import * as t from './types';
import { alignmentPeriodVariable, projectNameVariable } from './constants';

const metricDescriptors: t.MetricDescriptor[] = JSON.parse(
  fs.readFileSync('./gcp_metric_descriptors.json', 'utf-8')
);

export const queryMapper = ({ timeSeriesQuery }: t.DataSet, refId: string) => {
  //MQL query
  if (timeSeriesQuery?.timeSeriesQueryLanguage) {
    return {
      queryType: 'metrics',
      refId,
      mqlQuery: {
        projectName: projectNameVariable,
        query: timeSeriesQuery.timeSeriesQueryLanguage,
        expression: timeSeriesQuery.timeSeriesQueryLanguage, // why both query and expression? correct field name is not set atm
        aliasBy: '',
      },
    };
  }

  const {
    filter,
    aggregation: { perSeriesAligner, crossSeriesReducer, groupByFields = [] },
  } = timeSeriesQuery.timeSeriesFilter;

  const [
    fullMetricTypeKeyValueString,
    ,
    metricType,
  ] = /metric.type(.*?)"(.*?)"/.exec(filter);

  const { unit, valueType, metricKind } = metricDescriptors.find(
    (md) => md.type === metricType
  ) || { unit: '', valueType: '', metricKind: '' };

  return {
    queryType: 'metrics',
    refId,
    metricQuery: {
      aliasBy: timeSeriesQuery.legendTemplate || '', //TODO escape
      alignmentPeriod: alignmentPeriodVariable,
      crossSeriesReducer,
      perSeriesAligner,
      filters: filter
        .replace(fullMetricTypeKeyValueString, '')
        .split(' ')
        .reduce((acc, curr, i) => {
          if (curr) {
            const [
              ,
              labelKey,
              operator,
              labelValue,
            ] = /(.*?)([!|=].*)"(.*?)"/.exec(curr);

            if (acc.length >= 3) {
              acc = [...acc, 'AND'];
            }

            return [
              ...acc,
              labelKey.replace('"', '').replace(/\"/g, ''),
              operator,
              labelValue.replace(/\"/g, ''),
            ];
          }
          return acc;
        }, []),
      groupBys: groupByFields.map((gbf) => gbf.replace(/\"/g, '')),
      metricKind,
      metricType,
      projectName: projectNameVariable,
      unit,
      valueType,
    },
  };
};
