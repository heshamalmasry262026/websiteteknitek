# دليل نشر موقع تكنيتك على Render

## 1. تجهيز قاعدة البيانات (Postgres)
بما إنه عندك قاعدة بيانات Postgres جاهزة، فقط تأكد إنه رابط الاتصال (Connection String) عندك يشبه:
```
postgresql://user:password@host:5432/dbname?sslmode=require
```
هاد الرابط هو اللي رح تحطه بمتغير `DATABASE_URL`.

## 2. تجهيز Cloudinary (لتخزين الصور)
1. سجل دخول إلى https://cloudinary.com
2. من لوحة التحكم الرئيسية (Dashboard) خذ:
   - `Cloud Name`
   - `API Key`
   - `API Secret`

## 3. رفع المشروع على GitHub
```bash
cd teknitek
git init
git add .
git commit -m "Teknitek - نسخة كاملة جاهزة للنشر"
git branch -M main
git remote add origin https://github.com/USERNAME/teknitekWebsite-.git
git push -u origin main --force
```
> استخدم `--force` فقط إذا بدك تستبدل الملفات الموجودة بالريبو بالكامل بالنسخة الجديدة.

## 4. إنشاء خدمة Web Service على Render
1. من https://dashboard.render.com اضغط **New +** ثم **Web Service**
2. اربط حساب GitHub واختر الريبو `teknitekWebsite-`
3. الإعدادات:
   - **Environment**: `Docker` (لأنه عندنا Dockerfile جاهز)
   - **Region**: اختر الأقرب (مثلاً Frankfurt)
   - **Branch**: `main`
   - **Instance Type**: Free أو Starter حسب حاجتك

## 5. متغيرات البيئة (Environment Variables)
بصفحة الخدمة على Render، روح لـ **Environment** وأضف:

| المفتاح | القيمة |
|---|---|
| `DATABASE_URL` | رابط قاعدة بيانات Postgres عندك |
| `JWT_SECRET` | نص عشوائي طويل وسري (مثلاً 40+ حرف) |
| `CLOUDINARY_CLOUD_NAME` | من لوحة Cloudinary |
| `CLOUDINARY_API_KEY` | من لوحة Cloudinary |
| `CLOUDINARY_API_SECRET` | من لوحة Cloudinary |
| `ADMIN_USERNAME` | اسم مستخدم حساب المدير الأول |
| `ADMIN_PASSWORD` | كلمة مرور قوية لحساب المدير الأول |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

## 6. تجهيز الجداول وحساب المدير الأول
بعد أول نشر ناجح (Deploy)، افتح **Shell** الخاص بالخدمة على Render (تبويب Shell) ونفّذ:
```bash
npm run db:push     # ينشئ الجداول في قاعدة البيانات
npm run db:seed     # ينشئ حساب المدير الأول + الإعدادات الافتراضية
```
> إذا ما ظهر تبويب Shell على خطتك المجانية، بديل: شغّل نفس الأوامر محلياً على جهازك بعد ما تحط نفس `DATABASE_URL` بملف `.env` عندك — الجداول رح تنعمل على نفس قاعدة البيانات مباشرة.

## 7. تسجيل الدخول للوحة التحكم
1. افتح رابط الموقع اللي عطاك ياه Render
2. اضغط "تسجيل الدخول" بالهيدر
3. سجل دخول بـ `ADMIN_USERNAME` و `ADMIN_PASSWORD`
4. من لوحة التحكم → **إعدادات المتجر**: حدّث اسم المتجر، الهاتف، الواتساب، الإيميل، العنوان، ساعات العمل، روابط التواصل، الشعار والبانر — كل هاي التغييرات بتنعكس فوراً بالموقع العام.

## 8. تشغيل المشروع محلياً (اختياري، للتجربة قبل النشر)
```bash
npm install
cp .env.example .env   # وعدّل القيم الحقيقية
npm run db:push
npm run db:seed
npm run dev             # يشغل الفرونت والباك مع بعض على المنفذ 5173 و 3000
```

## ملاحظات مهمة
- Render لا يحتفظ بالملفات المرفوعة محلياً بعد إعادة التشغيل، ولهاد استخدمنا Cloudinary لتخزين كل الصور — تأكد إنه بيانات Cloudinary صحيحة وإلا رفع الصور رح يفشل.
- غيّر `JWT_SECRET` و `ADMIN_PASSWORD` لقيم قوية وسرية قبل الاستخدام الفعلي.
- كل التغييرات بصفحة "إعدادات المتجر" بلوحة التحكم بتنحفظ بقاعدة البيانات وبتظهر فوراً لكل زوار الموقع (الهيدر، الفوتر، زر الواتساب العائم).
