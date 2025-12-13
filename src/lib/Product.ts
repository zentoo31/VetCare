export type Product = {
  id: string;          
  created_at?: string;    
  description?: string;
  name: string;
  price: number;      
  type: 'food' | 'toys' | 'accessories' | 'medicine' | 'other' | 'leeby' | 'hartz';
  image: string;
};
