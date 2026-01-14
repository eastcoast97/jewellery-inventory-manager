import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useStore } from '../store';

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, removeItem } = useStore();
  
  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Item not found</h2>
        <Button className="mt-4" onClick={() => navigate('/items')}>
          Back to Items
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      removeItem(id!);
      navigate('/items');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => navigate('/items')}>
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
            <dt className="text-sm font-medium text-gray-500">Item Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.name || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">SKU</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.sku || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.category || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Weight (grams)</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.weight || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Purity (e.g., 22K, 24K)</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.purity || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Cost Price</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.costPrice || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Selling Price</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.sellingPrice || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Quantity</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.quantity || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Supplier</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.supplier || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.description || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{new Date(item.createdAt).toLocaleString()}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
