import React from 'react';
import { Product } from '@/types/product';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SizeSelector from '../../product-detail/SizeSelector';

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  personalization: string;
  onPersonalizationChange: (text: string) => void;
  onConfirm: () => void;
}

const AddItemDialog = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  onSizeSelect,
  onConfirm,
}: AddItemDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
            Sélectionnez une taille
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-20 h-20 object-contain bg-white rounded-md p-2"
            />
            <div>
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-[#6D0201] font-medium">{product.price} TND</p>
            </div>
          </div>

          <SizeSelector
            selectedSize={selectedSize}
            sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
            onSizeSelect={onSizeSelect}
          />

          <button
            onClick={onConfirm}
            className={`w-full py-4 rounded-xl text-white font-medium ${
              !selectedSize
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6D0201] hover:bg-[#590000]'
            }`}
            disabled={!selectedSize}
          >
            Confirmer
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;