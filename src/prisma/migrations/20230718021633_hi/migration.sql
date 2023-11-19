-- CreateTable
CREATE TABLE "ButteryMetaData" (
    "id" SERIAL NOT NULL,
    "max_queue_size" INTEGER NOT NULL,
    "reserved_queue_spots" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ButteryMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemRating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "order_complete" TIMESTAMP(3) NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItemToIngredients" (
    "optional" BOOLEAN NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuItemToIngredients_pkey" PRIMARY KEY ("menuItemId","ingredientId")
);

-- CreateTable
CREATE TABLE "_AvailabilityToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToItemRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToTransactionItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ButteryMetaData_collegeId_key" ON "ButteryMetaData"("collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "_AvailabilityToMenuItem_AB_unique" ON "_AvailabilityToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailabilityToMenuItem_B_index" ON "_AvailabilityToMenuItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToItemRating_AB_unique" ON "_IngredientToItemRating"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToItemRating_B_index" ON "_IngredientToItemRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToTransactionItem_AB_unique" ON "_IngredientToTransactionItem"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToTransactionItem_B_index" ON "_IngredientToTransactionItem"("B");

-- AddForeignKey
ALTER TABLE "ButteryMetaData" ADD CONSTRAINT "ButteryMetaData_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemRating" ADD CONSTRAINT "ItemRating_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemToIngredients" ADD CONSTRAINT "MenuItemToIngredients_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemToIngredients" ADD CONSTRAINT "MenuItemToIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToMenuItem" ADD CONSTRAINT "_AvailabilityToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToMenuItem" ADD CONSTRAINT "_AvailabilityToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToItemRating" ADD CONSTRAINT "_IngredientToItemRating_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToItemRating" ADD CONSTRAINT "_IngredientToItemRating_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTransactionItem" ADD CONSTRAINT "_IngredientToTransactionItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTransactionItem" ADD CONSTRAINT "_IngredientToTransactionItem_B_fkey" FOREIGN KEY ("B") REFERENCES "TransactionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
