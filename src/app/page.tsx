import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, List, Check, CircleX, SquarePen, Trash, ListChecks, Sigma } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Home() {
  return (
    <main className='h-screen w-full bg-gray-100 flex justify-center items-center'>
      <Card className='w-xl p-4'>
        <div className='flex items-center justify-between gap-2'>
          <Input placeholder='Adicionar tarefa' className=''></Input>
          <Button className='cursor-pointer'>
            <Plus />
            Adicionar
          </Button>
        </div>
        <Separator />

        <div className='flex gap-2'>
          <Badge variant='default' className='cursor-pointer py-1'>
            <List />
            Todas
          </Badge>
          <Badge variant='outline' className='cursor-pointer py-1'>
            <CircleX />
            Não finalizadas
          </Badge>
          <Badge variant='outline' className='cursor-pointer py-1'>
            <Check />
            Concluídas
          </Badge>
        </div>

        <div className='border-b'>
          <div className='h-14 flex justify-between items-center border-b border-t'>
            <div className='w-1 h-full bg-green-300'></div>
            <p className='flex-1 px-2'>Estudar React</p>

            <div className='flex items-center gap-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <SquarePen size={18} className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar a tarefa</DialogTitle>
                  </DialogHeader>
                  <div className='flex gap-2'>
                    <Input placeholder='Novo nome da tarefa'></Input>
                    <Button>Editar</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Trash size={18} className='cursor-pointer' />
            </div>
          </div>
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <ListChecks size={18} />
              <p className='text-sm'>Tarefas concluídas (3/3)</p>
            </div>

            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className='text-sm h-7 cursor-pointer'>
                    <Trash />
                    Limpar tarefas concluídas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div>
          <div className='h-2 w-full bg-gray-100 rounded-md'>
            <div className='h-full w-[50%] bg-blue-500 rounded-md'></div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <Sigma size={18} />
          <p className='text-xs'>3 Tarefas no total</p>
        </div>
      </Card>
    </main>
  );
}

