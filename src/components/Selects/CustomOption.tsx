import { components } from 'react-select';

const CustomOption = ({ ...props }: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-4">
        <div
          className="h-3.5 w-3.5 rounded-full"
          style={{ backgroundColor: props.data.color }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

export default CustomOption;
