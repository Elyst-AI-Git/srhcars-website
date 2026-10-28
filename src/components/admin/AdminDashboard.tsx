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
import { LogOut, Loader2, Plus, Pencil, Trash2, X, Upload, AlertCircle } from "lucide-react";
import { compressForFullSize, getFileExtension } from "@/lib/imageCompression";

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

type FormErrors = {
  [key in keyof typeof emptyCarForm]?: string;
};

const MAX_IMAGES = 20;

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyCarForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.model_name.trim()) {
      newErrors.model_name = "Please enter the car model (e.g., BMW 3 Series)";
    }
    if (!form.price.trim()) {
      newErrors.price = "Please enter the price in pounds";
    }
    if (!form.year.trim()) {
      newErrors.year = "Please enter the year of manufacture";
    }
    if (!form.body_type) {
      newErrors.body_type = "Please select a body type";
    }
    if (!form.doors.trim()) {
      newErrors.doors = "Please enter number of doors";
    }
    if (!form.seats.trim()) {
      newErrors.seats = "Please enter number of seats";
    }
    if (!form.colour.trim()) {
      newErrors.colour = "Please enter the car colour";
    }
    if (!form.registration_date) {
      newErrors.registration_date = "Please select the registration date";
    }
    if (!form.mileage.trim()) {
      newErrors.mileage = "Please enter the mileage";
    }
    if (!form.fuel_type) {
      newErrors.fuel_type = "Please select the fuel type";
    }
    if (!form.gearbox) {
      newErrors.gearbox = "Please select gearbox type";
    }
    if (!form.drive_type) {
      newErrors.drive_type = "Please select drive type";
    }
    if (!form.key_features.trim()) {
      newErrors.key_features = "Please add at least one key feature";
    }
    if (form.image_urls.length === 0) {
      newErrors.image_urls = "Please upload at least 1 image (maximum 20)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return (
      form.model_name.trim() !== "" &&
      form.price.trim() !== "" &&
      form.year.trim() !== "" &&
      form.body_type !== "" &&
      form.doors.trim() !== "" &&
      form.seats.trim() !== "" &&
      form.colour.trim() !== "" &&
      form.registration_date !== "" &&
      form.mileage.trim() !== "" &&
      form.fuel_type !== "" &&
      form.gearbox !== "" &&
      form.drive_type !== "" &&
      form.key_features.trim() !== "" &&
      form.image_urls.length > 0
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_IMAGES - form.image_urls.length;
    if (remainingSlots <= 0) {
      toast({
        title: "Limit Reached",
        description: `Maximum ${MAX_IMAGES} images allowed per vehicle`,
        variant: "destructive",
      });
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    if (filesToUpload.length < files.length) {
      toast({
        title: "Note",
        description: `Only uploading ${filesToUpload.length} image(s). Maximum ${MAX_IMAGES} allowed.`,
      });
    }

    setUploadingImages(true);
    const uploadedUrls: string[] = [...form.image_urls];

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        setCompressionProgress(`Compressing image ${i + 1}/${filesToUpload.length}...`);
        
        // Compress image before upload
        const compressedFile = await compressForFullSize(file);
        const fileExt = getFileExtension(compressedFile);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `car-images/${fileName}`;

        setCompressionProgress(`Uploading image ${i + 1}/${filesToUpload.length}...`);

        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(filePath, compressedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("car-images")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setForm({ ...form, image_urls: uploadedUrls });
      setErrors({ ...errors, image_urls: undefined });
      toast({
        title: "Success",
        description: `${filesToUpload.length} image(s) compressed and uploaded`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
      setCompressionProgress("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields marked below.",
        variant: "destructive",
      });
      return;
    }

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
      setErrors({});
      setSubmitAttempted(false);
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
    setErrors({});
    setSubmitAttempted(false);
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

  const renderError = (field: keyof FormErrors) => {
    if (!submitAttempted || !errors[field]) return null;
    return (
      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </p>
    );
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
            className="border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
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

            {submitAttempted && Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Please fill in all required fields marked below.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Model Name *</Label>
                  <Input
                    value={form.model_name}
                    onChange={(e) => setForm({ ...form, model_name: e.target.value })}
                    placeholder="e.g. BMW 3 Series"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.model_name && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("model_name")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Price (£) *</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="12995"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.price && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("price")}
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
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.year && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("year")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Doors *</Label>
                  <Input
                    type="number"
                    value={form.doors}
                    onChange={(e) => setForm({ ...form, doors: e.target.value })}
                    placeholder="4"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.doors && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("doors")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Seats *</Label>
                  <Input
                    type="number"
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    placeholder="5"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.seats && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("seats")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Body Type *</Label>
                  <Select value={form.body_type} onValueChange={(v) => setForm({ ...form, body_type: v })}>
                    <SelectTrigger className={`bg-primary border-border/30 text-primary-foreground ${errors.body_type && submitAttempted ? 'border-destructive' : ''}`}>
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
                  {renderError("body_type")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Colour *</Label>
                  <Input
                    value={form.colour}
                    onChange={(e) => setForm({ ...form, colour: e.target.value })}
                    placeholder="Black"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.colour && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("colour")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Mileage *</Label>
                  <Input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                    placeholder="45000"
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.mileage && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("mileage")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Registration Date *</Label>
                  <Input
                    type="date"
                    value={form.registration_date}
                    onChange={(e) => setForm({ ...form, registration_date: e.target.value })}
                    className={`bg-primary border-border/30 text-primary-foreground ${errors.registration_date && submitAttempted ? 'border-destructive' : ''}`}
                  />
                  {renderError("registration_date")}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Fuel Type *</Label>
                  <Select value={form.fuel_type} onValueChange={(v) => setForm({ ...form, fuel_type: v })}>
                    <SelectTrigger className={`bg-primary border-border/30 text-primary-foreground ${errors.fuel_type && submitAttempted ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                  {renderError("fuel_type")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Gearbox *</Label>
                  <Select value={form.gearbox} onValueChange={(v) => setForm({ ...form, gearbox: v })}>
                    <SelectTrigger className={`bg-primary border-border/30 text-primary-foreground ${errors.gearbox && submitAttempted ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                  {renderError("gearbox")}
                </div>
                <div className="space-y-2">
                  <Label className="text-primary-foreground">Drive Type *</Label>
                  <Select value={form.drive_type} onValueChange={(v) => setForm({ ...form, drive_type: v })}>
                    <SelectTrigger className={`bg-primary border-border/30 text-primary-foreground ${errors.drive_type && submitAttempted ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                    </SelectContent>
                  </Select>
                  {renderError("drive_type")}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-primary-foreground">Key Features * (one per line)</Label>
                <Textarea
                  value={form.key_features}
                  onChange={(e) => setForm({ ...form, key_features: e.target.value })}
                  placeholder="Leather Seats&#10;Navigation&#10;Parking Sensors"
                  className={`bg-primary border-border/30 text-primary-foreground min-h-[80px] ${errors.key_features && submitAttempted ? 'border-destructive' : ''}`}
                />
                {renderError("key_features")}
              </div>

              <div className="space-y-2">
                <Label className="text-primary-foreground">
                  Images * ({form.image_urls.length}/{MAX_IMAGES})
                </Label>
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
                {form.image_urls.length < MAX_IMAGES && (
                  <label className={`flex items-center gap-2 px-4 py-2 bg-accent/10 border rounded-lg cursor-pointer hover:bg-accent/20 transition-colors ${errors.image_urls && submitAttempted ? 'border-destructive' : 'border-accent/30'}`}>
                    <Upload className="w-4 h-4 text-accent" />
                    <span className="text-accent text-sm">
                      {uploadingImages ? compressionProgress || "Processing..." : "Upload Images (max 20, auto-compressed)"}
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
                )}
                {renderError("image_urls")}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
                  disabled={saving || !isFormValid()}
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
                      setErrors({});
                      setSubmitAttempted(false);
                    }}
                    className="border-border/30 bg-muted text-foreground hover:bg-muted/80"
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
                        size="sm"
                        onClick={() => toggleStatus(car)}
                        className={car.status === "available" 
                          ? "bg-accent hover:bg-accent/90 text-primary" 
                          : "bg-green-600 hover:bg-green-600/90 text-primary"}
                        title={car.status === "available" ? "Mark as Sold" : "Mark as Available"}
                      >
                        {car.status === "available" ? "Mark Sold" : "Mark Available"}
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleEdit(car)}
                        className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setDeleteId(car.id)}
                        className="bg-destructive/20 border border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
            <AlertDialogCancel className="bg-muted border-border/30 text-foreground hover:bg-muted/80">
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