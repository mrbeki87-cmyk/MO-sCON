-- Add the status column if it doesn't exist
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Also ensure other potentially missing columns exist just to be safe
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone TEXT;

-- Reload the schema cache
NOTIFY pgrst, 'reload schema';
