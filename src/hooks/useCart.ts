import { useState, useEffect } from 'react';
import { Product, CartItem, ShippingDetails, PaymentDetails, OrderState, PRODUCTS } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('auraglass_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: '',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [currentOrder, setCurrentOrder] = useState<OrderState | null>(null);

  useEffect(() => {
    localStorage.setItem('auraglass_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, selectedColor?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { product, quantity: 1, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor))
      );
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'ECLIPSE20') {
      setDiscountPercent(20);
      setDiscountSuccess('20% savings applied successfully!');
      setDiscountError('');
      return true;
    } else if (formatted === 'AURA10') {
      setDiscountPercent(10);
      setDiscountSuccess('10% savings applied successfully!');
      setDiscountError('');
      return true;
    } else {
      setDiscountError('Invalid savings code');
      setDiscountSuccess('');
      return false;
    }
  };

  const removeCoupon = () => {
    setDiscountPercent(0);
    setCouponCode('');
    setDiscountSuccess('');
    setDiscountError('');
  };

  // Buy All Bundle integration - 100% functional button action
  const buyAllBundle = () => {
    const bundle = PRODUCTS.find((p) => p.category === 'bundle');
    if (bundle) {
      // Clear cart first or add it immediately
      setCartItems([{ product: bundle, quantity: 1 }]);
      setIsCartOpen(false);
      // Directly trigger checkout process for maximum streamlined buy experience
      setCheckoutStep(1);
      setIsCheckoutOpen(true);
    }
  };

  // Calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Number((subtotal * (discountPercent / 100)).toFixed(2));
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const estimatedTax = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = Number((subtotal - discountAmount + shippingCost + estimatedTax).toFixed(2));

  const startCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  const handleNextStep = () => {
    setCheckoutStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCheckoutStep((prev) => Math.max(1, prev - 1));
  };

  const finalizeOrder = () => {
    const orderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    // Estimated delivery is 3 business days from now
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    const deliveryString = delivery.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newOrder: OrderState = {
      id: orderId,
      items: [...cartItems],
      shipping: { ...shippingDetails },
      subtotal,
      discount: discountAmount,
      shippingCost,
      tax: estimatedTax,
      total,
      date: orderDate,
      estimatedDelivery: deliveryString,
    };

    setCurrentOrder(newOrder);
    setCheckoutStep(4); // Advance to receipt order stage
    setCartItems([]);   // Empty cart upon successful order
    removeCoupon();
  };

  return {
    cartItems,
    itemsCount,
    isCartOpen,
    isCheckoutOpen,
    checkoutStep,
    shippingDetails,
    paymentDetails,
    currentOrder,
    couponCode,
    discountPercent,
    discountError,
    discountSuccess,
    subtotal,
    discountAmount,
    shippingCost,
    estimatedTax,
    total,
    setIsCartOpen,
    setIsCheckoutOpen,
    setCheckoutStep,
    setShippingDetails,
    setPaymentDetails,
    setCouponCode,
    addToCart,
    updateQuantity,
    removeFromCart,
    buyAllBundle,
    applyCoupon,
    removeCoupon,
    startCheckout,
    handleNextStep,
    handlePrevStep,
    finalizeOrder,
  };
}
