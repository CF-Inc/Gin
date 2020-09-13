# Migration `20200913031636-nx-prisma`

This migration has been generated by William Sedlacek at 9/12/2020, 8:16:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"username" text   NOT NULL ,
"password" text   NOT NULL ,
"gameId" text   ,
"gameHand" text []  ,
"gameScore" integer   NOT NULL DEFAULT 0,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Game" (
"id" text   NOT NULL ,
"deck" text []  ,
"discard" text []  ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Session" (
"id" text   NOT NULL ,
"sid" text   NOT NULL ,
"data" text   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

CREATE UNIQUE INDEX "Session.sid_unique" ON "public"."Session"("sid")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("gameId")REFERENCES "public"."Game"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200908184620-nx-prisma..20200913031636-nx-prisma
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   id        String   @id @default(cuid())
@@ -22,4 +22,11 @@
   users   User[]   @relation
   deck    String[]
   discard String[]
 }
+
+model Session {
+  id      String   @id
+  sid     String   @unique
+  data    String
+  expires DateTime
+}
```

