-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  year INTEGER NOT NULL,
  body_type TEXT NOT NULL,
  doors INTEGER NOT NULL DEFAULT 4,
  seats INTEGER NOT NULL DEFAULT 5,
  colour TEXT NOT NULL,
  registration_date DATE NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  gearbox TEXT NOT NULL,
  drive_type TEXT NOT NULL DEFAULT 'FWD',
  key_features TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on cars
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Anyone can view available cars
CREATE POLICY "Anyone can view available cars"
ON public.cars
FOR SELECT
USING (status = 'available');

-- Admins can view all cars
CREATE POLICY "Admins can view all cars"
ON public.cars
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert cars
CREATE POLICY "Admins can insert cars"
ON public.cars
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update cars
CREATE POLICY "Admins can update cars"
ON public.cars
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete cars
CREATE POLICY "Admins can delete cars"
ON public.cars
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for cars updated_at
CREATE TRIGGER update_cars_updated_at
BEFORE UPDATE ON public.cars
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true);

-- Storage policies for car images
CREATE POLICY "Anyone can view car images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'car-images');

CREATE POLICY "Admins can upload car images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update car images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete car images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));