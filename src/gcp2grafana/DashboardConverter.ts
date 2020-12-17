import { CloudMonitoringDashboard, GrafanaDashboard } from './types';
import { defaultDashboard, defaultText } from '../templates';
import { widget2PanelMapper } from './panel_mapper';

export default class DashboardConverter {
  gridPos = {
    h: 8,
    w: 12,
    x: 0,
    y: -8,
  };

  constructor(
    private dashboard: CloudMonitoringDashboard,
    private description: string
  ) {}

  convert(): GrafanaDashboard {
    const widgets = this.dashboard.gridLayout
      ? this.dashboard.gridLayout.widgets
      : this.dashboard.mosaicLayout.tiles.map((t) => t.widget);

    let panels = [];

    if (this.description) {
      panels = [
        {
          ...defaultText,
          title: this.dashboard.displayName,
          options: {
            mode: 'markdown',
            content: this.description,
          },
          gridPos: {
            h: 3,
            w: 24,
            x: 0,
            y: 0,
          },
        },
      ];

      this.gridPos = {
        ...this.gridPos,
        x: 3,
        y: -8,
      };
    }

    panels = [
      ...panels,
      ...widgets.map((w, i) => {
        this.gridPos.y = i % 2 == 0 ? this.gridPos.y + 8 : this.gridPos.y;

        return {
          ...widget2PanelMapper(w),
          id: i + 1,
          gridPos: {
            ...this.gridPos,
            x: i % 2 == 0 ? 0 : 12,
          },
        };
      }),
    ];

    return {
      ...defaultDashboard,
      title: this.dashboard.displayName,
      panels,
    };
  }
}
