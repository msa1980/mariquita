import { ShoppingCart, Trash2, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center"><ShoppingCart className="mr-2"/> Seu Carrinho</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto pr-4 -mr-4 my-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-14 text-center border rounded-md"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter className="mt-auto flex-col space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{getTotalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full">Finalizar Compra</Button>
              <Button variant="outline" onClick={clearCart} className="w-full">Esvaziar Carrinho</Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">Adicione produtos para vê-los aqui.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
