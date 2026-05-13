# Content Manager — Quick Guide
# কনটেন্ট ম্যানেজার — সংক্ষিপ্ত নির্দেশিকা

Two ways to edit the site:

1. **Online (recommended for the writer):** visit `/admin/` on the live site and log in with GitHub.
2. **Locally (for the developer):** run `npm run dev` in one terminal and `npx decap-server` in another, then open `http://localhost:4321/admin/`. No login needed locally.

সাইট সম্পাদনার দুটি উপায়:

১. **অনলাইনে (লেখকের জন্য সুপারিশকৃত):** লাইভ সাইটের `/admin/` ঠিকানায় যান, GitHub দিয়ে লগ-ইন করুন।
২. **স্থানীয়ভাবে (ডেভেলপারের জন্য):** এক টার্মিনালে `npm run dev`, অন্য টার্মিনালে `npx decap-server` চালান, তারপর `http://localhost:4321/admin/` খুলুন।

---

## English

### Adding a new blog post

1. Open `/admin/` and log in.
2. Click **Publications** in the left sidebar.
3. Click **New Publication** (top right).
4. Fill the form:
   - **Title — English** and **Title — Bengali**: write both.
   - **Type**: choose `Blog post`.
   - **Source language**: usually `Bengali` for a Bengali blog post.
   - **Category**: pick one of agriculture / nature / literature / other.
   - **Date published**: today's date in `YYYY-MM-DD` format (e.g., `2026-05-13`).
   - **Summary — Bengali** (and English if you want): one to three sentences.
   - **Body — Bengali** (and English if you want): the full post.
   - **Featured on homepage**: tick this if you want the post to appear at the top of the homepage.
5. Click **Save** (top right). This commits the post to GitHub.
6. Within about two minutes, the post is live on the site.

### Adding a new book or newspaper article

Same as above, but choose `Book` or `Newspaper article` as the **Type**. Upload the PDF scan in the **PDF scan** field, and the cover image (for books) in the **Cover image** field.

### Adding a new arboretum entry

1. Open `/admin/` and log in.
2. Click **Roy's Arboretum** in the left sidebar.
3. Click **New Entry**.
4. Fill the form, including at least:
   - **Kind**: plant / insect / spider
   - **Common name — English** and **Common name — Bengali**
   - **Scientific name**: the Latin binomial (e.g., `Nyctanthes arbor-tristis`)
   - At least one photo
   - Description and field notes (in either or both languages)
5. Save.

### Editing the biography

1. Open `/admin/` → **Biography** → **Biography (single page)**.
2. Edit any field. Save.

### Important: things to avoid

- **Don't change the slug** (the part of the URL after the last `/`) of an existing post — that breaks any link people have shared.
- **Don't delete** a publication or arboretum entry unless you're sure no one has linked to it.
- **PDF and image filenames**: avoid spaces. Use hyphens (`rice-cultivation.pdf`) or underscores (`rice_cultivation.pdf`).

---

## বাংলায়

### নতুন ব্লগ পোস্ট যোগ করা

১. `/admin/` খুলুন এবং লগ-ইন করুন।
২. বাম দিকের তালিকা থেকে **Publications** বেছে নিন।
৩. উপরের ডানদিকে **New Publication** এ ক্লিক করুন।
৪. ফর্মটি পূরণ করুন:
   - **Title — English** ও **Title — Bengali**: দুটোই লিখুন।
   - **Type**: `Blog post` বেছে নিন।
   - **Source language**: বাংলা ব্লগের জন্য সাধারণত `Bengali`।
   - **Category**: কৃষি / প্রকৃতি / সাহিত্য / অন্যান্য — যেকোনো একটি।
   - **Date published**: আজকের তারিখ `YYYY-MM-DD` ফরম্যাটে (যেমন: `2026-05-13`)।
   - **Summary — Bengali**: এক থেকে তিন বাক্যে সারাংশ।
   - **Body — Bengali**: সম্পূর্ণ পোস্ট।
   - **Featured on homepage**: প্রচ্ছদে দেখাতে চাইলে চিহ্নিত করুন।
৫. ডানদিকে **Save** ক্লিক করুন। এটি GitHub-এ কমিট করবে।
৬. প্রায় দুই মিনিটের মধ্যে পোস্টটি লাইভ সাইটে দেখা যাবে।

### নতুন বই বা সংবাদপত্রের প্রবন্ধ যোগ করা

উপরের মতোই, কিন্তু **Type** হিসেবে `Book` বা `Newspaper article` বেছে নিন। **PDF scan**-এ স্ক্যান আপলোড করুন এবং (বইয়ের জন্য) **Cover image**-এ প্রচ্ছদ যোগ করুন।

### নতুন বৃক্ষশালা ভুক্তি যোগ করা

১. `/admin/` খুলুন এবং লগ-ইন করুন।
২. বাম দিকের তালিকা থেকে **Roy's Arboretum** বেছে নিন।
৩. **New Entry** ক্লিক করুন।
৪. কমপক্ষে এই তথ্যগুলি দিন:
   - **Kind**: উদ্ভিদ / পোকা / মাকড়সা
   - **Common name — English** এবং **Common name — Bengali**
   - **Scientific name**: ল্যাটিন বৈজ্ঞানিক নাম
   - কমপক্ষে একটি ছবি
   - বিবরণ ও মাঠ পর্যবেক্ষণ
৫. Save করুন।

### জীবনী সম্পাদনা

১. `/admin/` → **Biography** → **Biography (single page)**।
২. যেকোনো ক্ষেত্র সম্পাদনা করুন। Save।

### সতর্কতা

- পুরোনো পোস্টের **slug পরিবর্তন করবেন না** — শেয়ার করা লিংক ভেঙে যাবে।
- কেউ লিংক করেছে কিনা নিশ্চিত না হলে **মুছবেন না**।
- ফাইলের নামে স্পেস ব্যবহার করবেন না। হাইফেন (`-`) বা আন্ডারস্কোর (`_`) ব্যবহার করুন।
