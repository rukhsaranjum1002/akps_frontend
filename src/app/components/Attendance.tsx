import { useState } from 'react';
import { Calendar, Check, X, Filter } from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  class: string;
  status: 'present' | 'absent' | 'late';
}

export function Attendance() {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const mockAttendance: AttendanceRecord[] = [
    { studentId: '1', studentName: 'Emma Wilson', class: 'Grade 10-A', status: 'present' },
    { studentId: '2', studentName: 'Liam Brown', class: 'Grade 10-A', status: 'present' },
    { studentId: '3', studentName: 'Ava Garcia', class: 'Grade 10-A', status: 'late' },
    { studentId: '4', studentName: 'Noah Martinez', class: 'Grade 10-A', status: 'absent' },
    { studentId: '5', studentName: 'Sophia Lee', class: 'Grade 10-A', status: 'present' },
    { studentId: '6', studentName: 'Mason Taylor', class: 'Grade 10-A', status: 'present' },
  ];

  const [attendance, setAttendance] = useState(mockAttendance);

  const updateAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  const stats = {
    present: attendance.filter(r => r.status === 'present').length,
    absent: attendance.filter(r => r.status === 'absent').length,
    late: attendance.filter(r => r.status === 'late').length,
    total: attendance.length,
  };

  const attendanceRate = ((stats.present + stats.late) / stats.total * 100).toFixed(1);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Attendance Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold">{attendanceRate}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Present</p>
          <p className="text-2xl font-bold text-green-600">{stats.present}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Absent</p>
          <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Late</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Grade 9-A</option>
              <option>Grade 10-A</option>
              <option>Grade 10-B</option>
              <option>Grade 11-A</option>
              <option>Grade 12-A</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Mark All Present
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record.studentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {record.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{record.studentName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.class}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'absent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateAttendance(record.studentId, 'present')}
                      className={`px-3 py-1 rounded ${
                        record.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'border border-green-600 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => updateAttendance(record.studentId, 'late')}
                      className={`px-3 py-1 rounded ${
                        record.status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => updateAttendance(record.studentId, 'absent')}
                      className={`px-3 py-1 rounded ${
                        record.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'border border-red-600 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
