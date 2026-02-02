import AddTask from '@/components/AddTask'
import DateTimeFileter from '@/components/DateTimeFileter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StartAndFilter from '@/components/StartAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([])

  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)

  const [filter, setFilter] = useState("all")


  useEffect(() => {
    fetchTasks()
  }, [])

  //logic lấy nv từ backend
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.activeCount)
      setCompleteTaskCount(res.data.completedCount); 

    } catch (error) {
      console.error('Lỗi xảy ra khi truy xuất tasks:', error)
      toast.error('Lỗi xảy ra khi truy xuất tasks.')
    }
  }

  const handleTaskChanged = () => {
    fetchTasks()
  }

  //biến lọc nv theo trạng thái
const filteredTasks = taskBuffer.filter((task) => {
  switch (filter) {
    case "active":
      return task.status === "active";
    case "completed": 
      return task.status === "completed";
    default:
      return true;
  }
});


  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      <div className="min-h-screen w-full relative">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(45deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
          }}
        />

        {/* Content */}
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

            {/* Đầu trang */}
            <Header />

            {/* Tạo nhiệm vụ */}
            <AddTask handleNewTaskAdded={handleTaskChanged} />

            {/* Thống kê và bộ loc , phải truyền đúng bên StartAndFilter*/} 
        <StartAndFilter
  filter={filter}
  setFilter={setFilter}
  activeTasksCount={activeTaskCount} 
  completedTasksCount={completeTaskCount} 
/>

            {/* Danh sách nhiệm vụ */}
            <TaskList filteredTasks={filteredTasks} filter={filter} handleTaskChanged={handleTaskChanged} />

            {/* Phần trang và lọc theo ngày */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination />
              <DateTimeFileter />
            </div>

            {/* Chân trang */}
            <Footer 
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
