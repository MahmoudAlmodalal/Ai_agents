# توحيد عقود API ونمذجة البيانات وفق غلاف الاستجابة الموحد

قررنا أن تسبق كل مرحلة برمجية صياغة وثيقتي ERD.md (بصيغتي Mermaid و State Machine) و API.md (بعقود REST ونمط CamelCase). كما اعتمدنا غلاف الاستجابة الموحد `{ success: true, data: ..., meta: ... }` للنجاح و `{ success: false, error: ... }` للأخطاء عبر CamelCaseJSONRenderer لضمان تطابق كامل وخالٍ من الاحتكاك مع واجهة Next.js الأمامية.
