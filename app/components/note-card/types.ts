export type TNoteCardItem = {
  id: string;
  text: string;
  complete: boolean;
};

export type TNoteCardProps = {
  id: string;
  previewLimit?: number;
  title: string;
  items: readonly TNoteCardItem[];
};
