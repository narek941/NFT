import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker } from '@shared/DatePicker';
import { useForm } from 'react-hook-form';

export interface IForm {
  startDate: Date;
  endDate: Date;
}

export default {
  title: 'Shared/DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const [endDateWatcher, startDateWatcher] = watch(['endDate', 'startDate']);
  const style = { width: '250px' };
  return (
    <div style={style}>
      <DatePicker
        placeholderText='Start Date - End Date'
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        startDate={startDateWatcher}
        endDate={endDateWatcher}
        dropdownMode='select'
        onChange={(data) => console.log(data)}
      />
    </div>
  );
};

export const DefaultDatePicker = Template.bind({});
DefaultDatePicker.args = {};
