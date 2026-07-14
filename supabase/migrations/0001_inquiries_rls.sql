-- Enable Row Level Security (RLS) on the inquiries table
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a new inquiry
-- This allows anonymous website visitors (and authenticated users) to use the contact form
CREATE POLICY "Allow public inserts on inquiries" 
ON inquiries 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view inquiries
-- This prevents anonymous users from reading other people's submissions
CREATE POLICY "Allow authenticated read access" 
ON inquiries 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy: Only authenticated users (admins) can update inquiries
-- This allows admins to change the status of an inquiry (e.g. to 'contacted' or 'closed')
CREATE POLICY "Allow authenticated update access" 
ON inquiries 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can delete inquiries
-- This allows admins to remove inquiries from the dashboard
CREATE POLICY "Allow authenticated delete access" 
ON inquiries 
FOR DELETE 
TO authenticated 
USING (true);
