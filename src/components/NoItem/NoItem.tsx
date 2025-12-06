interface NoItemProps {
  text: string;
  description?: string;
}

const NoItem = ({ text, description }: NoItemProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 text-center">
      <span className="font-title text-xl font-semibold text-neutral-60">
        {text}
      </span>

      {description && (
        <p className="text-lg font-light text-neutral-60">{description}</p>
      )}
    </div>
  );
};

export default NoItem;
