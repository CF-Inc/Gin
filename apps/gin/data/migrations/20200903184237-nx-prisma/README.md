# Migration `20200903184237-nx-prisma`

This migration has been generated by William Sedlacek at 9/3/2020, 11:42:37 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200903183130-nx-prisma..20200903184237-nx-prisma
--- datamodel.dml
+++ datamodel.dml
@@ -3,12 +3,12 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model User {
-  id       String @id
+  id       String @id @default(cuid())
   name     String @unique
   password String
 }
```

