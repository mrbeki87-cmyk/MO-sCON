import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { StatCard } from '../../components/admin/StatCard';
import { AdminCard } from '../../components/admin/AdminCard';
import { Package, MessageSquare, Clock, Activity, ArrowRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface RecentMessage {
  id: string;
  full_name: string;
  subject: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productsCount: 0,
    inquiryCount: 0,
    recentMessages: [] as RecentMessage[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products count
        const { count: productsCount, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        if (productsError) console.error('Supabase error fetching products count:', productsError);

        // Fetch total inquiries count
        const { count: inquiryCount, error: inquiryCountError } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true });
        if (inquiryCountError) console.error('Supabase error fetching inquiry count:', inquiryCountError);

        // Fetch 5 most recent messages
        const { data: recentMessages, error: messagesError } = await supabase
          .from('inquiries')
          .select('id, full_name, subject, created_at, status')
          .order('created_at', { ascending: false })
          .limit(5);
        if (messagesError) {
          console.error('Supabase error fetching recent messages:', messagesError);
          toast.error(`Failed to fetch recent inquiries: ${messagesError.message}`);
        }

        setStats({
          productsCount: productsCount || 0,
          inquiryCount: inquiryCount || 0,
          recentMessages: recentMessages || [],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={isLoading ? '-' : stats.productsCount} 
          icon={Package} 
        />
        <StatCard 
          title="Total Inquiries" 
          value={isLoading ? '-' : stats.inquiryCount} 
          icon={MessageSquare} 
        />
        <StatCard 
          title="Active Sessions" 
          value="1" 
          icon={Activity} 
          trend={{ value: '100%', positive: true }}
        />
        <StatCard 
          title="Last Update" 
          value="Just now" 
          icon={Clock} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard 
          title="Recent Inquiries" 
          action={
            <Link to="/admin/messages" className="text-sm font-medium text-primary hover:text-primary-light flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          }
        >
          {isLoading ? (
            <div className="py-8 text-center text-slate-500 animate-pulse">Loading messages...</div>
          ) : stats.recentMessages.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No inquiries found.</div>
          ) : (
            <div className="space-y-4">
              {stats.recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{msg.full_name}</h4>
                    <p className="text-sm text-slate-500 truncate max-w-[200px] sm:max-w-[300px]">{msg.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${msg.status === 'closed' ? 'bg-slate-100 text-slate-800' : 
                        msg.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}
                    >
                      {msg.status || 'new'}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/admin/products" 
              className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center text-slate-500 group-hover:text-primary mb-3 transition-colors">
                <Package size={20} />
              </div>
              <h4 className="text-sm font-medium text-slate-900">Manage Products</h4>
              <p className="text-xs text-slate-500 mt-1">Add, edit, or delete</p>
            </Link>
            
            <Link 
              to="/admin/settings" 
              className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center text-slate-500 group-hover:text-primary mb-3 transition-colors">
                <Settings size={20} />
              </div>
              <h4 className="text-sm font-medium text-slate-900">Company Settings</h4>
              <p className="text-xs text-slate-500 mt-1">Update contact info</p>
            </Link>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
