import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Car } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Loader2, Plus, Pencil, Trash2, Check, X, Upload } from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

const emptyCarForm = {
  model_name: "",
  price: "",
  year: "",
  body_type: "",
  doors: "",
  seats: "",
  colour: "",
  registration_date: "",
  mileage: "",
  fuel_type: "",
  gearbox: "",
  drive_type: "",
  key_features: "",
  image_urls: [] as string[],
};

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyCarForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCars((data as Car[]) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch cars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [...form.image_urls];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `car-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("car-images")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setForm({ ...form, image_urls: uploadedUrls });
      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const carData = {
      model_name: form.model_name,
      price: parseFloat(form.price),
      year: parseInt(form.year),
      body_type: form.body_type,
      doors: parseInt(form.doors),
      seats: parseInt(form.seats),
      colour: form.colour,
      registration_date: form.registration_date,
      mileage: parseInt(form.mileage),
      fuel_type: form.fuel_type,
      gearbox: form.gearbox,
      drive_type: form.drive_type,
      key_features: form.key_features.split("\n").filter(f => f.trim()),
      image_urls: form.image_urls,
      status: "available" as const,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from("cars")
          .update(carData)
          .eq("id", editingId);
        if (error) throw error;
        toast({ title: "Success", description: "Car updated successfully" });
      } else {
        const { error } = await supabase.from("cars").insert([carData]);
        if (error) throw error;
        toast({ title: "Success", description: "Car added successfully" });
      }

      setForm(emptyCarForm);
      setEditingId(null);
      fetchCars();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingId(car.id);
    setForm({
      model_name: car.model_name,
      price: car.price.toString(),
      year: car.year.toString(),
      body_type: car.body_type,
      doors: car.doors.toString(),
      seats: car.seats.toString(),
      colour: car.colour,
      registration_date: car.registration_date,
      mileage: car.mileage.toString(),
      fuel_type: car.fuel_type,
      gearbox: car.gearbox,
      drive_type: car.drive_type,
      key_features: car.key_features?.join("\n") || "",
      image_urls: car.image_urls || [],
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.from("cars").delete().eq("id", deleteId);
      if (error) throw error;
      toast({ title: "Success", description: "Car deleted successfully" });
      fetchCars();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const toggleStatus = async (car: Car) => {
    const newStatus = car.status === "available" ? "sold" : "available";
    try {
      const { error } = await supabase
        .from("cars")
        .update({ status: newStatus })
        .eq("id", car.id);
      if (error) throw error;
      toast({ title: "Success", description: `Car marked as ${newStatus}` });
      fetchCars();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeImage = (index: number) => {
    const newUrls = form.image_urls.filter((_, i) => i !== index);
    setForm({ ...form, image_urls: newUrls });
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-card/5 border-b border-border/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary-foreground">
            SRH Cars <span className="text-accent">Admin</span>
          </h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-card/5 border border-border/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-primary-foreground mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-accent" />
              {editingId ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Model Name *</Label>
                  <Input
                    value={form.model_name}
                    onChange={(e) => setForm({ ...form, model_name: e.target.value })}
                    placeholder="e.g. BMW 3 Series"
                    className="bg-primary border-border/30 text-primary-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Price (£) *</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="12995"
                    className="bg-primary border-border/30 text-primary-foreground"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Year *</Label>
                  <Input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2021"
                    className="bg-primary border-border/30 text-primary-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Doors</Label>
                  <Input
                    type="number"
                    value={form.doors}
                    onChange={(e) => setForm({ ...form, doors: e.target.value })}
                    placeholder="4"
                    className="bg-primary border-border/30 text-primary-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Seats</Label>
                  <Input
                    type="number"
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    placeholder="5"
                    className="bg-primary border-border/30 text-primary-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Body Type</Label>
                  <Select value={form.body_type} onValueChange={(v) => setForm({ ...form, body_type: v })}>
                    <SelectTrigger className="bg-primary border-border/30 text-primary-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saloon">Saloon</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Estate">Estate</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Convertible">Convertible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Colour</Label>
                  <Input
                    value={form.colour}
                    onChange={(e) => setForm({ ...form, colour: e.target.value })}
                    placeholder="Black"
                    className="bg-primary border-border/30 text-primary-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Mileage</Label>
                  <Input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                    placeholder="45000"
                    className="bg-primary border-border/30 text-primary-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Registration Date</Label>
                  <Input
                    type="date"
                    value={form.registration_date}
                    onChange={(e) => setForm({ ...form, registration_date: e.target.value })}
                    className="bg-primary border-border/30 text-primary-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Fuel Type</Label>
                  <Select value={form.fuel_type} onValueChange={(v) => setForm({ ...form, fuel_type: v })}>
                    <SelectTrigger className="bg-primary border-border/30 text-primary-foreground">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Gearbox</Label>
                  <Select value={form.gearbox} onValueChange={(v) => setForm({ ...form, gearbox: v })}>
                    <SelectTrigger className="bg-primary border-border/30 text-primary-foreground">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Drive Type</Label>
                  <Select value={form.drive_type} onValueChange={(v) => setForm({ ...form, drive_type: v })}>
                    <SelectTrigger className="bg-primary border-border/30 text-primary-foreground">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-primary-foreground">Key Features (one per line)</Label>
                <Textarea
                  value={form.key_features}
                  onChange={(e) => setForm({ ...form, key_features: e.target.value })}
                  placeholder="Leather Seats&#10;Navigation&#10;Parking Sensors"
                  className="bg-primary border-border/30 text-primary-foreground min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-primary-foreground">Images</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.image_urls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img src={url} alt="" className="w-20 h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg cursor-pointer hover:bg-accent/20 transition-colors">
                  <Upload className="w-4 h-4 text-accent" />
                  <span className="text-accent text-sm">
                    {uploadingImages ? "Uploading..." : "Upload Images"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImages}
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingId ? (
                    "Update Vehicle"
                  ) : (
                    "Add Vehicle"
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyCarForm);
                    }}
                    className="border-border/30 text-primary-foreground"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Cars List */}
          <div className="bg-card/5 border border-border/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-primary-foreground mb-6">
              Inventory ({cars.length} vehicles)
            </h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
              </div>
            ) : cars.length === 0 ? (
              <p className="text-center text-primary-foreground/60 py-8">
                No vehicles added yet
              </p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-4 p-4 bg-primary rounded-lg border border-border/20"
                  >
                    <img
                      src={car.image_urls?.[0] || "/placeholder.svg"}
                      alt={car.model_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary-foreground truncate">
                        {car.year} {car.model_name}
                      </div>
                      <div className="text-accent font-bold">
                        £{car.price?.toLocaleString()}
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          car.status === "available"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {car.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => toggleStatus(car)}
                        className="border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        title={car.status === "available" ? "Mark as Sold" : "Mark as Available"}
                      >
                        {car.status === "available" ? (
                          <X className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(car)}
                        className="border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteId(car.id)}
                        className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary-foreground">
              Delete Vehicle
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/30 text-primary-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
