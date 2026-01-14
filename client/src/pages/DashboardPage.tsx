import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { useStore } from '../store';

export function DashboardPage() {
  const { items, sales } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to jewellery-inventory-manager</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="text-center">
        <div className="text-3xl font-bold text-blue-600">{items.length}</div>
        <div className="text-gray-600">Total Items</div>
      </Card>
      <Card className="text-center">
        <div className="text-3xl font-bold text-blue-600">{sales.length}</div>
        <div className="text-gray-600">Total Sales</div>
      </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-4">
          <Link to="/items">
            <Button>Manage Items</Button>
          </Link>
          <Link to="/sales">
            <Button>Manage Sales</Button>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <p className="text-gray-500">No recent activity to display.</p>
      </Card>
    </div>
  );
}
