export type DemoDoc = { id: string; name: string; category: 'asset' | 'debt'; value: number };
export type DemoTrust = { id: string; name: string; value: number; beneficiaries: number };
export type DemoClient = {
  id: string;
  name: string;
  idNumber: string;
  netWorth: number;
  totalAssets: number;
  totalDebts: number;
  trustCount: number;
  documentCount: number;
  compliance: number; // 0-100
  joinDate: string; // YYYY-MM-DD
  lastUpdated: string; // YYYY-MM-DD
  // Partner-only per-client portfolio:
  documents: DemoDoc[];
  trusts: DemoTrust[];
};

const LS_KEY = 'partnerDemo_v1';
const LS_SEED = 'partnerDemo_seed_v1';

// Simple deterministic RNG so demo data is consistent per session but unique per install
function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T { return arr[Math.floor(rng() * arr.length)]; }

export function generatePartnerDemo(seed?: number): DemoClient[] {
  const baseSeed = seed ?? Math.floor(Date.now() / 1000);
  const rng = mulberry32(baseSeed);
  const names = ['John Smith','Sarah Johnson','Michael Chen','Aisha Patel','Sipho Ndlovu','Thandi Mokoena'];
  const trusts = ['Family Trust','Business Trust','Education Trust','Investment Trust'];
  const today = new Date().toISOString().slice(0,10);

  const clients: DemoClient[] = Array.from({ length: 3 }, (_, i) => {
    const name = pick(rng, names);
    const idNumber = String(7000000000000 + Math.floor(rng()*2999999999999));
    // Build documents
    const docs: DemoDoc[] = [
      { id: crypto.randomUUID(), name: 'Property Deed', category: 'asset', value: Math.floor(800000 + rng()*2200000) },
      { id: crypto.randomUUID(), name: 'Investment Portfolio', category: 'asset', value: Math.floor(600000 + rng()*1800000) },
      { id: crypto.randomUUID(), name: 'Vehicle Loan', category: 'debt', value: Math.floor(120000 + rng()*280000) },
    ];
    if (rng() > 0.5) docs.push({ id: crypto.randomUUID(), name: 'Home Loan', category: 'debt', value: Math.floor(500000 + rng()*1200000) });

    const totalAssets = docs.filter(d=>d.category==='asset').reduce((s,d)=>s+d.value,0);
    const totalDebts = docs.filter(d=>d.category==='debt').reduce((s,d)=>s+d.value,0);
    const netWorth = totalAssets - totalDebts;

    const trustCount = 1 + Math.floor(rng()*3);
    const trustsArr: DemoTrust[] = Array.from({length: trustCount}, () => ({
      id: crypto.randomUUID(),
      name: pick(rng, trusts),
      value: Math.floor(400000 + rng()*2200000),
      beneficiaries: 1 + Math.floor(rng()*4),
    }));

    const compliance = 60 + Math.floor(rng()*40);

    return {
      id: `client_${i+1}`,
      name,
      idNumber,
      totalAssets,
      totalDebts,
      netWorth,
      trustCount,
      documentCount: docs.length,
      compliance,
      joinDate: '2023-0' + (5+i) + '-10',
      lastUpdated: today,
      documents: docs,
      trusts: trustsArr,
    };
  });
  return clients;
}

export function loadPartnerDemo(): DemoClient[] {
  if (typeof window === 'undefined') return [];
  const cached = localStorage.getItem(LS_KEY);
  if (cached) return JSON.parse(cached) as DemoClient[];
  // First run: generate and cache with a seed
  const existingSeed = localStorage.getItem(LS_SEED);
  const seed = existingSeed ? parseInt(existingSeed,10) : Math.floor(Date.now()/1000);
  if (!existingSeed) localStorage.setItem(LS_SEED, String(seed));
  const data = generatePartnerDemo(seed);
  localStorage.setItem(LS_KEY, JSON.stringify(data));
  return data;
}

export function savePartnerDemo(clients: DemoClient[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(clients));
}

export function resetPartnerDemo() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LS_KEY);
  localStorage.removeItem(LS_SEED);
}