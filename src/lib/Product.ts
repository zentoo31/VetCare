export type Product = {
  id: string;          
  created_at: string;    
  name: string;
  price: number;      
  type: 'food' | 'toys' | 'accessories' | 'medicine' | 'other';
  image: string;
};
