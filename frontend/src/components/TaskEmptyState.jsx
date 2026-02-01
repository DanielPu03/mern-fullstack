import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
  return (
   <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className='space-y-3'>
        <Circle className='mx-auto size-12 text-muted-foreground' />

        <div>

        <h3 className='font-medium text-foreground'>
          {filter === 'active' ? 'Không có công việc hoạt động nào' 
          : filter === 'completed' ? 'Không có công việc đã hoàn thành nào'
          : 'Không có công việc nào'}
        </h3>
        <p className='text-sm text-muted-foreground'>
            {filter === 'all' ? 'Hãy thêm công việc mới để bắt đầu quản lý công việc của bạn.' 
            : `Chuyển bộ lọc "tất cả" để xem các nhiệm vụ 
            ${filter === 'active' ? 'đã hoàn thành' : 'đang làm.'}.`  }
        </p>
        </div>

      </div>
   </Card>
  )
}

export default TaskEmptyState
