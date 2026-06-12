import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Package, Clock, CheckCircle, Trash2, Edit, Plus, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'preparing' | 'completed';
  items: string[];
  createdAt: string;
}

const mockOrders: Order[] = [
  { id: 'ORD-001', customerName: 'Arjun K.', total: 498, status: 'pending', items: ['Signature Latte x2'], createdAt: '2 min ago' },
  { id: 'ORD-002', customerName: 'Priya S.', total: 458, status: 'preparing', items: ['Cappuccino', 'Chocolate Croissant'], createdAt: '8 min ago' },
  { id: 'ORD-003', customerName: 'Rohan M.', total: 149, status: 'completed', items: ['Classic Espresso'], createdAt: '15 min ago' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-400 bg-yellow-400/10' },
  preparing: { label: 'Preparing', icon: Package, color: 'text-blue-400 bg-blue-400/10' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-400 bg-green-400/10' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState(mockOrders);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 w-full max-w-sm text-center"
          >
            <Shield className="w-10 h-10 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Admin Access</h2>
            <p className="text-sm text-muted-foreground mb-6">Enter password to continue</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password === 'admin123') setAuthenticated(true);
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4"
                placeholder="Password"
              />
              <Button variant="hero" className="w-full" type="submit">
                Enter Dashboard
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">Demo password: admin123</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your orders and menu</p>
        </motion.div>

        <div className="flex gap-2 mb-8">
          {(['orders', 'menu'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-accent text-accent-foreground' : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'orders' ? 'Orders' : 'Menu Items'}
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const nextStatus: Record<string, Order['status'] | null> = {
                pending: 'preparing',
                preparing: 'completed',
                completed: null,
              };
              const next = nextStatus[order.status];

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-foreground">{order.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customerName} • {order.items.join(', ')}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">₹{order.total}</span>
                    {next && (
                      <Button variant="hero" size="sm" onClick={() => updateOrderStatus(order.id, next)}>
                        Mark {statusConfig[next].label}
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="glass rounded-2xl p-6">
            <p className="text-muted-foreground text-sm text-center py-8">
              Connect a backend or database to enable full menu management with data persistence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
