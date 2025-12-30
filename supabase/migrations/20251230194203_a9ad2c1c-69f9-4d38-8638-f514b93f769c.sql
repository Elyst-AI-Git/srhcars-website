-- Drop the existing policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a new policy that explicitly requires authentication
CREATE POLICY "Authenticated users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);