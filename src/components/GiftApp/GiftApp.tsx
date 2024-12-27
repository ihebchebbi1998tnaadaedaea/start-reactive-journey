import React, { useState } from 'react';
import { Product } from '@/types/product';
import ProductSelectionPanel from './ProductSelectionPanel';
import GiftBasket3D from './GiftBasket3D';
import PackSummary from './PackSummary';
import { useToast } from "@/components/ui/use-toast";

const GiftApp = () => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleItemDrop = (item: Product, size: string, personalization: string) => {
    setSelectedItems([...selectedItems, { ...item, size, personalization }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
  };

  return (
    <div className="container mx-auto px-4 mt-32">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GiftBasket3D
            items={selectedItems}
            onItemDrop={handleItemDrop}
            onRemoveItem={handleRemoveItem}
          />
        </div>
        <div>
          <PackSummary
            items={selectedItems}
            note={note}
            onNoteChange={setNote}
          />
        </div>
      </div>
      <div className="mt-8">
        <ProductSelectionPanel onItemSelect={() => {}} />
      </div>
    </div>
  );
};

export default GiftApp;