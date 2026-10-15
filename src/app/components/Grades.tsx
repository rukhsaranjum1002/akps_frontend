import { useState } from 'react';
import { Search, Download, Plus, TrendingUp, TrendingDown } from 'lucide-react';

interface Grade {
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  date: string;
}

export function Grades() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const mockGrades: Grade[] = [
    { studentId: '1', studentName: 'Emma Wilson', class: 'Grade 10-A', subject: 'Mathematics', assignment: 'Midterm Exam', score: 92, maxScore: 100, date: '2026-04-15' },
    { studentId: '1', studentName: 'Emma Wilson', class: 'Grade 10-A', subject: 'Physics', assignment: 'Lab Report', score: 88, maxScore: 100, date: '2026-04-20' },
    { studentId: '2', studentName: 'Liam Brown', class: 'Grade 10-B', subject: 'Mathematics', assignment: 'Midterm Exam', score: 78, maxScore: 100, date: '2026-04-15' },
    { studentId: '2', studentName: 'Liam Brown', class: 'Grade 10-B', subject: 'English', assignment: 'Essay', score: 85, maxScore: 100, date: '2026-04-18' },
    { studentId: '3', studentName: 'Olivia Davis', class: 'Grade 9-A', subject: 'Chemistry', assignment: 'Quiz 1', score: 95, maxScore: 100, date: '2026-04-22' },
    { studentId: '4', studentName: 'Noah Martinez', class: 'Grade 11-A', subject: 'Computer Science', assignment: 'Project', score: 90, maxScore: 100, date: '2026-04-25' },
  ];

  const filteredGrades = mockGrades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.assignment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || grade.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const calculatePercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(1);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const classAverages = [
    { class: 'Grade 10-A', average: 87.5, trend: 'up' },
    { class: 'Grade 10-B', average: 82.3, trend: 'up' },
    { class: 'Grade 9-A', average: 89.1, trend: 'down' },
    { class: 'Grade 11-A', average: 85.7, trend: 'up' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Grades & Results</h2>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
            <Download className="w-5 h-5" />
            Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Add Grade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {classAverages.map((item) => (
          <div key={item.class} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600">{item.class}</p>
                <p className="text-2xl font-bold mt-1">{item.average}%</p>
              </div>
              {item.trend === 'up' ? (
                <TrendingUp className="w-6 h-6 text-green-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">Class Average</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by student, subject, or assignment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="min-w-[200px]">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="Grade 9-A">Grade 9-A</option>
              <option value="Grade 10-A">Grade 10-A</option>
              <option value="Grade 10-B">Grade 10-B</option>
              <option value="Grade 11-A">Grade 11-A</option>
              <option value="Grade 12-A">Grade 12-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGrades.map((grade, index) => {
              const percentage = parseFloat(calculatePercentage(grade.score, grade.maxScore));
              const letterGrade = getLetterGrade(percentage);
              const gradeColor = getGradeColor(percentage);

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {grade.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{grade.studentName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.assignment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.score}/{grade.maxScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${gradeColor}`}>
                      {percentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-sm font-bold rounded-full ${
                      letterGrade === 'A' ? 'bg-green-100 text-green-800' :
                      letterGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                      letterGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {letterGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grade.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
