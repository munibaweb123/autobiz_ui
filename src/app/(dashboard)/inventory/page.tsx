"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search, Plus, Edit3, Trash2, AlertTriangle } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock_quantity: number;
  sale_price: number;
  company_id: string;
};

export default function InventoryPage() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: "DELETE" });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSave = async (productData: Omit<Product, 'id'>, id?: string) => {
    console.log("Saving product:", productData);
    console.log("editingProduct ID:", id);
    try {
      const url = id
        ? `http://127.0.0.1:8000/api/products/${id}`
        : "http://127.0.0.1:8000/api/products";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error saving product:", errorText);
        alert("Failed to save product: " + errorText);
        return;
      }

      fetchProducts();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64">
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SheetHeader className="px-4 py-2 border-b dark:border-gray-800">
                  <SheetTitle>Inventory Navigation</SheetTitle>
                </SheetHeader>
                <NavigationContent setOpen={setOpen} />
              </SheetContent>
            </Sheet>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Header */}
        <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track and manage your product inventory
            </p>
          </div>

          <button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Low Stock Alert */}
        <div className="mx-4 md:mx-6 mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium">Low Stock Alert</span>
          </div>
          <p className="text-sm">— 76 items are running low on stock</p>
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 overflow-auto">
          <div className="w-full bg-card rounded-lg border-border border text-sm overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">SKU</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Unit Price</th>
                  <th className="p-3 text-left">Total Value</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p, i) => {
                  const isLowStock = p.stock_quantity < 20;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-border ${
                        isLowStock ? "bg-destructive/10" : "hover:bg-muted"
                      }`}
                    >
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.sku}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.stock_quantity}</td>
                      <td className="p-3">Rs {p.sale_price}</td>
                      <td className="p-3">
                        Rs {(p.stock_quantity * p.sale_price).toLocaleString()}
                      </td>
                      <td className="p-3">
                        {isLowStock ? (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="p-3 flex justify-end gap-3">
                        <Edit3 onClick={() => handleEditClick(p)} className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary" />
                        <Trash2 onClick={() => handleDeleteClick(p.id)} className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the details of your product." : "Add a new product to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <ProductForm product={editingProduct} onSave={handleSave} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({ product, onSave }: { product: Product | null, onSave: (productData: Omit<Product, 'id'>, id?: string) => void }) {
  const [formData, setFormData] = useState(product || { name: '', sku: '', category: '', stock_quantity: 0, sale_price: 0, company_id: '94bb2f7b-5ce9-4f9b-b097-5ef45e75c2fa' });

  useEffect(() => {
    setFormData(product || { name: '', sku: '', category: '', stock_quantity: 0, sale_price: 0, company_id: '94bb2f7b-5ce9-4f9b-b097-5ef45e75c2fa' });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumber = e.target.type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, product?.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
        <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" />
        <Input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <Input name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} placeholder="Quantity" />
        <Input name="sale_price" type="number" value={formData.sale_price} onChange={handleChange} placeholder="Sale Price" />
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
