-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "medicineFromProviderId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_medicineFromProviderId_fkey" FOREIGN KEY ("medicineFromProviderId") REFERENCES "MedicineFromProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
