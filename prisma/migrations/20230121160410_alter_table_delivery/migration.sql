-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT,
    "item_name" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_deliveries" ("create_at", "end_at", "id", "id_client", "id_deliveryman", "item_name") SELECT "create_at", "end_at", "id", "id_client", "id_deliveryman", "item_name" FROM "deliveries";
DROP TABLE "deliveries";
ALTER TABLE "new_deliveries" RENAME TO "deliveries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
