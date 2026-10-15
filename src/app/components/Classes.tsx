import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Users, Calendar, Clock } from 'lucide-react';

interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  schedule: string;
  room: string;
  status: 'active' | 'completed';
}

export function Classes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockClasses: Class[] = [
    { id: '1', name: 'Mathematics 101', subject: 'Mathematics', teacher: 'Dr. James Peterson', students: 32, schedule: 'Mon, Wed, Fri 9:00 AM', room: 'Room 201', status: 'active' },
    { id: '2', name: 'English Literature', subject: 'English', teacher: 'Sarah Williams', students: 28, schedule: 'Tue, Thu 10:00 AM', room: 'Room 105', status: 'active' },
    { id: '3', name: 'Physics Advanced', subject: 'Physics', teacher: 'Michael Chen', students: 25, schedule: 'Mon, Wed 2:00 PM', room: 'Lab 301', status: 'active' },
    { id: '4', name: 'Chemistry Lab', subject: 'Chemistry', teacher: 'Emily Rodriguez', students: 30, schedule: 'Tue, Thu 11:00 AM', room: 'Lab 202', status: 'active' },
    { id: '5', name: 'Computer Science', subject: 'CS', teacher: 'David Kumar', students: 35, schedule: 'Mon, Wed, Fri 1:00 PM', room: 'Computer Lab', status: 'active' },
  ];

  const filteredClasses = mockClasses.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Classes</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search classes by name, subject, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">{cls.name}</h3>
                <p className="text-sm text-gray-600">{cls.subject}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                cls.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {cls.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{cls.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{cls.students} Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{cls.room}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Class</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Dr. James Peterson</option>
                  <option>Sarah Williams</option>
                  <option>Michael Chen</option>
                  <option>Emily Rodriguez</option>
                  <option>David Kumar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input type="text" placeholder="e.g., Mon, Wed, Fri 9:00 AM" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
