import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return (
  <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {
            completedTasksCount > 0 && (
              <>
                Thật vui vì bạn đã hoàn thành {completedTasksCount}
                {
                  activeTasksCount > 0 && ` Còn lại ${activeTasksCount} công việc đang chờ bạn hoàn thành.`
                }
              </>
            )
          }
          {
            completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Hãy bắt đầu làm {activeTasksCount} công việc nào.
              </>
            )
          } 

          </p>
      </div>  
    
    )}
  </>
  )
}

export default Footer
