import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ceil } from '@taiga-ui/cdk';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    content: 'Dashboard'| 'Customers' | 'Workers' | 'Analytics' | 'Products' | 'Reports' = "Dashboard";
    readonly value = [40, 30, 20, 10];
    readonly values = [
      [3660, 8281, 1069, 9034, 5797, 6918, 8495, 3234, 6204, 1392, 2088, 8637, 8779],
      [3952, 3671, 3781, 5323, 3537, 4107, 2962, 3320, 8632, 4755, 9130, 1195, 3574],
  ];

  readonly value1:any = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
];
  readonly value2:any = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

readonly stringify = TUI_DEFAULT_STRINGIFY;


  getHeight(max: number): number {
      return (max / ceil(max, -3)) * 100;
  }
}