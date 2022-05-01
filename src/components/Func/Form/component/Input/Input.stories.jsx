import React from 'react';
import Input from './Input';

export default {
  title: 'myComp/Input',
  component: Input,
  argTypes: {
    handleChange: { action: 'change' },
    onKye: { action: 'onKey' },
  },
};

const Template = (args) => <Input {...args} />;

export const Firsst = Template.bind({});
Firsst.args = {
  value: '',
};
