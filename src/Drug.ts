/**
 *
 */
interface Drug {
  id: string;
  section?: string;
  title: string;
  other?: string[];
  producer?: string;
  source?: string;
  label: 'red' | 'yellow' | 'green' | 'gray';
  contents: string;
}

export default Drug;
