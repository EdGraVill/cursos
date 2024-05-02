import type { KV } from '@/types';
import cn from 'classnames';
import type { FC, MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  initialSelected?: string | null;
  labels: KV[];
  onSelected(label: string | null): void;
}

const Buttons: FC<Props> = ({ initialSelected = null, labels, onSelected }) => {
  const [selected, setSelected] = useState<string | null>(initialSelected);

  useEffect(() => {
    onSelected(selected);
  }, [selected]);

  const onClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const label = event.currentTarget.getAttribute('data-label');

    setSelected((prev) => (prev === label ? null : label));
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2">
      {labels.map(({ key, value }) => (
        <button
          className={cn('rounded-lg border-2 border-black px-6 py-2 text-base', {
            'bg-black text-white': selected === key,
          })}
          data-label={key}
          key={key}
          onClick={onClick}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
