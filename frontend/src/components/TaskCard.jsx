import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';

const TaskCard = ({ task, index }) => {
  let isEditting = false;
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
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5' />

          ) : <Circle className='size-5' />}
        </Button>

        {/* Hiển thị chỉnh sửa tiêu đề công việc */}
        <div className='flex-1 min-w-0'>
          {isEditting ? (
            <Input
              plceholder='Chỉnh sửa công việc'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type='text'
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
              {new Date(task.createAt).toLocaleDateString()}
            </span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'> - </span>
                <Calendar className='size-4 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>-
                  {new Date(task.completedAt).toLocaleDateString()}
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
          >
            <SquarePen className='size-5' />
          </Button>

          {/* nút xóa */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 text-muted-foreground size-8 hover:text-destructive transition-colors'
          >
            <Trash2 className='size-5' />
          </Button>
        </div>

      </div>
    </Card>
  )
}

export default TaskCard
