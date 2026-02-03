import React from 'react'
import { Check, CircleX, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type FilterType = 'all' | 'pending' | 'completed';


type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const Filter = ({currentFilter, setCurrentFilter}: FilterProps) => {
  return (
    <div className='flex gap-2'>
      <Badge
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        className="cursor-pointer py-1 transition-all duration-400"
        onClick={() => setCurrentFilter('all')}
      >
        <List />
        Todas
      </Badge>

      <Badge
        variant={currentFilter === 'pending' ? 'default' : 'outline'}
        className="cursor-pointer py-1 transition-all duration-400"
        onClick={() => setCurrentFilter('pending')}
      >
        <CircleX />
        Não finalizadas
      </Badge>

      <Badge
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        className="cursor-pointer py-1 transition-all duration-400"
        onClick={() => setCurrentFilter('completed')}
      >
        <Check />
        Concluídas
      </Badge>
    </div>
  );
}
