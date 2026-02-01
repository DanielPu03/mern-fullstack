import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $facet: {
          tasks: [
            { $sort: { createdAt: -1 } }
          ],
          activeCount: [  
            { $match: { status: 'active' } },
            { $count: 'count' }
          ],
          completeCount: [
            { $match: { status: 'complete' } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const data = result[0] || {};

    res.status(200).json({
      tasks: data.tasks || [],
      activeCount: data.activeCount?.[0]?.count || 0,
      completeCount: data.completeCount?.[0]?.count || 0
    });

  } catch (error) {
    console.error('Lỗi khi gọi getAllTasks:', error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Lỗi khi gọi createTask:', error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Lỗi khi updatedTask:', error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json({ message: `Xóa task với id ${req.params.id} thành công` });
  } catch (error) {
    console.error('Lỗi khi deleteTask:', error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};