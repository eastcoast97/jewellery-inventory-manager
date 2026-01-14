import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useStore } from '../store';

export function SaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sales, removeSale } = useStore();
  
  const sale = sales.find(item => item.id === id);

  if (!sale) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Sale not found</h2>
        <Button className="mt-4" onClick={() => navigate('/sales')}>
          Back to Sales
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this sale?')) {
      removeSale(id!);
      navigate('/sales');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sale Details</h1>
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => navigate('/sales')}>
            Back
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Customer Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.customerName || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.customerPhone || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Item</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.itemId || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Quantity</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.quantity || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.totalAmount || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.paymentMethod || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Sale Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{sale.saleDate || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{new Date(sale.createdAt).toLocaleString()}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
