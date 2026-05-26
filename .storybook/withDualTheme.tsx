import type { Decorator } from '@storybook/react';
import './withDualTheme.css';

export const withDualTheme: Decorator = (Story, context) => (
  <div className="dual-theme">
    <div className="dual-theme__pane" data-theme="">
      <span className="dual-theme__label">Light</span>
      <Story {...context} />
    </div>
    <div className="dual-theme__pane" data-theme="dark">
      <span className="dual-theme__label">Dark</span>
      <Story {...context} />
    </div>
  </div>
);
