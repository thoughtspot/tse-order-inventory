import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Inventory Order System</h1>
        <p className={styles.description}>
          Welcome to our inventory management system. You can easily order new
          inventory by providing SKU codes and quantities. Our system will
          process your orders and ensure timely delivery.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Quick Ordering</h3>
            <p>
              Order inventory items using SKU codes with pre-filled quantities
              from URLs
            </p>
          </div>
          <div className={styles.feature}>
            <h3>Flexible Management</h3>
            <p>Add multiple SKUs and adjust quantities as needed</p>
          </div>
          <div className={styles.feature}>
            <h3>Fast Processing</h3>
            <p>
              Orders are processed quickly with 15-20 day delivery expectations
            </p>
          </div>
        </div>

        <div className={styles.ctas}>
          <Link href="/order" className={styles.primary}>
            Order Inventory
          </Link>
          <Link
            href="/order?sku=ABC123&sku=XYZ789"
            className={styles.secondary}
          >
            Order with Pre-filled SKUs
          </Link>
        </div>
      </main>
    </div>
  );
}
