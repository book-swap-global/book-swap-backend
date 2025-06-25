# BOOK-SWAP-BACKEND

## Get started

### 1. Clone this repo

```console
 git clone git@github.com:book-swap-global/book-swap-backend.git
```

### 2. Move to project directory

```console
cd book-swap-backend
```

### 3. Install dependencies

```console
npm install
```

### 4. Setup a database of your choice

ORM library အနေနဲ့ prisma ကို အသုံးပြုထားပါတယ်။ prisma ကထင်ရှားတဲ့ RDBMS တွေဖြစ်တဲ့ mysql, sqlite, postgresql, sqlserver တို့ကို support ပေးတဲ့အတွက် အဆင်ပြေရာတစ်ခုခုနဲ့ database တစ်ခုကိုတည်ဆောက်လိုက်ပါ။
<br/><br/>
သို့မဟုတ်
<br/><br/>
docker အသုံးပြုတတ်တယ် ဆိုရင် postgresql အတွက် dockcer-compose.yml ရေးပေးထားပါတယ်။ အောက်က command ကို run လိုက်ရုံပါပဲ။

```console
docker compose up -d
```

### 5. Generate JWT secret

authentication အတွက် JWT ကိုအသုံးပြုထားတဲ့အတွက် jwt secret ကို generate လုပ်ပေးဖို့လိုပါတယ်။ generate လုပ်တဲ့ script က ဒီ repo ထဲမှာ ကြို‌ရေးပေးထားပါတယ်။ အောက်က command ကို run လိုက်ပါ။

```console
npm run keygen
```

ဒါဆိုရင် `./keys` folder ထဲမှာ jwt secret ရပါပြီ။

### 6. Modify `.env.dev` file

```env
# fastify server
HOST=localhost
PORT=3333

# environmet (development | test | production)
ENVIRONMENT=development

# allowed origins (use comma separation for muliple origins)
ALLOWED_ORIGINS=localhost:3333

# absolute paths to jwt secret
JWT_SECRET="/absolute-path-to/jwtsecret"

# connection stirng
DATABASE_URL="postgresql://kf_user:kf_password@localhost:5432/kickstart_fastify"
```

`DATABASE_URL` ကို No.4 မှာ တည်ဆောက်ခဲ့တဲ့ database info အတိုင်းအစားထိုးပေးပါ။ `JWT_SECRET` ကို No.5 မှာ generate လုပ်ခဲ့တဲ့ jwt secret ‌ရဲ့ absolute path နဲ့ အစားထိုးပေးပါ။

### 7. Migrate

လက်ရှိ source ထဲမှာ `prisma` ဆိုတဲ့ folder ရှိပါတယ်။ အဲထဲမှာမှ `schema.prisma` က ကျွန်တော်တို့ project ထဲမှာ ဘယ်လို databse table တွေ ပါဝင်မယ်ဆိုတာကို ‌ရေးထားရမှာပါ။ ခုချိန်မှာ User table ရှိနေလိမ့်မယ်။

```
model user {
  user_id             String              @id @db.VarChar(12)
  user_name           String              @db.VarChar(50)
  firebase_uid        String              @db.VarChar(28)
  phone_no            String              @db.VarChar(28)
  role                ROLE
  registration_status REGISTRATION_STATUS
  delete_flag         FLAG

  created_at DateTime @default(now()) @db.Timestamp()
  updated_at DateTime @default(now()) @db.Timestamp()
}

enum FLAG {
  ON
  OFF
}

enum REGISTRATION_STATUS {
  TEMPORARY
  COMPLETE
}

enum ROLE {
  ADMIN
  USER
}
```

ဒါက definition အနေနဲ့ပဲ ရှိနေသေးတာမို့လို့ database မှာ သွားပြီး table တွေ မဖန်တီးရသေးပါဘူး။ တကယ်ဖန်တီးဖို့အတွက် ‌အောက်က command ကို run ပေးဖို့လိုပါတယ်

```
npx prisma migrate dev
```

run ပြီးပြီဆိုရင်တော့ database table တွေက schema.prisma မှာ declare လုပ်ခဲ့တဲ့အတိုင်း တည်ဆောက်ပြီးသားဖြစ်သွားမှာဖြစ်ပါတယ်။ နောက်ပိုင်းတစ်ခုခုပြုပြင်ချင်တာရှိရင်လဲ schema.prisma ကို ပြင်ပြီး migrate ပြန်လုပ်ပေးရုံပါပဲ။ sql တွေ‌ရေးနေစရာမလိုတဲ့ အတွက် အတော်လေးအဆင်ပြေစေပါတယ်။

### 8. Ready
seeding အထိပြီးပြီဆိုရင်တော့ တကယ် run ကြည့်ဖို့ အဆင်သင့်ဖြစ်နေပါပြီ။
```
npm run dev
```
ဘာပြဿနာမှမရှိခဲ့ဘူးဆိုရင်တော့ localhost:3333 မှာ up & running ဖြစ်သွားမှာပါ။
<br>
`http://localhost:3333/docs`ကိုဝင်ကြည့်မယ်ဆိုရင် swagger documentation ကိုပါမြင်ရမှာပါ။

## Folder structre explained

### 1. `.vscode`

လက်ရှိ project ကို vscode အသုံးပြုပြီး ဆက်လက် develop လုပ်ဖို့တိုက်တွန်းလိုပါတယ်။
<br>
`.vscode/extensions.json` ထဲမှာ လက်ရှိ project အတွက် install လုပ်ထားသင့်တဲ့ extensions တွေကို define လုပ်ထားပါတယ်။ extension search box မှာ @recommended လို့ရိုက်ထည့်ပြီး တစ်ခုချင်းစီ install လုပ်သွားရုံပါပဲ။
`.vscode/launch.json`ထဲမှာတော့ debug အတွက် setting ကို define လုပ်ထားပါတယ်။ vscode menu bar ရဲ့ Run ထဲက Start Debugging ကို နှိပ်ပြီး debug mode နဲ့ run လို့ရပါတယ်။
<br>
`.vscode/setting.json`ကတော့ လက်ရှိ workspace ရဲ့ setting ဖြစ်ပါတယ်။ ကိုယ်တိုင်ပဲလေ့လာကြည့်ပါ။

### 2. docker

postgresql အတွက် Dockerfile ကိုရေးပေးထားပါတယ်။ project root folder ထဲက docker-compose.yml file နဲ့ အတူတွဲပြီးကြည့်ပါ။

### 3. prisma

prisma.schema (database definition), migration history နဲ့ seeding data တွေရှိတဲ့ folder ပါ။

### 4. scripts

လောလောဆယ်တော့ jwt အတွက် private key & public key ကို generate လုပ်တဲ့ script တစ်ခုပဲရှိပါတယ်။ နောက်ပိုင်းတခြားဟာတွေ ထပ်တိုးဖို့ရှိလာရင် ဒီ folder ထဲမှာထပ်တိုးသွားပါ။

### 5. src

အဓိကကျတဲ့ source folder ပါပဲ။ အထဲမှာတော့ ဒီလိုထပ်ခွဲထားပါတယ်။

-   constants
-   handlers - business logic တွေကို ဒီထဲမှာရေးပါတယ်
-   plugins - fastify ရဲ့ core plugins, ecosystem plugin တွေနဲ့ custom plugins တွေကို ဒီထဲမှာရေးပါတယ်
-   routes - endpoints တွေနဲ့ handler တွေကို ဒီထဲမှာ map ပါတယ်
-   shared/schema - field တစ်ခုချင်းစီရဲ့ validation rule တွေကို ဒီထဲမှာရေးပါတယ်
-   utils - business logic မဟုတ်တဲ့ common function တွေကို ဒီထဲမှာရေးပါတယ်

ဒီ project တစ်ခုလုံးရဲ့ entry point က index.ts ပါ။

