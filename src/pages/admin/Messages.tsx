import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminCard } from '../../components/admin/AdminCard';
import { Modal } from '../../components/admin/Modal';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { Mail, CheckCircle, Trash2, Loader2, Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredMessages = useMemo(() => {
    let result = [...messages];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(msg => 
        msg.full_name.toLowerCase().includes(lowerQuery) ||
        msg.email.toLowerCase().includes(lowerQuery) ||
        (msg.company_name?.toLowerCase() || '').includes(lowerQuery) ||
        (msg.phone?.toLowerCase() || '').includes(lowerQuery) ||
        msg.subject.toLowerCase().includes(lowerQuery)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(msg => {
        const currentStatus = msg.status || 'new';
        return currentStatus === statusFilter;
      });
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(msg => {
        const msgDate = new Date(msg.created_at);
        if (dateFilter === 'today') {
          return msgDate.toDateString() === now.toDateString();
        } else if (dateFilter === '7days') {
          return (now.getTime() - msgDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === '30days') {
          return (now.getTime() - msgDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === 'thisMonth') {
          return msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
        }
        return true;
      });
    }

    result.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [messages, searchQuery, statusFilter, dateFilter, sortBy]);

  const fetchMessages = async () => {
    setIsLoading(true);


    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Supabase error fetching messages:', error);
      toast.error(`Failed to fetch messages: ${error.message}`);
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("Database rejected the update. You might not have permission (RLS) or the status column is still missing.");
      }
      
      toast.success(`Marked as ${newStatus}`);
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(`Failed: ${err.message}`);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', deleteTargetId);
      if (error) throw error;
      toast.success('Message deleted');
      fetchMessages();
      if (selectedMessage?.id === deleteTargetId) {
        setSelectedMessage(null);
      }
    } catch {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Inquiries & Messages</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-slate-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 w-full sm:w-auto border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-slate-400" />
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-9 pr-8 py-2 w-full sm:w-auto border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown size={16} className="text-slate-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-9 pr-8 py-2 w-full sm:w-auto border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm appearance-none bg-white cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              No messages found.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No inquiries match your search.
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((msg) => (
                    <tr key={msg.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedMessage(msg)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {msg.full_name}
                      {msg.company_name && <span className="block text-xs font-normal text-slate-500">{msg.company_name}</span>}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[200px]">{msg.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${msg.status === 'closed' ? 'bg-slate-100 text-slate-800' : 
                          msg.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}
                      >
                        {msg.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteTargetId(msg.id); }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          )}
        </div>
      </AdminCard>

      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Message Details"
        maxWidth="2xl"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-slate-500 mb-1">From</p>
                <p className="font-medium text-slate-900">{selectedMessage.full_name}</p>
                {selectedMessage.company_name && <p className="text-sm text-slate-600">{selectedMessage.company_name}</p>}
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Contact Info</p>
                <p className="text-sm text-slate-900 flex items-center"><Mail size={14} className="mr-2 text-slate-400" /> {selectedMessage.email}</p>
                {selectedMessage.phone && <p className="text-sm text-slate-900 flex items-center mt-1"><CheckCircle size={14} className="mr-2 text-slate-400" /> {selectedMessage.phone}</p>}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">Subject: {selectedMessage.subject}</h4>
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-slate-700 whitespace-pre-wrap min-h-[150px]">
                {selectedMessage.message}
              </div>
              <p className="text-xs text-slate-400 mt-2 text-right">
                Received: {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedMessage.id, 'contacted')}
                  disabled={selectedMessage.status === 'contacted'}
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors disabled:opacity-50"
                >
                  Mark as Contacted
                </button>
                <button
                  onClick={() => updateStatus(selectedMessage.id, 'closed')}
                  disabled={selectedMessage.status === 'closed'}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors disabled:opacity-50"
                >
                  Mark as Closed
                </button>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this inquiry? This action cannot be undone."
        confirmText="Delete Message"
        isLoading={isDeleting}
      />
    </div>
  );
}
