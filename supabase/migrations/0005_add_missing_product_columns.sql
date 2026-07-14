-- Add any remaining missing columns to the products table
-- Using IF NOT EXISTS ensures this is perfectly safe to run

ALTER TABLE products
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS overview TEXT,
ADD COLUMN IF NOT EXISTS img TEXT;
