-- Add missing columns to the products table
-- Using IF NOT EXISTS ensures this script is perfectly safe to run, 
-- even if some columns were already created previously.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS benefits TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS applications TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS technical_highlights TEXT[] DEFAULT '{}';
