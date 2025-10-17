"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface OrderItem {
  sku: string;
  amount: number;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order data from sessionStorage
    const orderData = sessionStorage.getItem("orderData");
    if (orderData) {
      try {
        const parsedData = JSON.parse(orderData);
        setOrderItems(parsedData);
      } catch (error) {
        console.error("Error parsing order data:", error);
        // Redirect to order page if no valid data
        router.push("/order");
        return;
      }
    } else {
      // Redirect to order page if no data
      router.push("/order");
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleNewOrder = () => {
    // Clear the session data
    sessionStorage.removeItem("orderData");
    router.push("/order");
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.description}>
            Your inventory order has been successfully submitted and will be
            processed shortly.
          </p>
        </div>

        <div className={styles.orderDetails}>
          <h2>Order Details</h2>
          <div className={styles.itemsList}>
            {orderItems.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.sku}>{item.sku}</span>
                  <span className={styles.amount}>Quantity: {item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.deliveryInfo}>
          <h3>Delivery Information</h3>
          <p>
            Your items are expected to arrive within{" "}
            <strong>15-20 business days</strong>. You will receive a
            confirmation email with tracking information once your order ships.
          </p>
        </div>

        <div className={styles.actions}>
          <button onClick={handleNewOrder} className={styles.newOrderButton}>
            Place Another Order
          </button>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
