import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Table, Modal, Input, Select } from '../components/ui';
import { useStore } from '../store';
import { Sale, CreateSaleInput } from '../types';

export function SalesPage() {
  const navigate = useNavigate();
  const { sales, setSales, addSale, saleLoading } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateSaleInput>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo - replace with API call
  useEffect(() => {
    if (sales.length === 0) {
      const mockData: Sale[] = [
        { id: '1', customerName: 'Sample Customer Name', customerPhone: 'Sample Phone', itemId: 'Sample Item', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', customerName: 'Sample Customer Name', customerPhone: 'Sample Phone', itemId: 'Sample Item', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];
      setSales(mockData);
    }
  }, []);

  const columns = [
    { key: 'customerName', header: 'Customer Name' },
    { key: 'customerPhone', header: 'Phone' },
    { key: 'itemId', header: 'Item' },
    { key: 'quantity', header: 'Quantity' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Sale) => (
        <Button variant="ghost" size="sm" onClick={() => navigate(`/sales/${item.id}`)}>
          View
        </Button>
      ),
    },
  ];

  const filteredSales = sales.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSale: Sale = {
      id: String(Date.now()),
      ...formData as CreateSaleInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addSale(newSale);
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Sale</Button>
      </div>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table data={filteredSales} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Sale">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Customer Name"
            type="text"
            value={String(formData.customerName || '')}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="text"
            value={String(formData.customerPhone || '')}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            
          />
          <Input
            label="Item"
            type="text"
            value={String(formData.itemId || '')}
            onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
            required
          />
          <Input
            label="Quantity"
            type="number"
            value={String(formData.quantity || '')}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            required
          />
          <Input
            label="Total Amount"
            type="number"
            value={String(formData.totalAmount || '')}
            onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
            required
          />
          <Select
            label="Payment Method"
            value={formData.paymentMethod || ''}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as Sale['paymentMethod'] })}
            options={[{ value: 'Cash', label: 'Cash' }, { value: 'Card', label: 'Card' }, { value: 'UPI', label: 'UPI' }, { value: 'Bank Transfer', label: 'Bank Transfer' }]}
            required
          />
          <Input
            label="Sale Date"
            type="date"
            value={String(formData.saleDate || '')}
            onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
            required
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saleLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
