'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { Plus, List, Check, CircleX, Trash, ListChecks, Sigma, LoaderCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import EditTask from '@/components/EditTask';
import { getTasks } from '@/actions/get-tasks-from-bd';
import { useEffect, useState } from 'react';
import { Tasks } from '@prisma/client';
import { NewTask } from '@/actions/add-task';
import { deleteTask } from '@/actions/delete-task';
import { toast } from 'sonner';
import { updatedTaskStatus } from '@/actions/toggle-done';
import { Filter } from '@/components/Filter';
import { FilterType } from '@/components/Filter';
import { deleteCompletedTasks } from '@/actions/clear-completed-tasks';

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  console.log(task);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error('Insira uma tarefa');
        setLoading(false);
        return;
      }

      const addNewTask = await NewTask(task);
      if (!addNewTask) return;
      setTask('');
      toast.success('Tarefa adicionada com sucesso!');
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await deleteTask(id);

      if (!deletedTask) return;
      console.log(deletedTask);
      toast.warning('Tarefa deletada com sucesso');
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const previousTask = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updatedTaskList;
      });

      await updatedTaskStatus(taskId);
    } catch (error) {
      throw error;
    }
  };

  const clearCompletedTasks = async () => {
    const deletedTasks = await deleteCompletedTasks();
    if(!deletedTasks) return
    setTaskList(deletedTasks);
  } 

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case 'all':
        setFilteredTasks(taskList);
        break;
      case 'pending':
        const pendingTasks = taskList.filter((task) => !task.done);
        setFilteredTasks(pendingTasks);
        break;
      case 'completed':
        const completedTasks = taskList.filter((task) => task.done);
        setFilteredTasks(completedTasks);
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className='h-screen w-full bg-gray-100 flex justify-center items-center'>
      <Card className='w-xl p-4'>
        <div className='flex items-center justify-between gap-2'>
          <Input
            placeholder='Adicionar tarefa'
            className=''
            onChange={(e) => setTask(e.target.value)}
            value={task}></Input>
          <Button
            className='cursor-pointer active:translate-y-1 transition-all'
            onClick={handleAddTask}>
            {loading ? <LoaderCircle className='animate-spin' /> : <Plus />}
            Adicionar
          </Button>
        </div>
        <Separator />

        <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

        <div className='border-b'>
          {taskList.length === 0 && (
            <p className='text-xs border-t py-4'>Você não possui tarefas cadastradas</p>
          )}
          {filteredTasks.map((task) => (
            <div className='h-14 flex justify-between items-center border-t' key={task.id}>
              <div
                className={`${task.done ? 'w-1 h-full bg-green-300' : 'w-1 h-full bg-red-400'}`}></div>
              <p
                className='flex-1 flex items-center h-full px-2 cursor-pointer hover:text-gray-600 active:translate-y-0.5 transition-all'
                onClick={() => handleToggleTask(task.id)}>
                {task.task}
              </p>

              <div className='flex items-center gap-2'>
                <EditTask task={task} handleGetTasks={handleGetTasks} />
                <Trash
                  size={18}
                  className='cursor-pointer active:translate-y-0.5 transition-all'
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <ListChecks size={18} />
              <p className='text-sm'>
                Tarefas concluídas{' '}
                {`${taskList.filter((task) => task.done).length}/${taskList.length}`}
              </p>
            </div>

            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className='text-sm h-7 cursor-pointer active:translate-y-1 transition-all'>
                    <Trash />
                    Limpar tarefas concluídas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir {taskList.filter((task) => task.done).length} itens?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className='cursor-pointer active:translate-y-0.5' onClick={clearCompletedTasks}>
                      Continuar
                    </AlertDialogAction>
                    <AlertDialogCancel className='cursor-pointer active:translate-y-0.5'>
                      Cancelar
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div>
          <div className='h-2 w-full bg-gray-100 rounded-md'>
            <div
              className='h-full bg-blue-500 rounded-md'
              style={{
                width: `${(taskList.filter((task) => task.done).length / taskList.length) * 100}%`,
              }}></div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <Sigma size={18} />
          <p className='text-xs'>{taskList.length} Tarefas no total</p>
        </div>
      </Card>
    </main>
  );
}
