import MaintenanceMode from '@components/MaintenanceMode';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/MaintenanceMode',
  component: MaintenanceMode,
} as ComponentMeta<typeof MaintenanceMode>;

const Template: ComponentStory<typeof MaintenanceMode> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <MaintenanceMode />
    </div>
  );
};

export const DefaultMaintenanceMode = Template.bind({});
DefaultMaintenanceMode.args = {};
