type FilterBarProps = {
  items: string[];
  active?: string;
};

export function FilterBar({ items, active = "전체" }: FilterBarProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {items.map((item) => {
        const selected = item === active;
        return (
          <button
            key={item}
            type="button"
            className={
              selected
                ? "t-label min-h-11 whitespace-nowrap rounded-pill border border-primary bg-primary-soft px-4 text-primary"
                : "t-label min-h-11 whitespace-nowrap rounded-pill border border-transparent bg-surface-2 px-4 text-ink-muted"
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
