# اعتماد معيار Briefs المقيدة وعزل الوكلاء عبر Git Worktrees

قررنا إلزام أي وكيل ذكاء اصطناعي يُكلف بتنفيذ تذكرة برمجة خلفية بقالب Brief معياري صارم يحدد (<goal>, <context>, <allowed_scope>, <forbidden_scope>, <instructions>, <verification>, <contract>)، مع تشغيل كل وكيل داخل Git Worktree مستقل. هذا القرار يمنع استرجاع أو تعديل ملفات خارج نطاق التذكرة، ويقضي على تعارضات الدمج (Merge Conflicts) أثناء العمل المتوازي.
