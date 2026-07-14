-- Make the 'name' column optional since the frontend uses 'title'
ALTER TABLE products ALTER COLUMN name DROP NOT NULL;

-- Reload schema just in case
NOTIFY pgrst, 'reload schema';
