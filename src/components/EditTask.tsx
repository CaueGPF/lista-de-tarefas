import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";
import { getTasks } from "@/actions/get-tasks-from-bd";

type TaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = async () => {
  try {
      if (editedTask !== task.task) {
        toast.success('Tarefa editada com sucesso!');
      } else { 
        toast.error('Nome de tarefa já existente');
        return
      }
  
      await editTask({
        idTask: task.id,
        newTask: editedTask,
      });
  
      handleGetTasks()
  
    } catch (error) {
      throw error
    }
  }; 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={18} className='cursor-pointer active:translate-y-0.5 transition-all' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar a tarefa</DialogTitle>
        </DialogHeader>
        <div className='flex gap-2'>
          <Input
            placeholder='Novo nome da tarefa'
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}></Input>
          <DialogClose asChild>
            <Button onClick={handleEditTask} className="cursor-pointer">Editar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask