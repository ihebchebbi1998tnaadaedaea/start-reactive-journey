import React, { useState } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/components/ui/use-toast';
import GiftContainerGroup from './containers/GiftContainerGroup';
import ProductDialog from './dialogs/ProductDialog';
import AddItemDialog from './dialogs/AddItemDialog';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftBasket3D = ({ items, onItemDrop, onRemoveItem }: GiftBasket3DProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetContainer, setTargetContainer] = useState<number>(0);

  const container1Items = items.slice(0, 2);
  const container2Items = items.slice(2, 3);
  const container3Items = items.slice(3, 4);

  const handleDrop = (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    
    // Check container capacity before proceeding
    const containerItems = containerId === 0 ? container1Items : 
                         containerId === 1 ? container2Items : 
                         container3Items;
    
    const maxItems = containerId === 0 ? 2 : 1;
    
    if (containerItems.length >= maxItems) {
      toast({
        title: "Container plein",
        description: "Ce pack est déjà plein. Veuillez choisir un autre pack ou retirer un article.",
        variant: "destructive",
      });
      return;
    }

    setDroppedItem(item);
    setTargetContainer(containerId);
    setShowAddDialog(true);
    playTickSound();
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize) {
      // Calculate the correct index based on the target container
      let insertIndex = 0;
      if (targetContainer === 1) {
        insertIndex = 2;
      } else if (targetContainer === 2) {
        insertIndex = 3;
      }

      onItemDrop(droppedItem, selectedSize, personalization);
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setDroppedItem(null);
      
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <>
      <GiftContainerGroup
        container1Items={container1Items}
        container2Items={container2Items}
        container3Items={container3Items}
        onDrop={handleDrop}
        onProductClick={handleProductClick}
        onRemoveItem={onRemoveItem || (() => {})}
      />

      <ProductDialog
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
      />

      <AddItemDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        product={droppedItem}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
        personalization={personalization}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default GiftBasket3D;