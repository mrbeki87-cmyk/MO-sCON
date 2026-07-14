CREATE TABLE IF NOT EXISTS company_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so the website can load settings for the footer/contact page)
CREATE POLICY "Allow public read access on company_settings"
  ON company_settings
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert, update, or delete settings
CREATE POLICY "Allow authenticated full access on company_settings"
  ON company_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
