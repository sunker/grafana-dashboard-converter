import fs from 'fs';
import * as t from './types';
import {
  defaultPanel,
  defaultStackedGraphPanel,
  defaultText,
} from '../templates';
import { alphabet } from './constants';
import { queryMapper } from './query_mapper';
import toUpper from 'lodash.toupper';

const mapType = (widget: t.Widget) => {
  if (widget?.xyChart?.dataSets?.length) {
    return t.PanelTypes.Graph;
  } else if (widget.text?.content) {
    return t.PanelTypes.Text;
  }

  throw Error('Unsupported panel type');
};

export function widget2PanelMapper(widget: t.Widget) {
  const panelType = mapType(widget);

  switch (panelType) {
    case t.PanelTypes.Graph:
      const plotType: t.PlotType = widget.xyChart.dataSets[0]?.plotType;
      const panel =
        plotType === t.PlotType.LINE ? defaultPanel : defaultStackedGraphPanel;
      return {
        ...panel,
        title: widget.title,
        gridPos: undefined,
        targets: widget.xyChart.dataSets.map((ds, i) =>
          queryMapper(ds, toUpper(alphabet[i]))
        ),
      };
    case t.PanelTypes.Text:
      return {
        ...defaultText,
        title: widget.title,
        gridPos: undefined,
        options: {
          mode: 'markdown',
          content: widget.text.content,
        },
      };
    default:
      break;
  }
}
