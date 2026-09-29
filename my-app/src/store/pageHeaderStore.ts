import { create } from 'zustand';

interface PageHeaderMeta {
  badge: string | null;
  exportLabel: string | null;
  onExport: (() => void) | null;
}

interface PageHeaderState extends PageHeaderMeta {
  setPageHeader: (meta: Partial<PageHeaderMeta>) => void;
  clearPageHeader: () => void;
}

const initialMeta: PageHeaderMeta = {
  badge: null,
  exportLabel: null,
  onExport: null,
};

export const usePageHeaderStore = create<PageHeaderState>((set) => ({
  ...initialMeta,
  setPageHeader: (meta) => set((state) => ({ ...state, ...meta })),
  clearPageHeader: () => set(initialMeta),
}));
