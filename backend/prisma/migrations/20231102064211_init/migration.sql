-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceWithTax" INTEGER NOT NULL,
    "priceWithoutTax" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "dci" TEXT NOT NULL,
    "isTaxed" BOOLEAN NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineFromProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceWithTax" INTEGER NOT NULL,
    "priceWithoutTax" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "dci" TEXT NOT NULL,
    "isTaxed" BOOLEAN NOT NULL,
    "providerId" TEXT,

    CONSTRAINT "MedicineFromProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineFromProvider" ADD CONSTRAINT "MedicineFromProvider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
