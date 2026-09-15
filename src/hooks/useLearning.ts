import { useEffect, useState } from 'react';

import type { Category } from '../components/CategorySelector';
import type { Term } from '../components/TermCard';

const terms: Record<Category, Term[]> = {
  Programming: [
    {
      name: 'Component',
      explanation:
        'جزء مستقل وقابل لإعادة الاستخدام من واجهة التطبيق.',
      example:
        'يمكن إنشاء Button كـ Component واستخدامه في أكثر من شاشة.',
    },
    {
      name: 'State',
      explanation:
        'بيانات داخل الـ Component يمكن أن تتغير أثناء استخدام التطبيق.',
      example:
        'عدد مرات الضغط على زر يمكن تخزينه داخل State.',
    },
    {
      name: 'Props',
      explanation:
        'بيانات يتم إرسالها من Component إلى Component آخر.',
      example:
        'يمكن إرسال اسم المستخدم إلى Profile Component باستخدام Props.',
    },
    {
      name: 'Hook',
      explanation:
        'دالة في React تساعدنا على استخدام ميزات مثل State وEffects.',
      example:
        'useState هو Hook نستخدمه لتخزين بيانات قابلة للتغيير.',
    },
  ],

  Networks: [
    {
      name: 'IP Address',
      explanation:
        'عنوان يستخدم للتعرف على جهاز داخل الشبكة.',
      example:
        'يمكن أن يكون لجهاز داخل الشبكة عنوان مثل 192.168.1.10.',
    },
    {
      name: 'DNS',
      explanation:
        'نظام يحول أسماء المواقع إلى عناوين IP.',
      example:
        'DNS يساعد الجهاز على معرفة عنوان IP المرتبط باسم موقع ويب.',
    },
    {
      name: 'Router',
      explanation:
        'جهاز يقوم بتمرير البيانات بين شبكات مختلفة.',
      example:
        'الراوتر في المنزل يربط الشبكة المحلية بالإنترنت.',
    },
    {
      name: 'DHCP',
      explanation:
        'خدمة تقوم بتوزيع إعدادات الشبكة على الأجهزة تلقائيًا.',
      example:
        'عند اتصال الهاتف بالـ Wi-Fi يمكن أن يحصل على IP من DHCP.',
    },
  ],

  Security: [
    {
      name: 'Encryption',
      explanation:
        'تحويل البيانات إلى شكل غير مفهوم لحمايتها.',
      example:
        'يمكن تشفير البيانات قبل إرسالها عبر الشبكة.',
    },
    {
      name: 'Firewall',
      explanation:
        'نظام يراقب حركة الشبكة ويسمح أو يمنع الاتصالات حسب قواعد محددة.',
      example:
        'يمكن للـ Firewall منع اتصال غير مسموح به من الوصول للجهاز.',
    },
    {
      name: 'Authentication',
      explanation:
        'عملية التأكد من هوية المستخدم أو الجهاز.',
      example:
        'تسجيل الدخول باستخدام كلمة مرور هو شكل من أشكال Authentication.',
    },
    {
      name: 'VPN',
      explanation:
        'تقنية تنشئ اتصالًا محميًا بين جهازك وشبكة أخرى.',
      example:
        'يمكن استخدام VPN لإنشاء اتصال آمن مع شبكة شركة.',
    },
  ],

  AI: [
    {
      name: 'Machine Learning',
      explanation:
        'أسلوب يسمح للأنظمة بالتعلم من البيانات لاكتشاف أنماط أو إجراء توقعات.',
      example:
        'يمكن تدريب نموذج على بيانات سابقة لتوقع قيمة مستقبلية.',
    },
    {
      name: 'Model',
      explanation:
        'نظام تم تدريبه على بيانات لتنفيذ مهمة معينة.',
      example:
        'يمكن تدريب Model للتعرف على الأشياء الموجودة في الصور.',
    },
    {
      name: 'Dataset',
      explanation:
        'مجموعة بيانات تستخدم عادةً للتحليل أو تدريب واختبار النماذج.',
      example:
        'قد يحتوي Dataset على آلاف الصور مع معلومات عنها.',
    },
    {
      name: 'Prediction',
      explanation:
        'النتيجة التي ينتجها النموذج اعتمادًا على البيانات المدخلة.',
      example:
        'قد يتوقع النموذج درجة الحرارة المستقبلية من القراءات السابقة.',
    },
  ],
};

export const TOTAL_TERMS = Object.values(terms).reduce(
  (total, categoryTerms) => total + categoryTerms.length,
  0
);

export function useLearning() {
  const [category, setCategory] =
    useState<Category>('Programming');

  const [termIndex, setTermIndex] =
    useState(0);

  const [learnedTerms, setLearnedTerms] =
    useState<string[]>([]);

  const [favoriteTerms, setFavoriteTerms] =
    useState<string[]>([]);

  const currentTerm =
    terms[category][termIndex];

  const termId =
    `${category}-${currentTerm.name}`;

  const isLearned =
    learnedTerms.includes(termId);

  const isFavorite =
    favoriteTerms.includes(termId);

  useEffect(() => {
    setTermIndex(0);

    console.log(
      'Category changed:',
      category
    );
  }, [category]);

  function selectCategory(
    newCategory: Category
  ) {
    setCategory(newCategory);
  }

  function nextTerm() {
    setTermIndex((current) =>
      (current + 1) % terms[category].length
    );
  }

  function learnedTerm() {
    if (!isLearned) {
      setLearnedTerms((current) => [
        ...current,
        termId,
      ]);
    }

    nextTerm();
  }

  function toggleFavorite() {
    if (isFavorite) {
      setFavoriteTerms((current) =>
        current.filter(
          (favorite) => favorite !== termId
        )
      );
    } else {
      setFavoriteTerms((current) => [
        ...current,
        termId,
      ]);
    }
  }

  function resetLearning() {
    setCategory('Programming');
    setTermIndex(0);
    setLearnedTerms([]);
    setFavoriteTerms([]);
  }

  return {
    category,
    currentTerm,

    learnedCount: learnedTerms.length,
    favoriteCount: favoriteTerms.length,

    totalTerms: TOTAL_TERMS,

    isLearned,
    isFavorite,

    selectCategory,
    nextTerm,
    learnedTerm,
    toggleFavorite,
    resetLearning,
  };
}