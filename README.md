This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Prisma Commands

Here is a list of Prisma commands you might need for database management and schema updates:

### Generate Prisma Client

Generates the Prisma client based on the schema.

```bash
npx prisma generate
```
### Create the migration file
```bash
prisma migrate dev
```

### Resolve Applied Migrations

Marks a specific migration as applied in the database.

```bash
prisma migrate resolve --applied <migration_name>
```

### Resolve Rolled-Back Migrations

Marks a specific migration as rolled back.

```bash
prisma migrate resolve --rolled-back <migration_name>
```

### Reset Database

Resets the database by rolling back and applying all migrations from scratch. **Note**: This will wipe all data.

```bash
npx prisma migrate reset
```

### Push Schema to Database

Pushes the Prisma schema changes directly to the database without generating a migration file.

```bash
npx prisma db push
```

## Additional Prisma Commands

### Check Database State

Checks for differences between the Prisma schema and the database.

```bash
npx prisma db pull
```

### Preview Migrations

Shows SQL statements that would be run by the migration without applying them.

```bash
npx prisma migrate dev --preview-feature
```

### Deploy Pending Migrations

Applies all pending migrations to the database.

```bash
npx prisma migrate deploy
```

### Seed Database

Run the seed script to populate the database with initial data.

```bash
npx prisma db seed
```

## Useful Links

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
