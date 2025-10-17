"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface OrderItem {
  sku: string;
  amount: number;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function OrderForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with SKUs from URL parameters
  useEffect(() => {
    const skuParams = searchParams.getAll("sku");
    if (skuParams.length > 0) {
      const initialItems = skuParams.map((sku) => ({ sku, amount: 1 }));
      setOrderItems(initialItems);
    } else {
      // Start with one empty row if no SKUs in URL
      setOrderItems([{ sku: "", amount: 1 }]);
    }
  }, [searchParams]);

  const addNewItem = () => {
    setOrderItems([...orderItems, { sku: "", amount: 1 }]);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
  };

  const handleOrderNow = async () => {
    // Filter out empty SKUs
    const validItems = orderItems.filter((item) => item.sku.trim() !== "");

    if (validItems.length === 0) {
      alert("Please add at least one SKU with a valid amount.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store order data in sessionStorage for confirmation page
    sessionStorage.setItem("orderData", JSON.stringify(validItems));

    // Navigate to confirmation
    router.push("/order/confirmation");
  };

  const handleCancel = () => {
    setOrderItems([{ sku: "", amount: 1 }]);
  };

  const validItems = orderItems.filter(
    (item) => item.sku.trim() !== "" && item.amount > 0
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Order Inventory</h1>
          <p className={styles.description}>
            Add SKU codes and quantities for the items you want to order.
          </p>
        </div>

        <div className={styles.orderForm}>
          {orderItems.map((item, index) => (
            <div key={index} className={styles.orderItem}>
              <div className={styles.inputGroup}>
                <label htmlFor={`sku-${index}`} className={styles.label}>
                  SKU Code
                </label>
                <input
                  id={`sku-${index}`}
                  type="text"
                  value={item.sku}
                  onChange={(e) => updateItem(index, "sku", e.target.value)}
                  placeholder="Enter SKU code"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor={`amount-${index}`} className={styles.label}>
                  Amount
                </label>
                <input
                  id={`amount-${index}`}
                  type="number"
                  min="1"
                  value={item.amount}
                  onChange={(e) =>
                    updateItem(index, "amount", parseInt(e.target.value) || 1)
                  }
                  className={styles.input}
                />
              </div>

              {orderItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className={styles.removeButton}
                  aria-label="Remove item"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addNewItem}
            className={styles.addButton}
          >
            + Add Another Item
          </button>
        </div>

        {validItems.length > 0 && (
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryItems}>
              {validItems.map((item, index) => (
                <div key={index} className={styles.summaryItem}>
                  <span className={styles.sku}>{item.sku}</span>
                  <span className={styles.amount}>Qty: {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOrderNow}
            className={styles.orderButton}
            disabled={isSubmitting || validItems.length === 0}
          >
            {isSubmitting ? "Processing..." : "Order Now"}
          </button>
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

// Loading component for Suspense fallback
function OrderFormLoading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Order Inventory</h1>
          <p className={styles.description}>
            Add SKU codes and quantities for the items you want to order.
          </p>
        </div>
        <div className={styles.orderForm}>
          <div className={styles.orderItem}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>SKU Code</label>
              <input
                type="text"
                placeholder="Loading..."
                className={styles.input}
                disabled
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Amount</label>
              <input type="number" className={styles.input} disabled />
            </div>
          </div>
        </div>
        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

// Main component with Suspense boundary
export default function OrderPage() {
  return (
    <Suspense fallback={<OrderFormLoading />}>
      <OrderForm />
    </Suspense>
  );
}
