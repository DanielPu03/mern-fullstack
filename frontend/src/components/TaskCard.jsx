import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  //trạng thái chỉnh sửa tiêu đề nv
  const [isEditing, setEditing] = React.useState(false);

  //trạng thái tiêu đề nv khi chỉnh sửa
  const [updateTaskTitle, setUpdateTaskTitle] = React.useState(task.title || '');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateTask();
    }
  };
  //logic xóa nv
  const deleteTask = async ({ taskID }) => {
    try {
      await api.delete(`/tasks/${taskID}`);
      toast.success(`Nhiệm vụ "${task.title}" đã được xóa thành công!`);
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi khi xóa nhiệm vụ:', error);
      toast.error('Có lỗi xảy ra khi xóa nhiệm vụ.');
    }
  }

  const updateTask = async () => {
    if (!updateTaskTitle.trim()) {
      toast.error("Tiêu đề không được để trống");
      return;
    }

    try {
      setEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
        status: task.status,
        completedAt: task.completedAt
      });
      toast.success(`Nhiệm vụ "${updateTaskTitle}" đã được cập nhật thành công!`);
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi khi cập nhật nhiệm vụ:', error);
      toast.error('Có lỗi xảy ra khi cập nhật nhiệm vụ.');
    }
  }

  const toggleTaskCompletion = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        });
        toast.success(`Nhiệm vụ "${task.title}" đã được đánh dấu là hoàn thành!`);
      }
      else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completedAt: null,
        });
        toast.success(`Nhiệm vụ "${task.title}" đã được đổi trạng thái sang chưa hoàn thành!`);
      }
      handleTaskChanged();
    }
    catch (error) {
      console.error('Lỗi khi cập nhật trạng thái nhiệm vụ:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái nhiệm vụ.');
    }
  }


  return (
    <Card className={cn('p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
      task.status === 'completed' && 'opacity-75'
    )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4'>
        {/* Nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'

          )}

          onClick={toggleTaskCompletion}>
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5' />

          ) : <Circle className='size-5' />}
        </Button>

        {/* Hiển thị chỉnh sửa tiêu đề công việc */}
        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              placeholder='Chỉnh sửa công việc'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type='text'
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                setEditing(false);
                setUpdateTaskTitle(task.title || '');
              }}
            />
          ) : (
            <p className={cn(
              'text-base transition-all duration-200',
              task.status === 'completed'
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            )}> {task.title}</p>
          )}

          {/* Ngày tạo và ngày hoàn thành */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-4 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
  {new Date(task.createdAt).toLocaleString()}
</span>

{task.completedAt && (
  <>
    <span className='text-xs text-muted-foreground'> - </span>
    <span className='text-xs text-muted-foreground'>
      {new Date(task.completedAt).toLocaleString()}
    </span>
  </>
)}
          </div>

        </div>


        {/* Nút chỉnh sửa và xoá */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          {/* Nút edit */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 text-muted-foreground hover:text-info transition-colors'
            onClick={() => {
              setEditing(true);
              setUpdateTaskTitle(task.title || '');
            }}
          >
            <SquarePen className='size-5' />
          </Button>

          {/* nút xóa */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 text-muted-foreground size-8 hover:text-destructive transition-colors'
            onClick={() => deleteTask({ taskID: task._id })}
          >
            <Trash2 className='size-5' />
          </Button>
        </div>

      </div>
    </Card>
  )
}

export default TaskCard
