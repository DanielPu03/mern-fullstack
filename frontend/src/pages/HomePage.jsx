import AddTask from '@/components/AddTask'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StartAndFilter from '@/components/StartAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import DateTimeFilter from '@/components/DateTimeFilter'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([])

  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)

  const [filter, setFilter] = useState("all")

  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);


  //logic lấy nv từ backend
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
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

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


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


  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      <div className="min-h-screen w-full relative">
        {/* Emerald Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)
      `,
            backgroundSize: "100% 100%",
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
            <TaskList
              filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChanged={handleTaskChanged}
            />

            {/* Phần trang và lọc theo ngày */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
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
