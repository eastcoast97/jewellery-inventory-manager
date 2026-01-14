import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Table, Modal, Input, Select } from '../components/ui';
import { useStore } from '../store';
import { Item, CreateItemInput } from '../types';

export function ItemsPage() {
  const navigate = useNavigate();
  const { items, setItems, addItem, itemLoading } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateItemInput>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo - replace with API call
  useEffect(() => {
    if (items.length === 0) {
      const mockData: Item[] = [
        { id: '1', name: 'Sample Item Name', sku: 'Sample SKU', category: 'Gold', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', name: 'Sample Item Name', sku: 'Sample SKU', category: 'Gold', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];
      setItems(mockData);
    }
  }, []);

  const columns = [
    { key: 'name', header: 'Item Name' },
    { key: 'sku', header: 'SKU' },
    { key: 'category', header: 'Category' },
    { key: 'weight', header: 'Weight (grams)' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Item) => (
        <Button variant="ghost" size="sm" onClick={() => navigate(`/items/${item.id}`)}>
          View
        </Button>
      ),
    },
  ];

  const filteredItems = items.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: String(Date.now()),
      ...formData as CreateItemInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addItem(newItem);
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Items</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Item</Button>
      </div>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table data={filteredItems} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Item">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Item Name"
            type="text"
            value={String(formData.name || '')}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="SKU"
            type="text"
            value={String(formData.sku || '')}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />
          <Select
            label="Category"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Item['category'] })}
            options={[{ value: 'Gold', label: 'Gold' }, { value: 'Silver', label: 'Silver' }, { value: 'Diamond', label: 'Diamond' }, { value: 'Platinum', label: 'Platinum' }, { value: 'Other', label: 'Other' }]}
            required
          />
          <Input
            label="Weight (grams)"
            type="number"
            value={String(formData.weight || '')}
            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            required
          />
          <Input
            label="Purity (e.g., 22K, 24K)"
            type="text"
            value={String(formData.purity || '')}
            onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
            
          />
          <Input
            label="Cost Price"
            type="number"
            value={String(formData.costPrice || '')}
            onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
            required
          />
          <Input
            label="Selling Price"
            type="number"
            value={String(formData.sellingPrice || '')}
            onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
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
            label="Supplier"
            type="text"
            value={String(formData.supplier || '')}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            
          />
          <Input
            label="Description"
            type="text"
            value={String(formData.description || '')}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={itemLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
