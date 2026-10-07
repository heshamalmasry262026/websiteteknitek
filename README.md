# Teknitek | تكنيتك

منصة تجارة إلكترونية وخدمات تقنية متكاملة (React + Express + PostgreSQL) بثيم داكن احترافي ودعم كامل للعربية (RTL).

للنشر على Render راجع [`DEPLOY_AR.md`](./DEPLOY_AR.md).
لسجل التغييرات راجع [`CHANGES_AR.md`](./CHANGES_AR.md).

## التقنيات
- **Frontend**: React 18، Vite، Tailwind CSS، React Router، TanStack Query
- **Backend**: Express، TypeScript، Drizzle ORM، PostgreSQL
- **الصور**: Cloudinary
- **المصادقة**: JWT + bcrypt

## البدء السريع
```bash
npm install
cp .env.example .env   # عدّل القيم
npm run db:push
npm run db:seed
npm run dev
```
