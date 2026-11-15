# اعتماد معمارية Django الطبقية الصارمة وقاعدة بيانات Supabase

قررنا اعتماد نمط المعمارية الطبقي الصارم (Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs) مع Thin Views وعزل CQS وقاعدة بيانات PostgreSQL المدارة عبر Supabase. هذا القرار يضمن قابلية اختبار عالية، ومنع مشاكل التزامن و N+1، وتوحيد عقود الواجهة الخلفية مع الواجهة الأمامية عبر CamelCaseJSONRenderer، مع الحفاظ على بيئة تشغيل موحدة باستخدام Docker و .env.example.
