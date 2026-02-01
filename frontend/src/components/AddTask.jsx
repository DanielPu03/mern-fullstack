import React, { useState } from 'react'
import { Card } from './ui/card.jsx'
import { Input } from './ui/input.jsx'
import { Button } from './ui/button.jsx'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = async () => {
    if (newTaskTitle.trim()) 
    {
      try {
        await axios.post('http://localhost:5001/api/tasks', { title: newTaskTitle});
        toast.success(`Nhiệm vụ "${newTaskTitle}" đã được thêm thành công!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error('Lỗi khi thêm nhiệm vụ:', error);
        toast.error('Có lỗi xảy ra khi thêm nhiệm vụ mới.');
      }
      setNewTaskTitle('');
    }else {
      toast.error('Vui lòng nhập tên nhiệm vụ.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };


  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg"> 
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
        type="text" 
        placeholder="Nhập tên nhiệm vụ mới..." 
        className="h-12 text-base bg-slate-50  sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20 "
        value={newTaskTitle}
        onChange={(even) => setNewTaskTitle(even.target.value)}
        onKeyPress ={handleKeyPress}
        />
    
      <Button
        variant="gradient"
        size='xl'
        className="p-6"
        onClick={addTask}
      >
        <Plus className='size-5'/>
        Thêm Nhiệm Vụ
      </Button>
      </div>


    </Card>
  )
}

export default AddTask
