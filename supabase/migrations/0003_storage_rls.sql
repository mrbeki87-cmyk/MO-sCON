-- Set up Storage RLS policies for the 'products' bucket

-- 1. Policy: Allow anyone to view/read images
CREATE POLICY "Allow public read for products bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'products');

-- 2. Policy: Allow authenticated users (admins) to upload images
CREATE POLICY "Allow authenticated uploads to products bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- 3. Policy: Allow authenticated users (admins) to update images
CREATE POLICY "Allow authenticated updates to products bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- 4. Policy: Allow authenticated users (admins) to delete images
CREATE POLICY "Allow authenticated deletes from products bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'products');
