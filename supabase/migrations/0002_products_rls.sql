-- Enable Row Level Security (RLS) on the products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view products
-- This allows anonymous visitors on the main website to see your products
CREATE POLICY "Allow public read access on products" 
ON products 
FOR SELECT 
TO public 
USING (true);

-- Policy: Only authenticated users (admins) can create new products
CREATE POLICY "Allow authenticated insert access on products" 
ON products 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can update products
CREATE POLICY "Allow authenticated update access on products" 
ON products 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can delete products
CREATE POLICY "Allow authenticated delete access on products" 
ON products 
FOR DELETE 
TO authenticated 
USING (true);
