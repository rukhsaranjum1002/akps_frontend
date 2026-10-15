import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: '87', icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Active Classes', value: '45', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Attendance Rate', value: '94%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { type: 'enrollment', message: 'New student enrolled: Sarah Johnson', time: '2 hours ago' },
    { type: 'grade', message: 'Grades published for Mathematics 101', time: '5 hours ago' },
    { type: 'attendance', message: 'Attendance marked for Class 10-A', time: '1 day ago' },
    { type: 'class', message: 'New class created: Physics Advanced', time: '2 days ago' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
