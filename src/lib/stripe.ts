import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

// Stripeが設定されているかチェック
export const isStripeConfigured = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return key && (key.includes('pk_test_') || key.includes('pk_live_'));
};

export const getStripe = () => {
  if (!stripePromise) {
    if (isStripeConfigured()) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    } else {
      // Stripeが設定されていない場合はnullを返す
      stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
};

// 料金プランの定義
export const pricingPlans = [
  {
    id: 'starter',
    name: 'スターター',
    description: '小規模工務店向けの基本プラン',
    price: 29800,
    priceId: 'price_1QgvKxRoiOlQscS3xY1234', // テスト用価格ID
    features: [
      'AI見積アシスタント（月100件まで）',
      '顧客管理（500件まで）',
      '基本的な工程管理',
      'メールサポート',
      'データエクスポート機能',
    ],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'プロフェッショナル',
    description: '成長中の工務店に最適',
    price: 59800,
    priceId: 'price_1QgvKxRoiOlQscS3xY5678', // テスト用価格ID
    features: [
      'AI見積アシスタント（無制限）',
      '顧客管理（無制限）',
      '高度な工程管理・ガントチャート',
      '優先メール・電話サポート',
      'API連携機能',
      'カスタムレポート作成',
      '複数ユーザーアカウント（10名まで）',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'エンタープライズ',
    description: '大規模工務店・グループ企業向け',
    price: 0, // カスタム価格
    priceId: 'price_enterprise_custom', // カスタム価格
    features: [
      'すべてのプロフェッショナル機能',
      '専任カスタマーサクセスマネージャー',
      'オンプレミス導入対応',
      'カスタム開発・連携',
      'SLA保証（99.9%稼働率）',
      '無制限ユーザーアカウント',
      '定期トレーニング実施',
    ],
    recommended: false,
  },
];