-- Block anonymous users from accessing the user_roles table
CREATE POLICY "Block anonymous access" 
ON public.user_roles 
FOR SELECT 
TO anon 
USING (false);