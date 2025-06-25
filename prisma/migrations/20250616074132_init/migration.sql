-- CreateEnum
CREATE TYPE "FLAG" AS ENUM ('ON', 'OFF');

-- CreateEnum
CREATE TYPE "REGISTRATION_STATUS" AS ENUM ('TEMPORARY', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "user" (
    "user_id" VARCHAR(12) NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "firebase_uid" VARCHAR(28) NOT NULL,
    "phone_no" VARCHAR(28) NOT NULL,
    "role" "ROLE" NOT NULL,
    "registration_status" "REGISTRATION_STATUS" NOT NULL,
    "delete_flag" "FLAG" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);
